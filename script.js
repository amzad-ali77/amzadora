
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
    console.error("AMZADORA: productGrid not found. Check index.html.");
    return;
  }

  // Replace this with your actual Amazon Associates tracking ID.
  const AMAZON_TAG = "YOUR_AMAZON_TAG";

  // Product catalogue
  const products = [
    {id:"p1",name:"Wireless Headphones",category:"electronics",price:1499,store:"Amazon",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",tag:"Popular"},
    {id:"p2",name:"Bluetooth Speaker",category:"electronics",price:999,store:"Flipkart",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"},
    {id:"p3",name:"Smart Watch",category:"electronics",price:1999,store:"Amazon",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",tag:"Trending"},
    {id:"p4",name:"Laptop",category:"electronics",price:45999,store:"Amazon",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"},
    {id:"p5",name:"Wireless Keyboard",category:"electronics",price:799,store:"Flipkart",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"},
    {id:"p6",name:"Bluetooth Earbuds",category:"electronics",price:1299,store:"Amazon",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"},
    {id:"p7",name:"Smartphone",category:"mobiles",price:14999,store:"Flipkart",image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"},
    {id:"p8",name:"Mobile Cover",category:"mobiles",price:299,store:"Amazon",image:"https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=600&q=80"},
    {id:"p9",name:"Men Casual T-Shirt",category:"fashion",price:499,store:"Myntra",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"},
    {id:"p10",name:"Denim Jeans",category:"fashion",price:999,store:"Myntra",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"},
    {id:"p11",name:"Running Shoes",category:"shoes",price:1799,store:"Myntra",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",tag:"Bestseller"},
    {id:"p12",name:"Casual Sneakers",category:"shoes",price:1299,store:"Flipkart",image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"},
    {id:"p13",name:"Skincare Kit",category:"beauty",price:899,store:"Amazon",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80"},
    {id:"p14",name:"Premium Perfume",category:"beauty",price:699,store:"Myntra",image:"https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80"},
    {id:"p15",name:"Home Decor Lamp",category:"home",price:699,store:"Flipkart",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"},
    {id:"p16",name:"Modern Chair",category:"home",price:2499,store:"Amazon",image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80"},
    {id:"p17",name:"Gym Bag",category:"fitness",price:799,store:"Myntra",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"},
    {id:"p18",name:"Yoga Mat",category:"fitness",price:499,store:"Amazon",image:"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=80"}
  ];

  let activeCategory = "all";
  let activeStore = "all";
  let searchTerm = "";

  let wishlist = [];
  try {
    const stored = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
    if (Array.isArray(stored)) wishlist = stored;
  } catch (error) {
    wishlist = [];
  }

  function getAffiliateLink(product) {
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

    return `https://www.myntra.com/${query}`;
  }

  function updateWishlist() {
    const count = wishlist.length;
    if ($("wishlistCount")) $("wishlistCount").textContent = count;
    if ($("wishlistHeadingCount")) $("wishlistHeadingCount").textContent = `(${count})`;

    const saved = products.filter(product => wishlist.includes(product.id));

    if (!savedItems) return;

    if (!saved.length) {
      savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty. Save products you like!</p>';
      return;
    }

    savedItems.innerHTML = saved.map(product => `
      <div class="saved-item">
        <img src="${product.image}" alt="${product.name}">
        <span>${product.name}</span>
        <button class="remove-saved" data-id="${product.id}" aria-label="Remove from wishlist">×</button>
      </div>
    `).join("");
  }

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
    updateWishlist();
  }

  function renderProducts() {
    let filtered = products.filter(product => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const storeMatch = activeStore === "all" || product.store === activeStore;
      const text = `${product.name} ${product.category} ${product.store}`.toLowerCase();
      const searchMatch = text.includes(searchTerm);
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
          <div class="product-fallback-icon" style="display:none"><i class="fa-solid fa-image"></i></div>
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <button class="heart-btn ${saved ? "active" : ""}" data-id="${product.id}" aria-label="Toggle wishlist">
            <i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>
        <div class="product-info">
          <div class="product-meta"><span class="store">${product.store}</span><span>${product.category}</span></div>
          <h3>${product.name}</h3>
          <div class="product-footer">
            <strong>₹${product.price.toLocaleString("en-IN")}</strong>
            <a class="buy-now" href="${getAffiliateLink(product)}" target="_blank" rel="noopener noreferrer">
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

  // Category buttons
  document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "all";

      document.querySelectorAll(".category-card").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      renderProducts();
      $("products").scrollIntoView({behavior:"smooth"});
    });
  });

  // Store filters
  document.querySelectorAll(".store-filter").forEach(button => {
    button.addEventListener("click", () => {
      activeStore = button.dataset.store || "all";

      document.querySelectorAll(".store-filter").forEach(item => {
        item.classList.toggle("active", item === button);
      });

      renderProducts();
    });
  });

  // Search
  if ($("searchForm")) {
    $("searchForm").addEventListener("submit", event => {
      event.preventDefault();
      searchTerm = searchInput.value.trim().toLowerCase();
      renderProducts();
      $("products").scrollIntoView({behavior:"smooth"});
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Sorting
  if (sortProducts) sortProducts.addEventListener("change", renderProducts);

  // Wishlist on product cards
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

  // Remove saved item
  if (savedItems) {
    savedItems.addEventListener("click", event => {
      const button = event.target.closest(".remove-saved");
      if (!button) return;

      wishlist = wishlist.filter(id => id !== button.dataset.id);
      saveWishlist();
      renderProducts();
    });
  }

  // Clear wishlist
  if ($("clearWishlist")) {
    $("clearWishlist").addEventListener("click", () => {
      wishlist = [];
      saveWishlist();
      renderProducts();
    });
  }

  // Reset filters
  if ($("resetFilters")) {
    $("resetFilters").addEventListener("click", () => {
      activeCategory = "all";
      activeStore = "all";
      searchTerm = "";

      if (searchInput) searchInput.value = "";
      if (sortProducts) sortProducts.value = "default";

      document.querySelectorAll(".category-card").forEach(button => {
        button.classList.toggle("active", button.dataset.category === "all");
      });

      document.querySelectorAll(".store-filter").forEach(button => {
        button.classList.toggle("active", button.dataset.store === "all");
      });

      renderProducts();
    });
  }

  // Mobile navigation
  const mobileMenu = $("mobileMenu");
  const mainNav = $("mainNav");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // Close mobile menu after navigation
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => mainNav?.classList.remove("open"));
  });

  // Footer year
  if ($("year")) $("year").textContent = new Date().getFullYear();

  // Initial page render
  updateWishlist();
  renderProducts();

  console.log(`AMZADORA loaded: ${products.length} products`);
});
