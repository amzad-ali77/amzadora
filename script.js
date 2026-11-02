
// ======================================
// AMZADORA - COMPLETE MAIN JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

  const get = (id) => document.getElementById(id);

  // ======================================
  // SEARCH, CATEGORY & STORE FILTERS
  // ======================================

  const productGrid = get("productGrid");
  const searchInput = get("searchInput");
  const searchButton = get("searchButton");
  const sortSelect = get("sortProducts");
  const resultsCount = get("resultsCount");

  const categoryButtons = document.querySelectorAll(".category");
  const storeButtons = document.querySelectorAll(".partner-filter");

  const productCards = productGrid
    ? Array.from(productGrid.querySelectorAll(".product-card"))
    : [];

  let selectedCategory = "all";
  let selectedStore = "all";

  function filterProducts() {

    if (!productGrid) return;

    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    let visibleCount = 0;

    const sortValue = sortSelect ? sortSelect.value : "default";

    const sortedCards = [...productCards];

    if (sortValue === "low") {
      sortedCards.sort((a, b) =>
        Number(a.dataset.price.replace(/,/g, "")) -
        Number(b.dataset.price.replace(/,/g, ""))
      );
    }

    if (sortValue === "high") {
      sortedCards.sort((a, b) =>
        Number(b.dataset.price.replace(/,/g, "")) -
        Number(a.dataset.price.replace(/,/g, ""))
      );
    }

    if (sortValue === "name") {
      sortedCards.sort((a, b) =>
        a.dataset.name.localeCompare(b.dataset.name)
      );
    }

    sortedCards.forEach(card => {

      productGrid.appendChild(card);

      const name = (card.dataset.name || "").toLowerCase();
      const details = card.textContent.toLowerCase();
      const category = card.dataset.category;
      const store = card.dataset.store;

      const matchesSearch =
        name.includes(searchText) || details.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const matchesStore =
        selectedStore === "all" ||
        store === selectedStore;

      const show =
        matchesSearch && matchesCategory && matchesStore;

      card.style.display = show ? "" : "none";

      if (show) visibleCount++;

    });

    if (resultsCount) {
      resultsCount.textContent =
        "Showing " + visibleCount + " products";
    }

    // NO PRODUCTS MESSAGE

    let emptyMessage = get("emptyState");

    if (!emptyMessage) {

      emptyMessage = document.createElement("div");
      emptyMessage.id = "emptyState";
      emptyMessage.className = "empty-state";

      emptyMessage.innerHTML = `
        <i class="fa-solid fa-magnifying-glass fa-2x"></i>
        <h3>No Products Found</h3>
        <p>Try another product name or change your filters.</p>
        <button type="button" id="resetFilters">
          Reset Filters
        </button>
      `;

      productGrid.after(emptyMessage);
    }

    emptyMessage.hidden = visibleCount !== 0;

  }

  if (searchInput) {

    searchInput.addEventListener("input", filterProducts);

    searchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        filterProducts();
      }
    });

  }

  if (searchButton) {
    searchButton.addEventListener("click", filterProducts);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
  }

  // CATEGORY FILTER

  categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

      categoryButtons.forEach(btn =>
        btn.classList.remove("active")
      );

      this.classList.add("active");

      selectedCategory = this.dataset.category || "all";

      filterProducts();

    });

  });

  // STORE FILTER

  function selectStore(storeName) {

    selectedStore = storeName;

    storeButtons.forEach(button => {

      button.classList.toggle(
        "selected",
        button.dataset.store === storeName
      );

      button.classList.toggle(
        "active",
        button.dataset.store === storeName
      );

    });

    filterProducts();

  }

  storeButtons.forEach(button => {

    button.addEventListener("click", function () {
      selectStore(this.dataset.store || "all");
    });

  });

  // AMAZON / FLIPKART / MYNTRA LOGOS

  const amazonLogo = document.querySelector(".amazon-logo");
  const flipkartLogo = document.querySelector(".flipkart-logo");
  const myntraLogo = document.querySelector(".myntra-logo");

  [
    [amazonLogo, "amazon"],
    [flipkartLogo, "flipkart"],
    [myntraLogo, "myntra"]
  ].forEach(([logo, store]) => {

    if (!logo) return;

    logo.style.cursor = "pointer";

    logo.addEventListener("click", function () {

      selectStore(store);

      const productsSection = get("products");

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });

  // RESET FILTERS

  document.addEventListener("click", function (event) {

    if (!event.target.closest("#resetFilters")) return;

    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "default";

    selectedCategory = "all";
    selectedStore = "all";

    categoryButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.category === "all"
      );

    });

    selectStore("all");

  });


  // ======================================
  // WISHLIST
  // ======================================

  let wishlist = [];

  try {

    wishlist = JSON.parse(
      localStorage.getItem("amzadWishlist") || "[]"
    );

    if (!Array.isArray(wishlist)) wishlist = [];

  } catch (error) {
    wishlist = [];
  }

  function saveWishlist() {

    localStorage.setItem(
      "amzadWishlist",
      JSON.stringify(wishlist)
    );

  }

  function updateWishlist() {

    const count = get("wishlistCount");

    if (count) {
      count.textContent = wishlist.length;
    }

    document.querySelectorAll(".product-card").forEach(card => {

      const name = card.dataset.name;
      const heart = card.querySelector(".heart-btn");

      if (!heart) return;

      const liked = wishlist.includes(name);

      heart.classList.toggle("liked", liked);

      heart.innerHTML = liked
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';

    });

  }

  document.addEventListener("click", function (event) {

    const heart = event.target.closest(".heart-btn");

    if (!heart) return;

    const card = heart.closest(".product-card");

    if (!card) return;

    const name = card.dataset.name;

    if (wishlist.includes(name)) {
      wishlist = wishlist.filter(item => item !== name);
    } else {
      wishlist.push(name);
    }

    saveWishlist();
    updateWishlist();

  });

  const wishlistHeader = get("wishlistHeader");

  if (wishlistHeader) {

    wishlistHeader.addEventListener("click", function () {

      if (wishlist.length === 0) {
        alert("Your Wishlist is empty.");
        return;
      }

      alert(
        "Your Wishlist:\n\n" +
        wishlist.join("\n")
      );

    });

  }


  // ======================================
  // SAVED SHOPPING ITEMS
  // ======================================

  let cart = [];

  try {

    cart = JSON.parse(
      localStorage.getItem("newmartCart") || "[]"
    );

    if (!Array.isArray(cart)) cart = [];

  } catch (error) {
    cart = [];
  }

  function updateCart() {

    const cartItems = get("cartItems");
    const cartTotal = get("cartTotal");

    let total = 0;

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML =
        "<p>Your saved list is empty.</p>";
    }

    cart.forEach((item, index) => {

      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      total += price * quantity;

      const div = document.createElement("div");
      div.className = "cart-item";

      const name = document.createElement("p");

      name.textContent =
        item.name + " - ₹" + price.toLocaleString("en-IN");

      const controls = document.createElement("div");

      const remove = document.createElement("button");

      remove.type = "button";
      remove.textContent = "Remove";

      remove.addEventListener("click", function () {
        cart.splice(index, 1);
        updateCart();
      });

      controls.appendChild(remove);

      div.append(name, controls);

      cartItems.appendChild(div);

    });

    if (cartTotal) {
      cartTotal.textContent =
        "₹" + total.toLocaleString("en-IN");
    }

    localStorage.setItem(
      "newmartCart",
      JSON.stringify(cart)
    );

  }

  const clearCart = get("clearCart");

  if (clearCart) {

    clearCart.addEventListener("click", function () {

      if (cart.length === 0) {
        alert("Your saved list is already empty.");
        return;
      }

      if (confirm("Clear all saved items?")) {
        cart = [];
        updateCart();
      }

    });

  }


  // ======================================
  // MOBILE MENU
  // ======================================

  const mobileMenu = get("mobileMenu");
  const mainNav = get("mainNav");

  if (mobileMenu && mainNav) {

    mobileMenu.addEventListener("click", function () {

      mainNav.classList.toggle("active");

      const icon = mobileMenu.querySelector("i");

      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }

    });

    mainNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", function () {

        mainNav.classList.remove("active");

        const icon = mobileMenu.querySelector("i");

        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }

      });

    });

  }


  // ======================================
  // SHOPPING SLIDER
  // ======================================

  const slider = get("shoppingSlider");

  if (slider) {

    const slides = slider.querySelectorAll(".slide");
    const dotsContainer = slider.querySelector(".slider-dots");
    const prev = slider.querySelector(".slider-prev");
    const next = slider.querySelector(".slider-next");

    let current = 0;
    let timer;

    if (dotsContainer && slides.length > 0) {

      dotsContainer.innerHTML = "";

      slides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.setAttribute(
          "aria-label",
          "Go to slide " + (index + 1)
        );

        dot.addEventListener("click", function () {
          showSlide(index);
          restartTimer();
        });

        dotsContainer.appendChild(dot);

      });

      const dots = dotsContainer.querySelectorAll("button");

      function showSlide(index) {

        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === current);
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === current);
        });

      }

      function restartTimer() {

        clearInterval(timer);

        timer = setInterval(function () {
          showSlide(current + 1);
        }, 4000);

      }

      if (prev) {

        prev.addEventListener("click", function () {
          showSlide(current - 1);
          restartTimer();
        });

      }

      if (next) {

        next.addEventListener("click", function () {
          showSlide(current + 1);
          restartTimer();
        });

      }

      showSlide(0);
      restartTimer();

    }

  }


  // ======================================
  // INITIAL LOAD
  // ======================================

  updateCart();
  updateWishlist();
  filterProducts();

});
