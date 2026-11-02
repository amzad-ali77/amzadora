
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =====================================
  // AMZADORA - MAIN JAVASCRIPT
  // =====================================

  const AMAZON_TAG = "amzadmart07-21";
  const API_URL = "https://dummyjson.com/products?limit=0";

  const get = (id) => document.getElementById(id);

  const productGrid = get("productGrid");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");
  const searchInput = get("searchInput");
  const sortProducts = get("sortProducts");

  let products = [];
  let activeStore = "all";
  let activeCategory = "all";
  let searchTerm = "";

  // =====================================
  // LOCAL STORAGE
  // =====================================

  let wishlist = [];

  try {
    wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch (error) {
    wishlist = [];
  }

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
    updateWishlist();
  }

  // =====================================
  // HELPERS
  // =====================================

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

  function mapCategory(category) {
    const value = String(category || "").toLowerCase();

    if (value.includes("smartphone") || value.includes("mobile")) return "mobiles";
    if (value.includes("laptop") || value.includes("computer")) return "electronics";
    if (value.includes("shoe")) return "shoes";
    if (value.includes("shirt") || value.includes("dress") ||
        value.includes("tops") || value.includes("jewellery") ||
        value.includes("watches") || value.includes("bags")) return "fashion";
    if (value.includes("beauty") || value.includes("skin") ||
        value.includes("fragrance")) return "beauty";
    if (value.includes("furniture") || value.includes("home") ||
        value.includes("kitchen")) return "home";
    if (value.includes("sports") || value.includes("fitness")) return "fitness";

    return "electronics";
  }

  // =====================================
  // STORE LINKS
  // =====================================

  function storeLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return `https://www.amazon.in/s?k=${query}&tag=${AMAZON_TAG}`;
    }

    if (product.store === "Flipkart") {
      return `https://www.flipkart.com/search?q=${query}`;
    }

    return `https://www.myntra.com/search?q=${query}`;
  }

  // =====================================
  // PRODUCT CARD
  // =====================================

  function productCard(product) {
    const isSaved = wishlist.some(
      item => String(item.id) === String(product.id)
    );

    return `
      <div class="product-card">
        <div class="product-image">
          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.src='https://placehold.co/400x400?text=Product'"
          >

          <button
            class="wishlist-btn ${isSaved ? "active" : ""}"
            data-wishlist="${escapeHTML(product.id)}"
            aria-label="Add to wishlist"
            type="button"
          >
            <i class="${isSaved ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">
            ${escapeHTML(product.category)}
          </span>

          <h3>${escapeHTML(product.name)}</h3>

          <div class="product-footer">
            <strong>${formatPrice(product.price)}</strong>

            <a
              class="buy-now"
              href="${storeLink(product)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy on ${escapeHTML(product.store)}
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  async function loadProducts() {
    if (!productGrid) return;

    if (resultsCount) {
      resultsCount.textContent = "Loading products...";
    }

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Product API failed");
      }

      const data = await response.json();

      const usedImages = new Set();

      const available = data.products.filter(item => {
        const image = item.thumbnail || item.images?.[0];

        if (!image || usedImages.has(image)) return false;

        usedImages.add(image);
        return true;
      });

      const selected = available.slice(0, 90);

      products = selected.map((item, index) => ({
        id: String(item.id),
        name: item.title,
        category: mapCategory(item.category),
        price: item.price,
        image: item.thumbnail || item.images?.[0],
        store: index < 35
          ? "Amazon"
          : index < 70
            ? "Flipkart"
            : "Myntra"
      }));

      renderProducts();

    } catch (error) {
      console.error("Product loading error:", error);

      productGrid.innerHTML = `
        <p class="error-message">
          Products load nahi ho paaye. Internet connection check karke
          page refresh karein.
        </p>
      `;

      if (resultsCount) {
        resultsCount.textContent = "Unable to load products";
      }
    }
  }

  // =====================================
  // FILTER + SEARCH + SORT
  // =====================================

  function getFilteredProducts() {
    let filtered = [...products];

    if (activeStore !== "all") {
      filtered = filtered.filter(
        product => product.store.toLowerCase() === activeStore.toLowerCase()
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        product => product.category === activeCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    const sortValue = sortProducts?.value || "default";

    if (sortValue === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  // =====================================
  // DISPLAY PRODUCTS
  // =====================================

  function renderProducts() {
    if (!productGrid) return;

    const filtered = getFilteredProducts();

    productGrid.innerHTML = filtered.map(productCard).join("");

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} Products Found`;
    }

    if (emptyState) {
      emptyState.hidden = filtered.length !== 0;
    }
  }

  // =====================================
  // STORE FILTERS
  // =====================================

  document.querySelectorAll(".store-filter").forEach(button => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".store-filter").forEach(item => {
        item.classList.remove("active");
      });

      this.classList.add("active");
      activeStore = this.dataset.store || "all";

      renderProducts();
    });
  });

  // =====================================
  // CATEGORY FILTERS
  // =====================================

  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", function () {
      document.querySelectorAll(".category-card").forEach(item => {
        item.classList.remove("active");
      });

      this.classList.add("active");
      activeCategory = this.dataset.category || "all";

      renderProducts();
    });
  });

  // =====================================
  // SEARCH
  // =====================================

  if (get("searchForm")) {
    get("searchForm").addEventListener("submit", function (event) {
      event.preventDefault();
      searchTerm = searchInput?.value.trim().toLowerCase() || "";
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // =====================================
  // SORTING
  // =====================================

  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // =====================================
  // WISHLIST
  // =====================================

  function updateWishlist() {
    const count = wishlist.length;

    if (get("wishlistCount")) {
      get("wishlistCount").textContent = count;
    }

    if (get("wishlistHeadingCount")) {
      get("wishlistHeadingCount").textContent = count;
    }

    const savedItems = get("savedItems");

    if (savedItems) {
      savedItems.innerHTML = wishlist.length
        ? wishlist.map(item => `
            <div class="saved-item">
              <img src="${escapeHTML(item.image)}"
                   alt="${escapeHTML(item.name)}"
                   width="50">
              <span>${escapeHTML(item.name)}</span>
              <strong>${formatPrice(item.price)}</strong>
            </div>
          `).join("")
        : "<p>No saved products yet.</p>";
    }
  }

  if (productGrid) {
    productGrid.addEventListener("click", function (event) {
      const button = event.target.closest("[data-wishlist]");
      if (!button) return;

      const productId = button.dataset.wishlist;

      const existingIndex = wishlist.findIndex(
        item => String(item.id) === String(productId)
      );

      if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
      } else {
        const product = products.find(
          item => String(item.id) === String(productId)
        );

        if (product) wishlist.push(product);
      }

      saveWishlist();
      renderProducts();
    });
  }

  // =====================================
  // CLEAR WISHLIST
  // =====================================

  if (get("clearWishlist")) {
    get("clearWishlist").addEventListener("click", function () {
      wishlist = [];
      saveWishlist();
      renderProducts();
    });
  }

  // =====================================
  // RESET FILTERS
  // =====================================

  if (get("resetFilters")) {
    get("resetFilters").addEventListener("click", function () {
      activeStore = "all";
      activeCategory = "all";
      searchTerm = "";

      if (searchInput) searchInput.value = "";
      if (sortProducts) sortProducts.value = "default";

      document.querySelectorAll(".store-filter").forEach(item => {
        item.classList.toggle(item.dataset.store === "all" ? "active" : "inactive");
        if (item.dataset.store !== "all") item.classList.remove("active");
      });

      document.querySelectorAll(".category-card").forEach(item => {
        item.classList.remove("active");
      });

      const allCategory = document.querySelector(
        '.category-card[data-category="all"]'
      );

      if (allCategory) allCategory.classList.add("active");

      renderProducts();
    });
  }

  // =====================================
  // MOBILE MENU
  // =====================================

  const mobileMenu = get("mobileMenu");
  const mainNav = get("mainNav");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // =====================================
  // FOOTER YEAR
  // =====================================

  if (get("year")) {
    get("year").textContent = new Date().getFullYear();
  }

  // =====================================
  // INITIALIZE
  // =====================================

  updateWishlist();
  loadProducts();

});
