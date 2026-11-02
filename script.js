
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =========================================
  // AMZADORA - 45 PRODUCTS
  // =========================================

  const AMAZON_TAG = "YOUR_AMAZON_TAG"; // Apna Amazon affiliate ID yahan paste karo

  let cart = JSON.parse(localStorage.getItem("newmartCart") || "[]");
  let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");

  let activeStore = "all";
  let activeCategory = "all";
  let searchText = "";

  const get = (id) => document.getElementById(id);

  const productGrid = get("productGrid");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");

  // =========================================
  // PRODUCT DATA - AMAZON (15)
  // =========================================

  const products = [
    // AMAZON - ELECTRONICS
    {id:"a1",name:"Wireless Headphones",category:"electronics",store:"Amazon",price:1499,icon:"fa-headphones",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"},
    {id:"a2",name:"Bluetooth Speaker",category:"electronics",store:"Amazon",price:999,icon:"fa-volume-high",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"},
    {id:"a3",name:"Smart Watch",category:"electronics",store:"Amazon",price:1999,icon:"fa-clock",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"},
    {id:"a4",name:"Power Bank 20000mAh",category:"electronics",store:"Amazon",price:1299,icon:"fa-battery-full",image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600"},
    {id:"a5",name:"Laptop",category:"electronics",store:"Amazon",price:42999,icon:"fa-laptop",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"},
    {id:"a6",name:"Computer Monitor",category:"electronics",store:"Amazon",price:8999,icon:"fa-desktop",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"},
    {id:"a7",name:"Wireless Keyboard",category:"electronics",store:"Amazon",price:799,icon:"fa-keyboard",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"},
    {id:"a8",name:"Gaming Mouse",category:"electronics",store:"Amazon",price:599,icon:"fa-computer-mouse",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"},
    {id:"a9",name:"Bluetooth Earbuds",category:"electronics",store:"Amazon",price:1199,icon:"fa-ear-listen",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"},

    // AMAZON - MOBILES
    {id:"a10",name:"Smartphone",category:"mobiles",store:"Amazon",price:12999,icon:"fa-mobile-screen",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"},
    {id:"a11",name:"Mobile Phone Cover",category:"mobiles",store:"Amazon",price:299,icon:"fa-mobile",image:"https://images.unsplash.com/photo-1601593346740-925612772716?w=600"},
    {id:"a12",name:"Fast Charger",category:"mobiles",store:"Amazon",price:499,icon:"fa-plug",image:"https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600"},

    // AMAZON - HOME / BEAUTY / FITNESS
    {id:"a13",name:"Skincare Kit",category:"beauty",store:"Amazon",price:899,icon:"fa-spa",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"},
    {id:"a14",name:"Table Lamp",category:"home",store:"Amazon",price:699,icon:"fa-lightbulb",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"},
    {id:"a15",name:"Gym Dumbbells",category:"fitness",store:"Amazon",price:999,icon:"fa-dumbbell",image:"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600"},

    // =========================================
    // FLIPKART - 15 PRODUCTS
    // =========================================

    {id:"f1",name:"DSLR Digital Camera",category:"electronics",store:"Flipkart",price:24999,icon:"fa-camera",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"},
    {id:"f2",name:"Gaming Headset",category:"electronics",store:"Flipkart",price:1799,icon:"fa-headphones",image:"https://images.unsplash.com/photo-1599669454699-248893623440?w=600"},
    {id:"f3",name:"Portable Bluetooth Speaker",category:"electronics",store:"Flipkart",price:1499,icon:"fa-volume-high",image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600"},
    {id:"f4",name:"Wireless Mouse",category:"electronics",store:"Flipkart",price:449,icon:"fa-computer-mouse",image:"https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600"},
    {id:"f5",name:"Tablet",category:"electronics",store:"Flipkart",price:11999,icon:"fa-tablet-screen-button",image:"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"},
    {id:"f6",name:"Android Smartphone",category:"mobiles",store:"Flipkart",price:10999,icon:"fa-mobile-screen",image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"},
    {id:"f7",name:"Smartphone Stand",category:"mobiles",store:"Flipkart",price:249,icon:"fa-mobile",image:"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"},
    {id:"f8",name:"Mobile Tripod",category:"mobiles",store:"Flipkart",price:599,icon:"fa-camera",image:"https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=600"},
    {id:"f9",name:"Casual T-Shirt",category:"fashion",store:"Flipkart",price:499,icon:"fa-shirt",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"},
    {id:"f10",name:"Men's Casual Shirt",category:"fashion",store:"Flipkart",price:799,icon:"fa-shirt",image:"https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600"},
    {id:"f11",name:"Running Shoes",category:"shoes",store:"Flipkart",price:1299,icon:"fa-shoe-prints",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"},
    {id:"f12",name:"Sports Shoes",category:"shoes",store:"Flipkart",price:1599,icon:"fa-shoe-prints",image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"},
    {id:"f13",name:"Home Decor Vase",category:"home",store:"Flipkart",price:499,icon:"fa-house",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600"},
    {id:"f14",name:"Wall Clock",category:"home",store:"Flipkart",price:399,icon:"fa-clock",image:"https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600"},
    {id:"f15",name:"Yoga Mat",category:"fitness",store:"Flipkart",price:599,icon:"fa-dumbbell",image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600"},

    // =========================================
    // MYNTRA - 15 PRODUCTS
    // =========================================

    {id:"m1",name:"Men's Casual T-Shirt",category:"fashion",store:"Myntra",price:599,icon:"fa-shirt",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"},
    {id:"m2",name:"Men's Denim Jacket",category:"fashion",store:"Myntra",price:1499,icon:"fa-shirt",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"},
    {id:"m3",name:"Women's Fashion Dress",category:"fashion",store:"Myntra",price:1299,icon:"fa-person-dress",image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600"},
    {id:"m4",name:"Women's Handbag",category:"fashion",store:"Myntra",price:999,icon:"fa-bag-shopping",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"},
    {id:"m5",name:"Men's Formal Shirt",category:"fashion",store:"Myntra",price:899,icon:"fa-shirt",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600"},
    {id:"m6",name:"Women's Kurti",category:"fashion",store:"Myntra",price:799,icon:"fa-person-dress",image:"https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600"},
    {id:"m7",name:"Men's Running Shoes",category:"shoes",store:"Myntra",price:1799,icon:"fa-shoe-prints",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"},
    {id:"m8",name:"Women's Sneakers",category:"shoes",store:"Myntra",price:1499,icon:"fa-shoe-prints",image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"},
    {id:"m9",name:"Sports Shoes",category:"shoes",store:"Myntra",price:1999,icon:"fa-shoe-prints",image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600"},
    {id:"m10",name:"Sunglasses",category:"fashion",store:"Myntra",price:499,icon:"fa-glasses",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"},
    {id:"m11",name:"Women's Skincare Set",category:"beauty",store:"Myntra",price:999,icon:"fa-spa",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600"},
    {id:"m12",name:"Makeup Kit",category:"beauty",store:"Myntra",price:799,icon:"fa-palette",image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"},
    {id:"m13",name:"Beauty Face Cream",category:"beauty",store:"Myntra",price:399,icon:"fa-spa",image:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"},
    {id:"m14",name:"Women's Sports Leggings",category:"fitness",store:"Myntra",price:699,icon:"fa-person-running",image:"https://images.unsplash.com/photo-1506629905607-d9a8d6e9f4f2?w=600"},
    {id:"m15",name:"Gym Sports T-Shirt",category:"fitness",store:"Myntra",price:599,icon:"fa-dumbbell",image:"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"}
  ];

  // =========================================
  // PRODUCT LINKS
  // =========================================

  function getProductLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      let url = "https://www.amazon.in/s?k=" + query;

      if (AMAZON_TAG && AMAZON_TAG !== "YOUR_AMAZON_TAG") {
        url += "&tag=" + encodeURIComponent(AMAZON_TAG);
      }

      return url;
    }

    if (product.store === "Flipkart") {
      return "https://www.flipkart.com/search?q=" + query;
    }

    if (product.store === "Myntra") {
      return "https://www.myntra.com/search?q=" + query;
    }

    return "#";
  }

  // =========================================
  // SAFE HTML
  // =========================================

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[char];
    });
  }

  // =========================================
  // FILTER PRODUCTS
  // =========================================

  function getFilteredProducts() {
    let filtered = [...products];

    if (activeStore !== "all") {
      filtered = filtered.filter(function (product) {
        return product.store.toLowerCase() === activeStore.toLowerCase();
      });
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(function (product) {
        return product.category === activeCategory;
      });
    }

    if (searchText) {
      filtered = filtered.filter(function (product) {
        return (
          product.name.toLowerCase().includes(searchText) ||
          product.category.toLowerCase().includes(searchText) ||
          product.store.toLowerCase().includes(searchText)
        );
      });
    }

    return filtered;
  }

  // =========================================
  // RENDER PRODUCTS
  // =========================================

  function renderProducts() {
    if (!productGrid) return;

    let filtered = getFilteredProducts();

    const sortSelect = get("sortProducts");
    const sortValue = sortSelect ? sortSelect.value : "default";

    if (sortValue === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (resultsCount) {
      resultsCount.textContent = filtered.length + " products found";
    }

    if (emptyState) {
      emptyState.style.display = filtered.length ? "none" : "block";
    }

    productGrid.innerHTML = filtered.map(function (product) {
      const saved = wishlist.includes(product.id);

      return `
        <article class="product-card">
          <div class="product-art">
            <img
              class="product-image"
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="this.style.display='none';this.nextElementSibling.style.display='grid';"
            >
            <div class="product-fallback-icon" style="display:none">
              <i class="fa-solid ${escapeHTML(product.icon)}"></i>
            </div>
            <button
              class="heart-btn ${saved ? "active" : ""}"
              data-wishlist="${escapeHTML(product.id)}"
              aria-label="Add to wishlist"
            >
              <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
            </button>
          </div>

          <div class="product-info">
            <div class="product-meta">
              <span class="store ${product.store.toLowerCase()}">${escapeHTML(product.store)}</span>
              <span>${escapeHTML(product.category)}</span>
            </div>

            <h3>${escapeHTML(product.name)}</h3>

            <div class="product-footer">
              <strong>₹${product.price.toLocaleString("en-IN")}</strong>
              <a
                class="buy-now"
                href="${escapeHTML(getProductLink(product))}"
                target="_blank"
                rel="nofollow sponsored noopener"
              >
                Buy Now <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // =========================================
  // STORE FILTER BUTTONS
  // =========================================

  document.querySelectorAll(".store-filter").forEach(function (button) {
    button.addEventListener("click", function () {
      activeStore = button.dataset.store || "all";

      document.querySelectorAll(".store-filter").forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      renderProducts();
    });
  });

  // =========================================
  // CATEGORY FILTER BUTTONS
  // =========================================

  document.querySelectorAll(".category-card").forEach(function (button) {
    button.addEventListener("click", function () {
      activeCategory = button.dataset.category || "all";

      document.querySelectorAll(".category-card").forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const productsSection = get("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }

      renderProducts();
    });
  });

  // =========================================
  // SEARCH
  // =========================================

  const searchForm = get("searchForm");
  const searchInput = get("searchInput");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
      renderProducts();

      const productsSection = get("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchText = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // =========================================
  // SORT PRODUCTS
  // =========================================

  const sortProducts = get("sortProducts");

  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // =========================================
  // WISHLIST
  // =========================================

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
    updateWishlist();
  }

  function updateWishlist() {
    const count = wishlist.length;

    if (get("wishlistCount")) {
      get("wishlistCount").textContent = count;
    }

    if (get("wishlistHeadingCount")) {
      get("wishlistHeadingCount").textContent = count;
    }

    const savedItems = get("savedItems");
    if (!savedItems) return;

    const savedProducts = products.filter(function (product) {
      return wishlist.includes(product.id);
    });

    if (!savedProducts.length) {
      savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty.</p>';
      return;
    }

    savedItems.innerHTML = savedProducts.map(function (product) {
      return `
        <div class="saved-item">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}">
          <div>
            <strong>${escapeHTML(product.name)}</strong>
            <p>₹${product.price.toLocaleString("en-IN")} · ${escapeHTML(product.store)}</p>
          </div>
          <button class="remove-saved" data-remove="${escapeHTML(product.id)}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `;
    }).join("");
  }

  if (productGrid) {
    productGrid.addEventListener("click", function (event) {
      const button = event.target.closest("[data-wishlist]");
      if (!button) return;

      const id = button.dataset.wishlist;

      if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
      } else {
        wishlist.push(id);
      }

      saveWishlist();
      renderProducts();
    });
  }

  const savedItems = get("savedItems");

  if (savedItems) {
    savedItems.addEventListener("click", function (event) {
      const button = event.target.closest("[data-remove]");
      if (!button) return;

      wishlist = wishlist.filter(function (id) {
        return id !== button.dataset.remove;
      });

      saveWishlist();
      renderProducts();
    });
  }

  const clearWishlist = get("clearWishlist");

  if (clearWishlist) {
    clearWishlist.addEventListener("click", function () {
      wishlist = [];
      saveWishlist();
      renderProducts();
    });
  }

  // =========================================
  // RESET FILTERS
  // =========================================

  const resetFilters = get("resetFilters");

  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      activeStore = "all";
      activeCategory = "all";
      searchText = "";

      if (searchInput) searchInput.value = "";
      if (sortProducts) sortProducts.value = "default";

      document.querySelectorAll(".store-filter").forEach(function (button) {
        button.classList.toggle("active", button.dataset.store === "all");
      });

      document.querySelectorAll(".category-card").forEach(function (button) {
        button.classList.toggle("active", button.dataset.category === "all");
      });

      renderProducts();
    });
  }

  // =========================================
  // MOBILE MENU
  // =========================================

  const mobileMenu = get("mobileMenu");
  const mainNav = get("mainNav");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
  }

  // =========================================
  // FOOTER YEAR
  // =========================================

  if (get("year")) {
    get("year").textContent = new Date().getFullYear();
  }

  // =========================================
  // INITIAL LOAD
  // =========================================

  renderProducts();
  updateWishlist();

});
