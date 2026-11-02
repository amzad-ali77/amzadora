
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =====================================
  // AMZADORA - 90 PRODUCTS WITH PHOTOS
  // Amazon 35 | Flipkart 35 | Myntra 20
  // =====================================

  const AMAZON_TAG = "YOUR_AMAZON_TAG";
  const API_URL = "https://dummyjson.com/products?limit=0";

  const get = id => document.getElementById(id);

  const productGrid = get("productGrid") || get("products");
  const searchInput = get("searchInput");
  const sortProducts = get("sortProducts");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");

  let products = [];
  let wishlist = [];

  let activeStore = "all";
  let activeCategory = "all";
  let searchText = "";

  try {
    wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
  } catch {
    wishlist = [];
  }

  const fashionCategories = [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "sunglasses"
  ];

  const allowedCategories = [
    "beauty",
    "fragrances",
    "furniture",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "smartphones",
    "sports-accessories",
    "tablets",
    "tops",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "sunglasses"
  ];

  function getCategory(category) {
    if (["smartphones", "mobile-accessories", "tablets"].includes(category)) return "mobiles";
    if (["mens-shirts", "mens-shoes", "mens-watches", "tops", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches", "sunglasses"].includes(category)) return "fashion";
    if (["beauty", "fragrances"].includes(category)) return "beauty";
    if (["furniture", "home-decoration", "kitchen-accessories"].includes(category)) return "home";
    if (["sports-accessories"].includes(category)) return "fitness";
    return "electronics";
  }

  function getStoreLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return `https://www.amazon.in/s?k=${query}&tag=${AMAZON_TAG}`;
    }

    if (product.store === "Flipkart") {
      return `https://www.flipkart.com/search?q=${query}`;
    }

    return `https://www.myntra.com/${query}`;
  }

  // =====================================
  // LOAD 90 UNIQUE PRODUCT PHOTOS
  // =====================================

  async function loadProducts() {
    if (productGrid) {
      productGrid.innerHTML = "<p>Loading products and photos...</p>";
    }

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Product API is not responding");
      }

      const data = await response.json();

      const usedImages = new Set();

      const allProducts = data.products.filter(product => {
        const image = product.images?.[0] || product.thumbnail;

        if (!image || !allowedCategories.includes(product.category)) return false;
        if (usedImages.has(image)) return false;

        usedImages.add(image);
        return true;
      });

      const generalProducts = allProducts.filter(
        product => !fashionCategories.includes(product.category)
      );

      const fashionProducts = allProducts.filter(
        product => fashionCategories.includes(product.category)
      );

      const selected = [
        ...generalProducts.slice(0, 35).map(p => ({ ...p, store: "Amazon" })),
        ...generalProducts.slice(35, 70).map(p => ({ ...p, store: "Flipkart" })),
        ...fashionProducts.slice(0, 20).map(p => ({ ...p, store: "Myntra" }))
      ];

      // Remove any duplicate image URL across the complete selection.
      const finalImages = new Set();

      products = selected.filter(p => {
        const image = p.images?.[0] || p.thumbnail;
        if (!image || finalImages.has(image)) return false;
        finalImages.add(image);
        return true;
      }).map(p => ({
        id: "product-" + p.id,
        name: p.title,
        category: getCategory(p.category),
        originalCategory: p.category,
        image: p.images?.[0] || p.thumbnail,
        price: p.price,
        store: p.store
      }));

      console.log("Total products:", products.length);
      console.log("Amazon:", products.filter(p => p.store === "Amazon").length);
      console.log("Flipkart:", products.filter(p => p.store === "Flipkart").length);
      console.log("Myntra:", products.filter(p => p.store === "Myntra").length);
      console.log("Unique photos:", new Set(products.map(p => p.image)).size);

      if (products.length === 0) {
        throw new Error("No matching products were returned");
      }

      renderProducts();
      renderWishlist();
      updateWishlistCount();

    } catch (error) {
      console.error("Product loading error:", error);

      if (productGrid) {
        productGrid.innerHTML =
          "<p>Products load nahi ho paaye. Internet connection check karke refresh karo.</p>";
      }
    }
  }

  // =====================================
  // PRODUCT CARD
  // =====================================

  function createProductCard(product) {
    const saved = wishlist.includes(product.id);

    return `
      <article class="product-card">
        <div class="product-art">
          <img
            class="product-image"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          >

          <div class="product-fallback-icon" style="display:none;">
            <i class="fa-solid fa-image"></i>
          </div>

          <button
            class="heart-btn ${saved ? "active" : ""}"
            data-wishlist="${product.id}"
            aria-label="Wishlist"
          >
            <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="store">${product.store}</span>
          <h3>${product.name}</h3>

          <div class="product-meta">
            <span class="product-category">${product.category}</span>
          </div>

          <div class="product-footer">
            <strong>Check Price</strong>
            <a
              class="buy-now"
              href="${getStoreLink(product)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Deal
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // =====================================
  // FILTER / SEARCH / SORT
  // =====================================

  function renderProducts() {
    if (!productGrid) return;

    let filtered = products.filter(product => {
      const storeMatch =
        activeStore === "all" ||
        product.store.toLowerCase() === activeStore.toLowerCase();

      const categoryMatch =
        activeCategory === "all" ||
        product.category === activeCategory;

      const searchMatch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      return storeMatch && categoryMatch && searchMatch;
    });

    if (sortProducts) {
      if (sortProducts.value === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    productGrid.innerHTML = filtered.length
      ? filtered.map(createProductCard).join("")
      : "";

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} products`;
    }

    if (emptyState) {
      emptyState.style.display = filtered.length ? "none" : "block";
    }

    productGrid.querySelectorAll("[data-wishlist]").forEach(button => {
      button.addEventListener("click", () => {
        toggleWishlist(button.dataset.wishlist);
      });
    });
  }

  // =====================================
  // STORE FILTER
  // =====================================

  document.querySelectorAll(".store-filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".store-filter").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      activeStore = button.dataset.store || "all";
      renderProducts();
    });
  });

  // =====================================
  // CATEGORY FILTER
  // =====================================

  document.querySelectorAll("[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-category]").forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");
      activeCategory = button.dataset.category || "all";
      renderProducts();
    });
  });

  // =====================================
  // SEARCH
  // =====================================

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchText = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  const searchForm = get("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      searchText = searchInput?.value.trim().toLowerCase() || "";
      renderProducts();
    });
  }

  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // =====================================
  // WISHLIST
  // =====================================

  function updateWishlistCount() {
    if (get("wishlistCount")) {
      get("wishlistCount").textContent = wishlist.length;
    }

    if (get("wishlistHeadingCount")) {
      get("wishlistHeadingCount").textContent = wishlist.length;
    }
  }

  function toggleWishlist(id) {
    wishlist = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];

    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));

    renderProducts();
    renderWishlist();
    updateWishlistCount();
  }

  function renderWishlist() {
    const savedItems = get("savedItems");
    if (!savedItems) return;

    const savedProducts = products.filter(p => wishlist.includes(p.id));

    savedItems.innerHTML = savedProducts.length
      ? savedProducts.map(p => `
          <div class="saved-item">
            <img src="${p.image}" alt="${p.name}" width="50">
            <span>${p.name}</span>
            <button class="remove-saved" data-remove="${p.id}">Remove</button>
          </div>
        `).join("")
      : `<p class="wishlist-empty">Your wishlist is empty.</p>`;

    savedItems.querySelectorAll("[data-remove]").forEach(button => {
      button.addEventListener("click", () => {
        toggleWishlist(button.dataset.remove);
      });
    });
  }

  const clearWishlist = get("clearWishlist");

  if (clearWishlist) {
    clearWishlist.addEventListener("click", () => {
      wishlist = [];
      localStorage.setItem("amzadWishlist", "[]");
      renderProducts();
      renderWishlist();
      updateWishlistCount();
    });
  }

  // =====================================
  // MOBILE MENU
  // =====================================

  const mobileMenu = get("mobileMenu");
  const mainNav = get("mainNav");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", () => {
      mainNav.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // =====================================
  // RESET FILTERS
  // =====================================

  const resetFilters = get("resetFilters");

  if (resetFilters) {
    resetFilters.addEventListener("click", () => {
      activeStore = "all";
      activeCategory = "all";
      searchText = "";

      if (searchInput) searchInput.value = "";

      document.querySelectorAll(".store-filter").forEach(button => {
        button.classList.toggle(
          "active",
          (button.dataset.store || "all") === "all"
        );
      });

      document.querySelectorAll("[data-category]").forEach(button => {
        button.classList.toggle(
          "active",
          (button.dataset.category || "all") === "all"
        );
      });

      renderProducts();
    });
  }

  if (get("year")) {
    get("year").textContent = new Date().getFullYear();
  }

  loadProducts();
});
