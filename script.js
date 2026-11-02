
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // =====================================
  // AMZADORA - COMPLETE PRODUCT SCRIPT
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
  // PRODUCT CATALOG
  // =====================================

  const catalog = [
    // ELECTRONICS
    ["1","Wireless Headphones","electronics","wireless headphones"],
    ["2","Bluetooth Speakers","electronics","bluetooth speakers"],
    ["3","Smart Watches","electronics","smart watches"],
    ["4","Power Banks","electronics","power banks"],
    ["5","Laptops","electronics","laptops"],
    ["6","Computer Monitors","electronics","computer monitors"],
    ["7","Wireless Keyboards","electronics","wireless keyboards"],
    ["8","Computer Mouse","electronics","computer mouse"],
    ["9","Bluetooth Earbuds","electronics","bluetooth earbuds"],
    ["10","Digital Cameras","electronics","digital cameras"],

    // MOBILES
    ["11","Smartphones","mobiles","smartphones"],
    ["12","Mobile Covers","mobiles","mobile covers"],
    ["13","Screen Protectors","mobiles","phone screen protectors"],
    ["14","Mobile Chargers","mobiles","mobile chargers"],
    ["15","Mobile Tripods","mobiles","mobile tripods"],

    // FASHION
    ["16","Men's T-Shirts","fashion","mens tshirts"],
    ["17","Men's Shirts","fashion","mens shirts"],
    ["18","Women's Kurtas","fashion","womens kurtas"],
    ["19","Jeans","fashion","jeans"],
    ["20","Backpacks","fashion","backpacks"],

    // SHOES
    ["21","Running Shoes","shoes","running shoes"],
    ["22","Sneakers","shoes","sneakers"],
    ["23","Formal Shoes","shoes","formal shoes"],
    ["24","Sandals & Slippers","shoes","sandals slippers"],

    // BEAUTY
    ["25","Face Wash","beauty","face wash"],
    ["26","Moisturizers","beauty","moisturizers"],
    ["27","Sunscreen","beauty","sunscreen"],
    ["28","Hair Care","beauty","hair care products"],
    ["29","Perfumes","beauty","perfumes"],

    // HOME
    ["30","Table Lamps","home","table lamps"],
    ["31","Bedsheets","home","bedsheets"],
    ["32","Curtains","home","curtains"],
    ["33","Storage Organizers","home","storage organizers"],
    ["34","Wall Decor","home","wall decor"],

    // KITCHEN
    ["35","Mixer Grinders","kitchen","mixer grinders"],
    ["36","Air Fryers","kitchen","air fryers"],
    ["37","Cookware Sets","kitchen","cookware sets"],
    ["38","Water Bottles","kitchen","water bottles"],
    ["39","Coffee Makers","kitchen","coffee makers"],

    // FITNESS
    ["40","Dumbbells","fitness","dumbbells"],
    ["41","Yoga Mats","fitness","yoga mats"],
    ["42","Resistance Bands","fitness","resistance bands"],
    ["43","Gym Bags","fitness","gym bags"],
    ["44","Exercise Cycles","fitness","exercise cycles"],

    // GAMING
    ["45","Gaming Mouse","gaming","gaming mouse"],
    ["46","Gaming Headsets","gaming","gaming headsets"],
    ["47","Game Controllers","gaming","game controllers"],
    ["48","Gaming Chairs","gaming","gaming chairs"],

    // BOOKS
    ["49","Self-Help Books","books","self help books"],
    ["50","Programming Books","books","programming books"],
    ["51","Competitive Exam Books","books","competitive exam books"]
  ];

  // =====================================
  // EXTRA MYNTRA PRODUCTS
  // =====================================

  const myntraExtra = [
    ["52","Women's Dresses","fashion","womens dresses"],
    ["53","Men's Casual Wear","fashion","mens casual wear"],
    ["54","Women's Handbags","fashion","womens handbags"],
    ["55","Ethnic Wear","fashion","ethnic wear"],
    ["56","Sports Shoes","shoes","sports shoes"],
    ["57","Beauty Makeup Kits","beauty","beauty makeup kits"]
  ];

  // =====================================
  // CREATE PRODUCTS
  // Images: images/A1.JPG to images/A57.JPG
  // A41-A57 can be uploaded later.
  // =====================================

  function makeProduct(item, store) {
    return {
      id: store + "-" + item[0],
      catalogId: item[0],
      name: item[1],
      category: item[2],
      query: item[3],
      image: "./images/A" + item[0] + ".JPG",
      store: store
    };
  }

  const products = [];

  // Amazon - 35 products
  catalog.slice(0, 35).forEach(item => {
    products.push(makeProduct(item, "Amazon"));
  });

  // Flipkart - 35 products
  catalog.slice(16, 51).forEach(item => {
    products.push(makeProduct(item, "Flipkart"));
  });

  // Myntra - 14 products
  catalog.slice(15, 29).forEach(item => {
    products.push(makeProduct(item, "Myntra"));
  });

  // Myntra - 6 extra products
  myntraExtra.forEach(item => {
    products.push(makeProduct(item, "Myntra"));
  });

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

    return "https://www.myntra.com/" + encodeURIComponent(product.name);
  }

  function priceLabel(product) {
    return product.store === "Amazon"
      ? "Check latest price on Amazon"
      : "Check latest price on " + product.store;
  }

  // =====================================
  // WISHLIST
  // =====================================

  let wishlist = [];

  try {
    wishlist = JSON.parse(
      localStorage.getItem("amzadWishlist") || "[]"
    );

    if (!Array.isArray(wishlist)) wishlist = [];
  } catch (error) {
    wishlist = [];
  }

  function saveWishlist() {
    localStorage.setItem(
      "amzadWishlist",
      JSON.stringify(wishlist)
    );
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
            <img src="${item.image}"
                 alt="${item.name}"
                 width="50"
                 onerror="this.style.display='none'">
            <span>${item.name}</span>
            <strong>Check price</strong>
          </div>
        `).join("")
        : "<p>No saved products yet.</p>";
    }
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
            onerror="this.onerror=null;this.src='https://placehold.co/400x400?text=Add+Product+Photo';"
          >

          <button
            class="wishlist-btn ${saved ? "active" : ""}"
            data-wishlist="${p.id}"
            type="button"
            aria-label="Add to wishlist"
          >
            <i class="${saved ? "fas" : "far"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="product-category">${p.category}</span>
          <h3>${p.name}</h3>

          <div class="product-footer">
            <strong class="product-price">
              ${priceLabel(p)}
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

    const sort = sortProducts?.value || "default";

    if (sort === "name") {
      filtered.sort(
        (a, b) => a.name.localeCompare(b.name)
      );
    }

    return filtered;
  }

  // =====================================
  // RENDER PRODUCTS
  // =====================================

  function renderProducts() {
    if (!productGrid) return;

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

  if (get("searchForm")) {
    get("searchForm").addEventListener("submit", function (e) {
      e.preventDefault();

      searchTerm =
        searchInput?.value.trim().toLowerCase() || "";

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
    sortProducts.addEventListener(
      "change",
      renderProducts
    );
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

        if (product) {
          wishlist.push(product);
        }
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
  // START WEBSITE
  // =====================================

  updateWishlist();
  renderProducts();

});
