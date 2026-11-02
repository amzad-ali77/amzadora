
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =====================================
  // AMZADORA - CATEGORY BASED PRODUCTS
  // =====================================

  const AMAZON_TAG = "amzadmart07-21";

  const get = id => document.getElementById(id);

  const productGrid = get("productGrid");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");
  const searchInput = get("searchInput");
  const sortProducts = get("sortProducts");

  let activeStore = "all";
  let activeCategory = "all";
  let searchTerm = "";

  // =====================================
  // ONLY YOUR 10 CATEGORIES
  // =====================================

  const catalog = [
    // ELECTRONICS
    ["1","Wireless Headphones","electronics",1499,"wireless,headphones"],
    ["2","Bluetooth Speakers","electronics",999,"bluetooth,speaker"],
    ["3","Smart Watches","electronics",1799,"smartwatch"],
    ["4","Power Banks","electronics",899,"powerbank"],
    ["5","Laptops","electronics",42999,"laptop,computer"],
    ["6","Computer Monitors","electronics",8999,"computer,monitor"],
    ["7","Wireless Keyboards","electronics",799,"wireless,keyboard"],
    ["8","Computer Mouse","electronics",399,"computer,mouse"],
    ["9","Bluetooth Earbuds","electronics",1199,"earbuds"],
    ["10","Digital Cameras","electronics",24999,"digital,camera"],

    // MOBILES
    ["11","Smartphones","mobiles",12999,"smartphone"],
    ["12","Mobile Covers","mobiles",299,"mobile,phone,case"],
    ["13","Screen Protectors","mobiles",149,"phone,screen,protector"],
    ["14","Mobile Chargers","mobiles",499,"phone,charger"],
    ["15","Mobile Tripods","mobiles",699,"mobile,tripod"],

    // FASHION
    ["16","Men's T-Shirts","fashion",499,"mens,tshirt"],
    ["17","Men's Shirts","fashion",799,"mens,shirt"],
    ["18","Women's Kurtas","fashion",899,"womens,kurta"],
    ["19","Jeans","fashion",1199,"denim,jeans"],
    ["20","Backpacks","fashion",999,"backpack,bag"],

    // SHOES
    ["21","Running Shoes","shoes",1499,"running,shoes"],
    ["22","Sneakers","shoes",1299,"sneakers"],
    ["23","Formal Shoes","shoes",1799,"formal,shoes"],
    ["24","Sandals & Slippers","shoes",499,"sandals,slippers"],

    // BEAUTY
    ["25","Face Wash","beauty",199,"face,wash,skincare"],
    ["26","Moisturizers","beauty",299,"moisturizer,skincare"],
    ["27","Sunscreen","beauty",349,"sunscreen,skincare"],
    ["28","Hair Care","beauty",399,"hair,care,products"],
    ["29","Perfumes","beauty",599,"perfume,bottle"],

    // HOME
    ["30","Table Lamps","home",699,"table,lamp"],
    ["31","Bedsheets","home",799,"bedsheet,bed"],
    ["32","Curtains","home",599,"curtains,window"],
    ["33","Storage Organizers","home",499,"storage,organizer"],
    ["34","Wall Decor","home",399,"wall,decor"],

    // KITCHEN
    ["35","Mixer Grinders","kitchen",1999,"mixer,grinder"],
    ["36","Air Fryers","kitchen",3999,"air,fryer"],
    ["37","Cookware Sets","kitchen",1499,"cookware,kitchen"],
    ["38","Water Bottles","kitchen",299,"water,bottle"],
    ["39","Coffee Makers","kitchen",2499,"coffee,maker"],

    // FITNESS
    ["40","Dumbbells","fitness",799,"dumbbells,fitness"],
    ["41","Yoga Mats","fitness",499,"yoga,mat"],
    ["42","Resistance Bands","fitness",299,"resistance,bands"],
    ["43","Gym Bags","fitness",699,"gym,bag"],
    ["44","Exercise Cycles","fitness",8999,"exercise,bike"],

    // GAMING
    ["45","Gaming Mouse","gaming",999,"gaming,mouse"],
    ["46","Gaming Headsets","gaming",1499,"gaming,headset"],
    ["47","Game Controllers","gaming",1299,"game,controller"],
    ["48","Gaming Chairs","gaming",5999,"gaming,chair"],

    // BOOKS
    ["49","Self-Help Books","books",299,"self,help,books"],
    ["50","Programming Books","books",499,"programming,books"],
    ["51","Competitive Exam Books","books",399,"competitive,exam,books"]
  ];

  // =====================================
  // EXTRA MYNTRA PRODUCTS
  // =====================================

  const myntraExtra = [
    ["52","Women's Dresses","fashion",999,"womens,dress"],
    ["53","Men's Casual Wear","fashion",899,"mens,casual,wear"],
    ["54","Women's Handbags","fashion",1199,"womens,handbag"],
    ["55","Ethnic Wear","fashion",1299,"ethnic,wear"],
    ["56","Sports Shoes","shoes",1499,"sports,shoes"],
    ["57","Beauty Makeup Kits","beauty",799,"makeup,beauty"]
  ];

  // =====================================
  // CREATE STORE PRODUCTS
  // 35 AMAZON + 35 FLIPKART + 20 MYNTRA
  // =====================================

  function makeProduct(item, store, id) {
    return {
      id: store + "-" + id,
      name: item[1],
      category: item[2],
      price: item[3],
      image: "https://loremflickr.com/600/600/" +
        encodeURIComponent(item[4]) + "?lock=" + id,
      store: store
    };
  }

  const products = [];

  // Amazon - 35 products
  catalog.slice(0, 35).forEach((item, index) => {
    products.push(makeProduct(item, "Amazon", index + 1));
  });

  // Flipkart - 35 products
  catalog.slice(16, 51).forEach((item, index) => {
    products.push(makeProduct(item, "Flipkart", index + 36));
  });

  // Myntra - 14 fashion, shoes and beauty products
  catalog.slice(15, 29).forEach((item, index) => {
    products.push(makeProduct(item, "Myntra", index + 71));
  });

  // Myntra - 6 additional products
  myntraExtra.forEach((item, index) => {
    products.push(makeProduct(item, "Myntra", index + 85));
  });

  // =====================================
  // WISHLIST
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
            <img src="${item.image}" alt="${item.name}" width="50">
            <span>${item.name}</span>
            <strong>₹${Number(item.price).toLocaleString("en-IN")}</strong>
          </div>
        `).join("")
        : "<p>No saved products yet.</p>";
    }
  }

  // =====================================
  // STORE LINKS
  // =====================================

  function storeLink(product) {
    const query = encodeURIComponent(product.name);

    if (product.store === "Amazon") {
      return "https://www.amazon.in/s?k=" + query +
        "&tag=" + AMAZON_TAG;
    }

    if (product.store === "Flipkart") {
      return "https://www.flipkart.com/search?q=" + query;
    }

    return "https://www.myntra.com/" + query;
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
        <div class="product-image">
          <img
            src="${p.image}"
            alt="${p.name}"
            loading="lazy"
            onerror="this.src='https://placehold.co/400x400?text=Product'"
          >

          <button
            class="wishlist-btn ${saved ? "active" : ""}"
            data-wishlist="${p.id}"
            type="button"
          >
            <i class="${saved ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3>${p.name}</h3>

          <div class="product-footer">
            <strong>₹${Number(p.price).toLocaleString("en-IN")}</strong>

            <a
              class="buy-now"
              href="${storeLink(p)}"
              target="_blank"
              rel="noopener noreferrer"
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

    const sort = sortProducts?.value || "default";

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
    if (!productGrid) return;

    const filtered = getFilteredProducts();

    productGrid.innerHTML = filtered.map(productCard).join("");

    if (resultsCount) {
      resultsCount.textContent = filtered.length + " Products Found";
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
    get("searchForm").addEventListener("submit", function (e) {
      e.preventDefault();
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
  // SORT
  // =====================================

  if (sortProducts) {
    sortProducts.addEventListener("change", renderProducts);
  }

  // =====================================
  // WISHLIST BUTTON
  // =====================================

  if (productGrid) {
    productGrid.addEventListener("click", function (e) {
      const button = e.target.closest("[data-wishlist]");
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
  // START
  // =====================================

  updateWishlist();
  renderProducts();

});
