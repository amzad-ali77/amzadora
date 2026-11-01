
// ======================================
// AMZADMART - FIXED MAIN JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

  // STORAGE
  let cart = JSON.parse(localStorage.getItem("newmartCart") || "[]");
  let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");

  // SAFE ELEMENT SELECTOR
  const get = (id) => document.getElementById(id);

  // ======================================
  // CART
  // ======================================

  function saveCart() {
    localStorage.setItem("newmartCart", JSON.stringify(cart));
  }

  function updateCart() {
    const cartItems = get("cartItems");
    const cartTotal = get("cartTotal");
    const cartCount = get("cartCount");

    let total = 0;
    let count = 0;

    if (cartItems) {
      cartItems.innerHTML = "";

      if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      }

      cart.forEach((item, index) => {
        const quantity = Number(item.quantity) || 1;
        const price = Number(item.price) || 0;

        total += price * quantity;
        count += quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("p");
        name.textContent = item.name + " - ₹" + price;

        const controls = document.createElement("div");

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";
        minus.addEventListener("click", () => changeQuantity(index, -1));

        const qty = document.createElement("span");
        qty.textContent = " " + quantity + " ";

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";
        plus.addEventListener("click", () => changeQuantity(index, 1));

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeCartItem(index));

        controls.append(minus, qty, plus, remove);
        div.append(name, controls);
        cartItems.appendChild(div);
      });
    }

    if (cartTotal) {
      cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
    }

    if (cartCount) {
      cartCount.textContent = count;
    }

    saveCart();
  }

  function changeQuantity(index, amount) {
    if (!cart[index]) return;

    cart[index].quantity = (Number(cart[index].quantity) || 1) + amount;

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    updateCart();
  }

  function removeCartItem(index) {
    cart.splice(index, 1);
    updateCart();
  }

  // ADD TO CART - EVENT DELEGATION
  document.addEventListener("click", function (event) {
    const button = event.target.closest(".add-cart");
    if (!button) return;

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if (!name || !Number.isFinite(price) || price <= 0) {
      alert("Product details are invalid.");
      return;
    }

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity = (Number(existing.quantity) || 1) + 1;
    } else {
      cart.push({
        name: name,
        price: price,
        quantity: 1
      });
    }

    updateCart();

    const oldText = button.innerHTML;
    button.innerHTML = '<i class="fa-solid fa-check"></i> Added';

    setTimeout(() => {
      button.innerHTML = oldText;
    }, 1000);
  });

  // CLEAR CART
  const clearCart = get("clearCart");

  if (clearCart) {
    clearCart.addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
      }

      if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        updateCart();
      }
    });
  }

  // ======================================
  // WISHLIST
  // ======================================

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
  }

  function updateWishlistCount() {
    const count = get("wishlistCount");
    if (count) count.textContent = wishlist.length;
  }

  function updateHeartButtons() {
    document.querySelectorAll(".product-card").forEach(card => {
      const name = card.dataset.name;
      const button = card.querySelector(".heart-btn");

      if (!button) return;

      const liked = wishlist.includes(name);
      button.classList.toggle("liked", liked);

      button.innerHTML = liked
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';
    });
  }

  document.addEventListener("click", function (event) {
    const button = event.target.closest(".heart-btn");
    if (!button) return;

    const card = button.closest(".product-card");
    if (!card) return;

    const name = card.dataset.name;

    if (wishlist.includes(name)) {
      wishlist = wishlist.filter(item => item !== name);
    } else {
      wishlist.push(name);
    }

    saveWishlist();
    updateWishlistCount();
    updateHeartButtons();
  });

  const wishlistHeader = get("wishlistHeader");

  if (wishlistHeader) {
    wishlistHeader.addEventListener("click", function () {
      const products = wishlist.length
        ? wishlist.join("\n")
        : "Your wishlist is empty.";

      alert("Your Wishlist:\n\n" + products);
    });
  }

  // ======================================
  // SEARCH, CATEGORY AND STORE FILTERS
  // ======================================

  const productGrid = get("productGrid");
  const searchInput = get("searchInput");
  const searchButton = get("searchButton");
  const sortSelect = get("sortProducts");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");

  const categoryButtons = document.querySelectorAll(".category");
  const storeButtons = document.querySelectorAll(".partner-filter");

  let selectedCategory = "all";
  let selectedStore = "all";

  function filterProducts() {
    if (!productGrid) return;

    const searchText = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";

    let cards = Array.from(
      productGrid.querySelectorAll(".product-card")
    );

    const sortValue = sortSelect ? sortSelect.value : "default";

    if (sortValue === "low") {
      cards.sort((a, b) =>
        Number(a.dataset.price) - Number(b.dataset.price)
      );
    } else if (sortValue === "high") {
      cards.sort((a, b) =>
        Number(b.dataset.price) - Number(a.dataset.price)
      );
    } else if (sortValue === "name") {
      cards.sort((a, b) =>
        a.dataset.name.localeCompare(b.dataset.name)
      );
    }

    cards.forEach(card => productGrid.appendChild(card));

    let visible = 0;

    cards.forEach(card => {
      const name = (card.dataset.name || "").toLowerCase();
      const category = card.dataset.category;
      const store = card.dataset.store;

      const show =
        name.includes(searchText) &&
        (selectedCategory === "all" || category === selectedCategory) &&
        (selectedStore === "all" || store === selectedStore);

      card.style.display = show ? "" : "none";

      if (show) visible++;
    });

    if (resultsCount) {
      resultsCount.textContent = "Showing " + visible + " products";
    }

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }

  if (searchButton) {
    searchButton.addEventListener("click", filterProducts);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", filterProducts);
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      categoryButtons.forEach(btn => btn.classList.remove("active"));

      this.classList.add("active");
      selectedCategory = this.dataset.category || "all";

      filterProducts();
    });
  });

  storeButtons.forEach(button => {
    button.addEventListener("click", function () {
      storeButtons.forEach(btn => btn.classList.remove("selected"));

      this.classList.add("selected");
      selectedStore = this.dataset.store || "all";

      filterProducts();
    });
  });

  const resetFilters = get("resetFilters");

  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "default";

      selectedCategory = "all";
      selectedStore = "all";

      categoryButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === "all");
      });

      storeButtons.forEach(btn => {
        btn.classList.toggle("selected", btn.dataset.store === "all");
      });

      filterProducts();
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
  // CHECKOUT - OLD DEMO ONLY
  // ======================================

  const placeOrder = get("placeOrder");

  if (placeOrder) {
    placeOrder.addEventListener("click", function () {
      alert(
        "AmzadMart is a product discovery and affiliate website. " +
        "Please use the retailer's official website to complete your purchase."
      );
    });
  }

  // INITIAL LOAD
  updateCart();
  updateWishlistCount();
  updateHeartButtons();
  filterProducts();

});
// AUTOMATIC SHOPPING SLIDER

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.getElementById("shoppingSlider");

  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = slider.querySelector(".slider-dots");
  const prev = slider.querySelector(".slider-prev");
  const next = slider.querySelector(".slider-next");

  let current = 0;
  let timer;

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Go to slide " + (index + 1));

    dot.addEventListener("click", () => {
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
    timer = setInterval(() => {
      showSlide(current + 1);
    }, 4000);
  }

  prev.addEventListener("click", () => {
    showSlide(current - 1);
    restartTimer();
  });

  next.addEventListener("click", () => {
    showSlide(current + 1);
    restartTimer();
  });

  showSlide(0);
  restartTimer();
});

// ===================================
// AMZADMART PRODUCT SEARCH
// ===================================

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  if (!searchInput) {
    console.log("Search input nahi mila!");
    return;
  }

  function searchProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();

    productCards.forEach(function (card) {

      const productDetails = card.textContent.toLowerCase();

      if (productDetails.includes(searchValue)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });
  }

  searchInput.addEventListener("input", searchProducts);

});
