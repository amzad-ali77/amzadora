
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ==============================
  // AMZADORA - MAIN JAVASCRIPT
  // ==============================

  const $ = (id) => document.getElementById(id);

  const productGrid = $("productGrid");
  const resultsCount = $("resultsCount");
  const searchInput = $("searchInput");
  const sortProducts = $("sortProducts");
  const wishlistCount = $("wishlistCount");
  const savedItems = $("savedItems");

  if (!productGrid) {
    console.error("productGrid element HTML me nahi mila.");
    return;
  }

  // AMAZON AFFILIATE TAG
  const AMAZON_TAG = "amzadmart07-21";

  // PRODUCT DATA
  const products = [
    {id:"headphones",name:"Wireless Headphones",category:"electronics",price:1499,store:"Amazon",icon:"fa-headphones",image:"https://placehold.co/500x400?text=Headphones",tag:"Popular"},
    {id:"speaker",name:"Bluetooth Speakers",category:"electronics",price:999,store:"Flipkart",icon:"fa-volume-high",image:"https://placehold.co/500x400?text=Bluetooth+Speaker"},
    {id:"watch",name:"Smart Watch",category:"electronics",price:1999,store:"Amazon",icon:"fa-clock",image:"https://placehold.co/500x400?text=Smart+Watch",tag:"Trending"},
    {id:"powerbank",name:"Power Bank",category:"electronics",price:899,store:"Flipkart",icon:"fa-battery-full",image:"https://placehold.co/500x400?text=Power+Bank"},
    {id:"laptop",name:"Laptop",category:"electronics",price:45999,store:"Amazon",icon:"fa-laptop",image:"https://placehold.co/500x400?text=Laptop"},
    {id:"monitor",name:"Computer Monitor",category:"electronics",price:8999,store:"Flipkart",icon:"fa-desktop",image:"https://placehold.co/500x400?text=Monitor"},
    {id:"keyboard",name:"Wireless Keyboard",category:"electronics",price:799,store:"Amazon",icon:"fa-keyboard",image:"https://placehold.co/500x400?text=Keyboard"},
    {id:"mouse",name:"Computer Mouse",category:"electronics",price:399,store:"Flipkart",icon:"fa-computer-mouse",image:"https://placehold.co/500x400?text=Mouse"},
    {id:"earbuds",name:"Bluetooth Earbuds",category:"electronics",price:1299,store:"Amazon",icon:"fa-ear-listen",image:"https://placehold.co/500x400?text=Earbuds"},
    {id:"camera",name:"Digital Camera",category:"electronics",price:24999,store:"Amazon",icon:"fa-camera",image:"https://placehold.co/500x400?text=Camera"},

    {id:"mobile",name:"Smartphone",category:"mobiles",price:14999,store:"Flipkart",icon:"fa-mobile-screen",image:"https://placehold.co/500x400?text=Smartphone"},
    {id:"cover",name:"Mobile Back Cover",category:"mobiles",price:299,store:"Amazon",icon:"fa-mobile",image:"https://placehold.co/500x400?text=Phone+Cover"},

    {id:"tshirt",name:"Men Casual T-Shirt",category:"fashion",price:499,store:"Myntra",icon:"fa-shirt",image:"https://placehold.co/500x400?text=T-Shirt"},
    {id:"jeans",name:"Men Denim Jeans",category:"fashion",price:999,store:"Myntra",icon:"fa-person",image:"https://placehold.co/500x400?text=Jeans"},
    {id:"jacket",name:"Stylish Jacket",category:"fashion",price:1499,store:"Flipkart",icon:"fa-shirt",image:"https://placehold.co/500x400?text=Jacket"},

    {id:"shoes",name:"Running Shoes",category:"shoes",price:1799,store:"Myntra",icon:"fa-shoe-prints",image:"https://placehold.co/500x400?text=Running+Shoes"},
    {id:"sneakers",name:"Casual Sneakers",category:"shoes",price:1299,store:"Flipkart",icon:"fa-shoe-prints",image:"https://placehold.co/500x400?text=Sneakers"},

    {id:"skincare",name:"Skincare Kit",category:"beauty",price:899,store:"Amazon",icon:"fa-spa",image:"https://placehold.co/500x400?text=Skincare"},
    {id:"perfume",name:"Premium Perfume",category:"beauty",price:699,store:"Myntra",icon:"fa-spray-can-sparkles",image:"https://placehold.co/500x400?text=Perfume"},

    {id:"lamp",name:"Home Decor Lamp",category:"home",price:699,store:"Flipkart",icon:"fa-lightbulb",image:"https://placehold.co/500x400?text=Decor+Lamp"},
    {id:"bedsheet",name:"Bedsheet Set",category:"home",price:599,store:"Amazon",icon:"fa-bed",image:"https://placehold.co/500x400?text=Bedsheet"},

    {id:"cookware",name:"Non Stick Cookware",category:"kitchen",price:1199,store:"Amazon",icon:"fa-utensils",image:"https://placehold.co/500x400?text=Cookware"},
    {id:"bottle",name:"Water Bottle",category:"kitchen",price:399,store:"Flipkart",icon:"fa-bottle-water",image:"https://placehold.co/500x400?text=Bottle"},

    {id:"gymbag",name:"Sports Gym Bag",category:"fitness",price:799,store:"Myntra",icon:"fa-dumbbell",image:"https://placehold.co/500x400?text=Gym+Bag"},
    {id:"yogamat",name:"Yoga Mat",category:"fitness",price:499,store:"Amazon",icon:"fa-person",image:"https://placehold.co/500x400?text=Yoga+Mat"},

    {id:"gamingmouse",name:"Gaming Mouse",category:"gaming",price:999,store:"Amazon",icon:"fa-computer-mouse",image:"https://placehold.co/500x400?text=Gaming+Mouse"},
    {id:"controller",name:"Gaming Controller",category:"gaming",price:1499,store:"Flipkart",icon:"fa-gamepad",image:"https://placehold.co/500x400?text=Controller"},

    {id:"book",name:"Self Improvement Book",category:"books",price:299,store:"Amazon",icon:"fa-book",image:"https://placehold.co/500x400?text=Book"}
  ];

  // LOAD WISHLIST
  let wishlist = [];
  try {
    wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
    if (!Array.isArray(wishlist)) wishlist = [];
  } catch (error) {
    wishlist = [];
  }

  let activeCategory = "all";
  let searchTerm = "";

  function saveWishlist() {
    localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
    updateWishlist();
  }

  function updateWishlist() {
    if (wishlistCount) wishlistCount.textContent = wishlist.length;

    if (savedItems) {
      const savedProducts = products.filter(p => wishlist.includes(p.id));

      savedItems.innerHTML = savedProducts.length
        ? savedProducts.map(p => `
          <div class="saved-item">
            <img src="${p.image}" alt="${p.name}">
            <span>${p.name}</span>
            <button class="remove-saved" data-id="${p.id}" aria-label="Remove ${p.name}">×</button>
          </div>
        `).join("")
        : "<p>No saved products yet.</p>";
    }
  }

  // AFFILIATE LINK
  function getProductLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return `https://www.amazon.in/s?k=${query}&tag=${AMAZON_TAG}`;
    }

    if (product.store === "Flipkart") {
      return `https://www.flipkart.com/search?q=${query}`;
    }

    return `https://www.myntra.com/${query}`;
  }

  // RENDER PRODUCTS
  function renderProducts() {
    let filtered = products.filter(product => {
      const categoryMatch =
        activeCategory === "all" || product.category === activeCategory;

      const searchMatch =
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.store.toLowerCase().includes(searchTerm);

      return categoryMatch && searchMatch;
    });

    if (sortProducts && sortProducts.value === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortProducts && sortProducts.value === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortProducts && sortProducts.value === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} products found`;
    }

    productGrid.innerHTML = "";

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-box-open"></i>
          <h3>No products found</h3>
          <p>Try another search or category.</p>
        </div>`;
      return;
    }

    filtered.forEach(product => {
      const isSaved = wishlist.includes(product.id);

      const card = document.createElement("article");
      card.className = "product-card";

      card.innerHTML = `
        <div class="product-art">
          <img class="product-image"
               src="${product.image}"
               alt="${product.name}"
               loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">

          <div class="product-fallback-icon" style="display:none;">
            <i class="fa-solid ${product.icon}"></i>
          </div>

          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}

          <button class="heart-btn ${isSaved ? "active" : ""}"
                  data-id="${product.id}"
                  aria-label="Add ${product.name} to wishlist">
            <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-heart"></i>
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
            <a class="buy-now"
               href="${getProductLink(product)}"
               target="_blank"
               rel="noopener noreferrer">
              View Deal <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });
  }

  // CATEGORY FILTER
  document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", function () {
      document.querySelectorAll(".category").forEach(btn => {
        btn.classList.remove("active");
      });

      this.classList.add("active");
      activeCategory = this.dataset.category || "all";
      renderProducts();
    });
  });

  // SEARCH
  const searchForm = $("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
      renderProducts();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = this.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // SORT
  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // WISHLIST BUTTONS
  productGrid.addEventListener("click", function (event) {
    const button = event.target.closest(".heart-btn");
    if (!button) return;

    const id = button.dataset.id;

    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
    } else {
      wishlist.push(id);
    }

    saveWishlist();
    renderProducts();
  });

  // REMOVE SAVED ITEM
  if (savedItems) {
    savedItems.addEventListener("click", function (event) {
      const button = event.target.closest(".remove-saved");
      if (!button) return;

      wishlist = wishlist.filter(id => id !== button.dataset.id);
      saveWishlist();
      renderProducts();
    });
  }

  // CLEAR WISHLIST
  const clearWishlist = $("clearWishlist");

  if (clearWishlist) {
    clearWishlist.addEventListener("click", function () {
      wishlist = [];
      saveWishlist();
      renderProducts();
    });
  }

  // RESET FILTERS
  const resetFilters = $("resetFilters");

  if (resetFilters) {
    resetFilters.addEventListener("click", function () {
      activeCategory = "all";
      searchTerm = "";

      if (searchInput) searchInput.value = "";

      document.querySelectorAll(".category").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === "all");
      });

      renderProducts();
    });
  }

  // MOBILE MENU
  const mobileMenu = $("mobileMenu");
  const mainNav = $("mainNav");

  if (mobileMenu && mainNav) {
    mobileMenu.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // YEAR
  if ($("year")) {
    $("year").textContent = new Date().getFullYear();
  }

  // INITIAL LOAD
  updateWishlist();
  renderProducts();

  console.log("AMZADORA: Products loaded successfully!");
});
