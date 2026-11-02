
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const AMAZON_TAG = "YOUR_AMAZON_TAG";
  const API_URL = "https://dummyjson.com/products?limit=0";

  const $ = id => document.getElementById(id);

  const grid = $("productGrid");
  const searchInput = $("searchInput");
  const sortSelect = $("sortProducts");
  const resultCount = $("resultsCount");
  const emptyState = $("emptyState");

  let products = [];
  let activeStore = "all";
  let activeCategory = "all";
  let searchText = "";

  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch {
    wishlist = [];
  }

  // CATEGORY MAPPING
  function mapCategory(category) {
    const map = {
      "smartphones": "mobiles",
      "mobile-accessories": "mobiles",
      "tablets": "electronics",
      "laptops": "electronics",
      "mens-shirts": "fashion",
      "tops": "fashion",
      "womens-dresses": "fashion",
      "womens-bags": "fashion",
      "womens-jewellery": "fashion",
      "mens-watches": "fashion",
      "womens-watches": "fashion",
      "mens-shoes": "shoes",
      "womens-shoes": "shoes",
      "beauty": "beauty",
      "skin-care": "beauty",
      "fragrances": "beauty",
      "furniture": "home",
      "home-decoration": "home",
      "kitchen-accessories": "home",
      "sports-accessories": "fitness",
      "sunglasses": "fashion"
    };

    return map[category] || "electronics";
  }

  // STORE LINKS
  function storeLink(product) {
    const q = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return `https://www.amazon.in/s?k=${q}&tag=${AMAZON_TAG}`;
    }

    if (product.store === "Flipkart") {
      return `https://www.flipkart.com/search?q=${q}`;
    }

    return `https://www.myntra.com/${q}`;
  }

  // LOAD PRODUCTS AND REAL CATALOGUE IMAGES
  async function loadProducts() {
    grid.innerHTML = "<p>Loading products and photos...</p>";

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("API response error: " + response.status);
      }

      const data = await response.json();

      if (!Array.isArray(data.products)) {
        throw new Error("Product data not found");
      }

      const usedImages = new Set();

      const available = data.products.filter(item => {
        const image = item.thumbnail || item.images?.[0];

        if (!image || usedImages.has(image)) return false;

        usedImages.add(image);
        return true;
      });

      if (available.length < 90) {
        throw new Error("API returned fewer than 90 unique product images");
      }

      // Select 90 different products and images.
      const selected = available.slice(0, 90);

      products = selected.map((item, index) => {
        let store;

        if (index < 35) {
          store = "Amazon";
        } else if (index < 70) {
          store = "Flipkart";
        } else {
          store = "Myntra";
        }

        return {
          id: String(item.id),
          name: item.title,
          category: mapCategory(item.category),
          price: item.price,
          image: item.thumbnail || item.images[0],
          store
        };
      });

      console.log("Total products:", products.length);
      console.log("Amazon:", products.filter(p => p.store === "Amazon").length);
      console.log("Flipkart:", products.filter(p => p.store === "Flipkart").length);
      console.log("Myntra:", products.filter(p => p.store === "Myntra").length);
      console.log("Unique image URLs:", new Set(products.map(p => p.image)).size);

      renderProducts();
      renderWishlist();
      updateWishlistCount();

    } catch (error) {
      console.error("AMZADORA loading error:", error);

      grid.innerHTML = `
        <div style="padding:25px;text-align:center;grid-column:1/-1">
          <h3>Products could not load</h3>
          <p>${error.message}</p>
          <button onclick="location.reload()">Try Again</button>
        </div>
      `;

      if (resultCount) resultCount.textContent = "Loading failed";
    }
  }

  // PRODUCT CARD
  function productCard(p) {
    const saved = wishlist.includes(p.id);

    return `
      <article class="product-card">
        <div class="product-art">
          <img
            class="product-image"
            src="${p.image}"
            alt="${p.name.replace(/"/g, "&quot;")}"
            loading="lazy"
            style="width:100%;height:220px;object-fit:contain;background:#fff;"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          >

          <div class="product-fallback-icon"
               style="display:none;align-items:center;justify-content:center;height:220px;">
            <i class="fa-solid fa-image"></i>
          </div>

          <button class="heart-btn ${saved ? "active" : ""}"
                  data-wishlist="${p.id}">
            <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="store">${p.store}</span>
          <h3>${p.name}</h3>

          <div class="product-meta">
            <span class="product-category">${p.category}</span>
          </div>

          <div class="product-footer">
            <strong>₹${Number(p.price).toLocaleString("en-IN")}</strong>
            <a class="buy-now"
               href="${storeLink(p)}"
               target="_blank"
               rel="noopener noreferrer">
              View Deal
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // RENDER PRODUCTS
  function renderProducts() {
    let filtered = products.filter(p => {
      const storeMatch =
        activeStore === "all" || p.store === activeStore;

      const categoryMatch =
        activeCategory === "all" || p.category === activeCategory;

      const searchMatch =
        p.name.toLowerCase().includes(searchText) ||
        p.category.includes(searchText);

      return storeMatch && categoryMatch && searchMatch;
    });

    if (sortSelect) {
      if (sortSelect.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortSelect.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortSelect.value === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    grid.innerHTML = filtered.map(productCard).join("");

    if (resultCount) {
      resultCount.textContent = `Showing ${filtered.length} products`;
    }

    if (emptyState) {
      emptyState.hidden = filtered.length > 0;
    }

    grid.querySelectorAll("[data-wishlist]").forEach(button => {
      button.addEventListener("click", () => {
        toggleWishlist(button.dataset.wishlist);
      });
    });
  }

  // STORE FILTER
  document.querySelectorAll(".store-filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".store-filter").forEach(b =>
        b.classList.remove("active")
      );

      button.classList.add("active");
      activeStore = button.dataset.store || "all";
      renderProducts();
    });
  });

  // CATEGORY FILTER
  document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".category-card").forEach(b =>
        b.classList.remove("active")
      );

      button.classList.add("active");
      activeCategory = button.dataset.category || "all";
      renderProducts();
    });
  });

  // SEARCH
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchText = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  $("searchForm")?.addEventListener("submit", event => {
    event.preventDefault();
    searchText = searchInput.value.trim().toLowerCase();
    renderProducts();
  });

  // SORT
  sortSelect?.addEventListener("change", renderProducts);

  // WISHLIST
  function updateWishlistCount() {
    if ($("wishlistCount")) {
      $("wishlistCount").textContent = wishlist.length;
    }

    if ($("wishlistHeadingCount")) {
      $("wishlistHeadingCount").textContent = `(${wishlist.length})`;
    }
  }

  function toggleWishlist(id) {
    wishlist = wishlist.includes(id)
      ? wishlist.filter(x => x !== id)
      : [...wishlist, id];

    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));

    renderProducts();
    renderWishlist();
    updateWishlistCount();
  }

  function renderWishlist() {
    const savedItems = $("savedItems");
    if (!savedItems) return;

    const saved = products.filter(p => wishlist.includes(p.id));

    savedItems.innerHTML = saved.length
      ? saved.map(p => `
          <div class="saved-item">
            <img src="${p.image}" alt="${p.name}" width="55">
            <span>${p.name}</span>
            <button class="remove-saved" data-remove="${p.id}">Remove</button>
          </div>
        `).join("")
      : `<p class="wishlist-empty">Your wishlist is empty. Save products you like!</p>`;

    savedItems.querySelectorAll("[data-remove]").forEach(button => {
      button.addEventListener("click", () =>
        toggleWishlist(button.dataset.remove)
      );
    });
  }

  $("clearWishlist")?.addEventListener("click", () => {
    wishlist = [];
    localStorage.setItem("amzadWishlist", "[]");
    renderProducts();
    renderWishlist();
    updateWishlistCount();
  });

  // MOBILE MENU
  $("mobileMenu")?.addEventListener("click", () => {
    $("mainNav")?.classList.toggle("active");
  });

  // RESET FILTERS
  $("resetFilters")?.addEventListener("click", () => {
    activeStore = "all";
    activeCategory = "all";
    searchText = "";

    if (searchInput) searchInput.value = "";

    document.querySelectorAll(".store-filter").forEach(b => {
      b.classList.toggle("active", b.dataset.store === "all");
    });

    document.querySelectorAll(".category-card").forEach(b => {
      b.classList.toggle("active", b.dataset.category === "all");
    });

    renderProducts();
  });

  if ($("year")) {
    $("year").textContent = new Date().getFullYear();
  }

  loadProducts();
});
