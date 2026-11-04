
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =====================================
  // AMZADORA SETTINGS
  // =====================================

  const AMAZON_TAG = "amzadmart07-21";
  const get = id => document.getElementById(id);

  const productGrid = get("productGrid");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");
  const searchInput = get("searchInput");
  const sortProducts = get("sortProducts");

  if (!productGrid) {
    console.error("AMZADORA: productGrid element not found.");
    return;
  }

  let activeStore = "all";
  let activeCategory = "all";
  let searchTerm = "";

  // =====================================
  // PRODUCT CATALOG
  // =====================================

  const catalog = [
    // ELECTRONICS
    ["1","Wireless Headphones","electronics",1499],
    ["2","Bluetooth Speakers","electronics",999],
    ["3","Smart Watches","electronics",1799],
    ["4","Power Banks","electronics",899],
    ["5","Laptops","electronics",42999],
    ["6","Computer Monitors","electronics",8999],
    ["7","Wireless Keyboards","electronics",799],
    ["8","Computer Mouse","electronics",399],
    ["9","Bluetooth Earbuds","electronics",1199],
    ["10","Digital Cameras","electronics",24999],

    // MOBILES
    ["11","Smartphones","mobiles",12999],
    ["12","Mobile Covers","mobiles",299],
    ["13","Screen Protectors","mobiles",149],
    ["14","Mobile Chargers","mobiles",499],
    ["15","Mobile Tripods","mobiles",699],

    // FASHION
    ["16","Men's T-Shirts","fashion",499],
    ["17","Men's Shirts","fashion",799],
    ["18","Women's Kurtas","fashion",899],
    ["19","Jeans","fashion",1199],
    ["20","Backpacks","fashion",999],

    // SHOES
    ["21","Running Shoes","shoes",1499],
    ["22","Sneakers","shoes",1299],
    ["23","Formal Shoes","shoes",1799],
    ["24","Sandals & Slippers","shoes",499],

    // BEAUTY
    ["25","Face Wash","beauty",199],
    ["26","Moisturizers","beauty",299],
    ["27","Sunscreen","beauty",349],
    ["28","Hair Care","beauty",399],
    ["29","Perfumes","beauty",599],

    // HOME
    ["30","Table Lamps","home",699],
    ["31","Bedsheets","home",799],
    ["32","Curtains","home",599],
    ["33","Storage Organizers","home",499],
    ["34","Wall Decor","home",399],

    // KITCHEN
    ["35","Mixer Grinders","kitchen",1999],
    ["36","Air Fryers","kitchen",3999],
    ["37","Cookware Sets","kitchen",1499],
    ["38","Water Bottles","kitchen",299],
    ["39","Coffee Makers","kitchen",2499],

    // FITNESS
    ["40","Dumbbells","fitness",799],
    ["41","Yoga Mats","fitness",499],
    ["42","Resistance Bands","fitness",299],
    ["43","Gym Bags","fitness",699],
    ["44","Exercise Cycles","fitness",8999],

    // GAMING
    ["45","Gaming Mouse","gaming",999],
    ["46","Gaming Headsets","gaming",1499],
    ["47","Game Controllers","gaming",1299],
    ["48","Gaming Chairs","gaming",5999],

    // BOOKS
    ["49","Self-Help Books","books",299],
    ["50","Programming Books","books",499],
    ["51","Competitive Exam Books","books",399]
  ];

  // =====================================
  // EXTRA MYNTRA PRODUCTS
  // =====================================

  const myntraExtra = [
    ["52","Women's Dresses","fashion",999],
    ["53","Men's Casual Wear","fashion",899],
    ["54","Women's Handbags","fashion",1199],
    ["55","Ethnic Wear","fashion",1299],
    ["56","Sports Shoes","shoes",1499],
    ["57","Beauty Makeup Kits","beauty",799]
  ];

  // =====================================
  // PRODUCT IMAGE SYSTEM
  // =====================================

  function getProductImage(item) {
    const id = item[0];
    const name = item[1];

    // Product name based image search.
    // Each product gets a different image request.
    return "https://loremflickr.com/600/600/" +
      encodeURIComponent(name.replace(/&/g, " ")) +
      "?lock=" + id;
  }

  // =====================================
  // CREATE STORE PRODUCTS
  // =====================================

  function makeProduct(item, store) {
    return {
      id: store + "-" + item[0],
      catalogId: item[0],
      name: item[1],
      category: item[2],
      price: item[3],
      image: getProductImage(item),
      store: store
    };
  }

  const products = [];

  // Amazon: 35 products
  catalog.slice(0, 35).forEach(item => {
    products.push(makeProduct(item, "Amazon"));
  });

  // Flipkart: 35 products
  catalog.slice(16, 51).forEach(item => {
    products.push(makeProduct(item, "Flipkart"));
  });

  // Myntra: 14 products
  catalog.slice(15, 29).forEach(item => {
    products.push(makeProduct(item, "Myntra"));
  });

  // Myntra: 6 extra products
  myntraExtra.forEach(item => {
    products.push(makeProduct(item, "Myntra"));
  });

  console.log("AMZADORA loaded:", products.length, "products");

  // =====================================
  // STORE LINKS
  // =====================================

  function storeLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return "https://www.amazon.in/s?k=" +
        query + "&tag=" + AMAZON_TAG;
    }

    if (product.store === "Flipkart") {
      return "https://www.flipkart.com/search?q=" + query;
    }

    return "https://www.myntra.com/search?q=" + query;
  }

  // =====================================
  // WISHLIST STORAGE
  // =====================================

  let wishlist = [];

  try {
    const storedWishlist = JSON.parse(
      localStorage.getItem("amzadWishlist") || "[]"
    );

    if (Array.isArray(storedWishlist)) {
      wishlist = storedWishlist;
    }
  } catch (error) {
    wishlist = [];
  }

  function saveWishlist() {
    try {
      localStorage.setItem(
        "amzadWishlist",
        JSON.stringify(wishlist)
      );
    } catch (error) {
      console.error("Wishlist storage error:", error);
    }

    updateWishlist();
  }

  function updateWishlist() {
    const count = wishlist.length;

    if (get("wishlistCount")) {
      get("wishlistCount").textContent = count;
    }

    if (get("wishlistHeadingCount")) {
      get("wishlistHeadingCount").textContent = "(" + count + ")";
    }

    const savedItems = get("savedItems");

    if (!savedItems) return;

    if (wishlist.length === 0) {
      savedItems.innerHTML =
        '<p class="wishlist-empty">Your wishlist is empty. Save products you like!</p>';
      return;
    }

    savedItems.innerHTML = wishlist.map(item => `
      <div class="saved-item">
        <img
          src="${item.image}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Product';"
        >

        <span>${item.name}</span>

        <button
          class="remove-saved"
          type="button"
          data-remove-wishlist="${item.id}"
          aria-label="Remove ${item.name}"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join("");
  }

  // =====================================
  // PRODUCT CARD
  // =====================================

  function productCard(p) {
    const saved = wishlist.some(
      item => String(item.id) === String(p.id)
    );

    return `
      <div class="product-card">

        <div class="product-art">

          <img
            class="product-image"
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://placehold.co/600x600?text=Product+Photo';"
          >

          <span class="product-tag">${p.store}</span>

          <button
            class="heart-btn ${saved ? "active" : ""}"
            type="button"
            data-wishlist="${p.id}"
            aria-label="Add ${p.name} to wishlist"
          >
            <i class="${saved ? "fas" : "far"} fa-heart"></i>
          </button>

        </div>

        <div class="product-info">

          <div class="product-meta">
            <span>${p.category}</span>
            <span class="store">${p.store}</span>
          </div>

          <h3>${p.name}</h3>

          <div class="product-footer">

            <strong>
              Approx. ₹${Number(p.price).toLocaleString("en-IN")}
            </strong>

            <a
              class="buy-now"
              href="${storeLink(p)}"
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
            >
              Buy on ${p.store}
            </a>

          </div>

        </div>
      </div>
    `;
  }

  // =====================================
  // FILTER + SEARCH + SORT
  // =====================================

  function getFilteredProducts() {
    let filtered = [...products];

    if (activeStore !== "all") {
      filtered = filtered.filter(
        p => p.store.toLowerCase() === activeStore.toLowerCase()
      );
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        p => p.category === activeCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(searchTerm)
      );
    }

    const sort = sortProducts
      ? sortProducts.value
      : "default";

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  // =====================================
  // RENDER PRODUCTS
  // =====================================

  function renderProducts() {
    const filtered = getFilteredProducts();

    productGrid.innerHTML = filtered
      .map(productCard)
      .join("");

    if (resultsCount) {
      resultsCount.textContent =
        filtered.length + " Products Found";
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

  const searchForm = get("searchForm");

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();

      searchTerm = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

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
  // SORT
  // =====================================

  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // =====================================
  // WISHLIST ADD / REMOVE
  // =====================================

  productGrid.addEventListener("click", function (event) {
    const button = event.target.closest("[data-wishlist]");

    if (!button) return;

    const id = button.dataset.wishlist;

    const index = wishlist.findIndex(
      item => String(item.id) === String(id)
    );

    if (index >= 0) {
      wishlist.splice(index, 1);
    } else {
      const product = products.find(
        item => String(item.id) === String(id)
      );

      if (product) {
        wishlist.push(product);
      }
    }

    saveWishlist();
    renderProducts();
  });

  // =====================================
  // REMOVE ITEM FROM WISHLIST
  // =====================================

  const savedItems = get("savedItems");

  if (savedItems) {
    savedItems.addEventListener("click", function (event) {
      const button = event.target.closest("[data-remove-wishlist]");

      if (!button) return;

      const id = button.dataset.removeWishlist;

      wishlist = wishlist.filter(
        item => String(item.id) !== String(id)
      );

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
        item.classList.toggle(
          "active",
          item.dataset.store === "all"
        );
      });

      document.querySelectorAll(".category-card").forEach(item => {
        item.classList.toggle(
          "active",
          item.dataset.category === "all"
        );
      });

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
      mainNav.classList.toggle("open");
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
  // START WEBSITE
  // =====================================

  updateWishlist();
  renderProducts();

});
