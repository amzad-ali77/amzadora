
// ======================================
// AMZADMART - MAIN JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

  // STORAGE
  let cart = JSON.parse(localStorage.getItem("newmartCart") || "[]");
  let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");

  // ELEMENTS
  const productGrid = document.getElementById("productGrid");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const categoryButtons = document.querySelectorAll(".category");
  const storeButtons = document.querySelectorAll(".partner-filter");
  const sortSelect = document.getElementById("sortProducts");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");

  // ======================================
  // CART
  // ======================================

  function saveCart() {
    localStorage.setItem("newmartCart", JSON.stringify(cart));
  }

  function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    let total = 0;
    let count = 0;

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
      minus.textContent = "−";
      minus.type = "button";
      minus.addEventListener("click", () => changeQuantity(index, -1));

      const qty = document.createElement("span");
      qty.textContent = " " + quantity + " ";

      const plus = document.createElement("button");
      plus.textContent = "+";
      plus.type = "button";
      plus.addEventListener("click", () => changeQuantity(index, 1));

      const remove = document.createElement("button");
      remove.textContent = "Remove";
      remove.type = "button";
      remove.addEventListener("click", () => removeCartItem(index));

      controls.append(minus, qty, plus, remove);
      div.append(name, controls);
      cartItems.appendChild(div);
    });

    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
    cartCount.textContent = count;

    saveCart();
  }

  function changeQuantity(index, amount) {
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

  // ADD TO CART
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const price = Number(this.dataset.price);

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

      this.innerHTML = '<i class="fa-solid fa-check"></i> Added';
      setTimeout(() => {
        this.innerHTML = '<i class="fa-solid fa-cart-plus"></i> Add';
      }, 1000);
    });
  });

  // CLEAR CART
  document.getElementById("clearCart").addEventListener("click", function () {
    if (cart.length === 0) {
      alert("Your cart is already empty!");
      return;
    }

    if (confirm("Are you sure you want to clear your cart?")) {
      cart = [];
      updateCart();
    }
  });

  // ======================================
  // WISHLIST
  // ======================================

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
  }

  function updateWishlistCount() {
    document.getElementById("wishlistCount").textContent = wishlist.length;
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

  document.querySelectorAll(".heart-btn").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".product-card");
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
  });

  document.getElementById("wishlistHeader").addEventListener("click", function () {
    const products = wishlist.length
      ? wishlist.join("\n")
      : "Your wishlist is empty.";

    alert("Your Wishlist:\n\n" + products);
  });

  // ======================================
  // SEARCH, CATEGORY AND STORE FILTERS
  // ======================================

  let selectedCategory = "all";
  let selectedStore = "all";

  function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    let cards = Array.from(
      productGrid.querySelectorAll(".product-card")
    );

    // SORT
    const sortValue = sortSelect.value;

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
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;
      const store = card.dataset.store;

      const matchesSearch = name.includes(searchText);
      const matchesCategory =
        selectedCategory === "all" || category === selectedCategory;
      const matchesStore =
        selectedStore === "all" || store === selectedStore;

      const show =
        matchesSearch && matchesCategory && matchesStore;

      card.style.display = show ? "" : "none";

      if (show) visible++;
    });

    resultsCount.textContent = "Showing " + visible + " products";
    emptyState.hidden = visible !== 0;
  }

  searchInput.addEventListener("input", filterProducts);
  searchButton.addEventListener("click", filterProducts);
  sortSelect.addEventListener("change", filterProducts);

  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      categoryButtons.forEach(btn => btn.classList.remove("active"));

      this.classList.add("active");
      selectedCategory = this.dataset.category;

      filterProducts();
    });
  });

  storeButtons.forEach(button => {
    button.addEventListener("click", function () {
      storeButtons.forEach(btn => btn.classList.remove("selected"));

      this.classList.add("selected");
      selectedStore = this.dataset.store;

      filterProducts();
    });
  });

  // RESET FILTERS
  document.getElementById("resetFilters").addEventListener("click", function () {
    searchInput.value = "";
    selectedCategory = "all";
    selectedStore = "all";
    sortSelect.value = "default";

    categoryButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === "all");
    });

    storeButtons.forEach(btn => {
      btn.classList.toggle("selected", btn.dataset.store === "all");
    });

    filterProducts();
  });

  // ======================================
  // MOBILE MENU
  // ======================================

  const mobileMenu = document.getElementById("mobileMenu");
  const mainNav = document.getElementById("mainNav");

  mobileMenu.addEventListener("click", function () {
    mainNav.classList.toggle("nav-open");

    const icon = mobileMenu.querySelector("i");

    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("nav-open");

      const icon = mobileMenu.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });

  // ======================================
  // CHECKOUT / PLACE ORDER
  // ======================================

  document.getElementById("placeOrder").addEventListener("click", function () {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const orderMessage = document.getElementById("orderMessage");

    if (cart.length === 0) {
      orderMessage.textContent = "Your cart is empty!";
      orderMessage.style.color = "red";
      return;
    }

    if (!name || !phone || !address) {
      orderMessage.textContent = "Please fill all delivery details!";
      orderMessage.style.color = "red";
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      orderMessage.textContent = "Enter a valid 10-digit mobile number!";
      orderMessage.style.color = "red";
      return;
    }

    const total = cart.reduce((sum, item) => {
      return sum + (Number(item.price) * (Number(item.quantity) || 1));
    }, 0);

    const order = {
      orderId: "AMZ" + Date.now(),
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      paymentMethod: "Cash on Delivery",
      products: [...cart],
      totalAmount: total,
      orderDate: new Date().toLocaleString(),
      status: "Pending"
    };

    const orders = JSON.parse(
      localStorage.getItem("newmartOrders") || "[]"
    );

    orders.push(order);

    localStorage.setItem("newmartOrders", JSON.stringify(orders));

    cart = [];
    updateCart();

    orderMessage.textContent =
      "Order placed successfully! Order ID: " + order.orderId;

    orderMessage.style.color = "green";

    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";

    alert("Thank you! Your order has been placed successfully.");
  });

  // INITIAL LOAD
  updateCart();
  updateWishlistCount();
  updateHeartButtons();
  filterProducts();

});
