
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const $ = id => document.getElementById(id);

  const productGrid = $("productGrid");
  const resultsCount = $("resultsCount");
  const searchInput = $("searchInput");
  const sortProducts = $("sortProducts");
  const emptyState = $("emptyState");
  const savedItems = $("savedItems");

  if (!productGrid) {
    console.error("Product grid not found!");
    return;
  }

  // APNA AMAZON ASSOCIATES TAG YAHAN DALO
  const AMAZON_TAG = "YOUR_AMAZON_TAG";

  // PRODUCT DATABASE
  const products = [
    // AMAZON PRODUCTS
    {id:"a1",name:"Wireless Headphones",category:"electronics",price:1499,store:"Amazon",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=85",tag:"Popular"},
    {id:"a2",name:"Bluetooth Speaker",category:"electronics",price:999,store:"Amazon",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=85"},
    {id:"a3",name:"Smart Watch",category:"electronics",price:1999,store:"Amazon",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85",tag:"Trending"},
    {id:"a4",name:"Power Bank",category:"electronics",price:899,store:"Amazon",image:"https://images.unsplash.com/photo-1609592424848-0a4d7f2b8a7b?auto=format&fit=crop&w=600&q=85"},
    {id:"a5",name:"Laptop",category:"electronics",price:45999,store:"Amazon",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=85"},
    {id:"a6",name:"Computer Monitor",category:"electronics",price:8999,store:"Amazon",image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=85"},
    {id:"a7",name:"Wireless Keyboard",category:"electronics",price:799,store:"Amazon",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=85"},
    {id:"a8",name:"Computer Mouse",category:"electronics",price:399,store:"Amazon",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=85"},
    {id:"a9",name:"Bluetooth Earbuds",category:"electronics",price:1299,store:"Amazon",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=85"},
    {id:"a10",name:"Digital Camera",category:"electronics",price:24999,store:"Amazon",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=85"},
    {id:"a11",name:"Smartphone",category:"mobiles",price:14999,store:"Amazon",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=85"},
    {id:"a12",name:"Mobile Back Cover",category:"mobiles",price:299,store:"Amazon",image:"https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=600&q=85"},
    {id:"a13",name:"Skincare Kit",category:"beauty",price:899,store:"Amazon",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=85"},
    {id:"a14",name:"Home Decor Lamp",category:"home",price:699,store:"Amazon",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=85"},
    {id:"a15",name:"Yoga Mat",category:"fitness",price:499,store:"Amazon",image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=85"},

    // FLIPKART PRODUCTS
    {id:"f1",name:"Bluetooth Soundbar",category:"electronics",price:2499,store:"Flipkart",image:"https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=85"},
    {id:"f2",name:"Gaming Mouse",category:"electronics",price:999,store:"Flipkart",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=85"},
    {id:"f3",name:"Smart LED TV",category:"electronics",price:18999,store:"Flipkart",image:"https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=85"},
    {id:"f4",name:"Wireless Earphones",category:"electronics",price:1199,store:"Flipkart",image:"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=85"},
    {id:"f5",name:"Mobile Phone",category:"mobiles",price:12999,store:"Flipkart",image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=85"},
    {id:"f6",name:"Men Casual T-Shirt",category:"fashion",price:499,store:"Flipkart",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=85"},
    {id:"f7",name:"Home Bedsheet",category:"home",price:599,store:"Flipkart",image:"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=85"},
    {id:"f8",name:"Water Bottle",category:"home",price:399,store:"Flipkart",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=85"},

    // MYNTRA PRODUCTS
    {id:"m1",name:"Running Shoes",category:"shoes",price:1799,store:"Myntra",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85",tag:"Bestseller"},
    {id:"m2",name:"Casual Sneakers",category:"shoes",price:1299,store:"Myntra",image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=85"},
    {id:"m3",name:"Men Denim Jeans",category:"fashion",price:999,store:"Myntra",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=85"},
    {id:"m4",name:"Stylish Jacket",category:"fashion",price:1499,store:"Myntra",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=85"},
    {id:"m5",name:"Premium Perfume",category:"beauty",price:699,store:"Myntra",image:"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=85"},
    {id:"m6",name:"Ladies Handbag",category:"fashion",price:1199,store:"Myntra",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85"},
    {id:"m7",name:"Sports Gym Bag",category:"fitness",price:799,store:"Myntra",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=85"}
  ];

  let activeCategory = "all";
  let activeStore = "all";
  let searchTerm = "";

  // LOAD WISHLIST
  let wishlist = [];

  try {
    const data = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
    if (Array.isArray(data)) wishlist = data;
  } catch (error) {
    wishlist = [];
  }

  // PRODUCT LINK
  function getProductLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      const tag = AMAZON_TAG !== "YOUR_AMAZON_TAG"
        ? `&tag=${encodeURIComponent(AMAZON_TAG)}`
        : "";

      return `https://www.amazon.in/s?k=${query}${tag}`;
    }

    if (product.store === "Flipkart") {
      return `https://www.flipkart.com/search?q=${query}`;
    }

    return `https://www.myntra.com/search?q=${query}`;
  }

  // WISHLIST UPDATE
  function updateWishlist() {
    const saved = products.filter(p => wishlist.includes(p.id));

    if ($("wishlistCount")) $("wishlistCount").textContent = saved.length;
    if ($("wishlistHeadingCount")) $("wishlistHeadingCount").textContent = `(${saved.length})`;

    if (!savedItems) return;

    if (!saved.length) {
      savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty. Save products you like!</p>';
      return;
    }

    savedItems.innerHTML = saved.map(p => `
      <div class="saved-item">
        <img src="${p.image}" alt="${p.name}">
        <span>${p.name}</span>
        <button class="remove-saved" data-id="${p.id}" aria-label="Remove">×</button>
      </div>
    `).join("");
  }

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
    updateWishlist();
  }

  // RENDER PRODUCTS
  function renderProducts() {
    let filtered = products.filter(product => {
      const categoryMatch =
        activeCategory === "all" || product.category === activeCategory;

      const storeMatch =
        activeStore === "all" || product.store === activeStore;

      const searchMatch =
        `${product.name} ${product.category} ${product.store}`
          .toLowerCase().includes(searchTerm);

      return categoryMatch && storeMatch && searchMatch;
    });

    const sort = sortProducts ? sortProducts.value : "default";

    if (sort === "low") filtered.sort((a,b) => a.price - b.price);
    if (sort === "high") filtered.sort((a,b) => b.price - a.price);
    if (sort === "name") filtered.sort((a,b) => a.name.localeCompare(b.name));

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} products found`;
    }

    productGrid.innerHTML = "";

    if (!filtered.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    filtered.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";

      const saved = wishlist.includes(product.id);

      card.innerHTML = `
        <div class="product-art">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-fallback-icon" style="display:none">
            <i class="fa-solid fa-image"></i>
          </div>
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <button class="heart-btn ${saved ? "active" : ""}" data-id="${product.id}" aria-label="Wishlist">
            <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <div class="product-meta">
            <span class="store">${product.store}</span>
            <span>${product.category}</span>
          </div>
          <h3>${product.name}</h3>
          <div class="product-footer">
            <strong>₹${product.price.toLocaleString("en-IN")}</strong>
            <a class="buy-now" href="${getProductLink(product)}" target="_blank" rel="noopener noreferrer">
              View Deal <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      `;

      const img = card.querySelector(".product-image");

      img.addEventListener("error", () => {
        img.style.display = "none";
        card.querySelector(".product-fallback-icon").style.display = "flex";
      });

      productGrid.appendChild(card);
    });
  }

  // CATEGORY FILTER
  document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "all";

      document.querySelectorAll(".category-card").forEach(btn => {
        btn.classList.toggle("active", btn === button);
      });

      renderProducts();
      $("products").scrollIntoView({behavior:"smooth"});
    });
  });

  // STORE FILTER
  document.querySelectorAll(".store-filter").forEach(button => {
    button.addEventListener("click", () => {
      activeStore = button.dataset.store || "all";

      document.querySelectorAll(".store-filter").forEach(btn => {
        btn.classList.toggle("active", btn === button);
      });

      renderProducts();
    });
  });

  // SEARCH
  if ($("searchForm")) {
    $("searchForm").addEventListener("submit", event => {
      event.preventDefault();
      searchTerm = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // SORT
  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // ADD / REMOVE WISHLIST
  productGrid.addEventListener("click", event => {
    const button = event.target.closest(".heart-btn");
    if (!button) return;

    const id = button.dataset.id;

    wishlist = wishlist.includes(id)
      ? wishlist.filter(item => item !== id)
      : [...wishlist, id];

    saveWishlist();
    renderProducts();
  });

  // REMOVE WISHLIST ITEM
  if (savedItems) {
    savedItems.addEventListener("click", event => {
      const button = event.target.closest(".remove-saved");
      if (!button) return;

      wishlist = wishlist.filter(id => id !== button.dataset.id);
      saveWishlist();
      renderProducts();
    });
  }

  // CLEAR WISHLIST
  if ($("clearWishlist")) {
    $("clearWishlist").addEventListener("click", () => {
      wishlist = [];
      saveWishlist();
      renderProducts();
    });
  }

  // RESET FILTERS
  if ($("resetFilters")) {
    $("resetFilters").addEventListener("click", () => {
      activeCategory = "all";
      activeStore = "all";
      searchTerm = "";

      if (searchInput) searchInput.value = "";
      if (sortProducts) sortProducts.value = "default";

      document.querySelectorAll(".category-card").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === "all");
      });

      document.querySelectorAll(".store-filter").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.store === "all");
      });

      renderProducts();
    });
  }

  // MOBILE MENU
  if ($("mobileMenu") && $("mainNav")) {
    $("mobileMenu").addEventListener("click", () => {
      $("mainNav").classList.toggle("open");
    });
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      $("mainNav")?.classList.remove("open");
    });
  });

  // FOOTER YEAR
  if ($("year")) $("year").textContent = new Date().getFullYear();

  // INITIAL LOAD
  updateWishlist();
  renderProducts();

  console.log("AMZADORA loaded successfully:", products.length, "products");
});
