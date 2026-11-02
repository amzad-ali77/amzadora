
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =====================================
  // AMZADORA - 90 UNIQUE PRODUCTS
  // Amazon 35 | Flipkart 35 | Myntra 20
  // =====================================

  const AMAZON_TAG = "YOUR_AMAZON_TAG";

  const products = [];

  function addProducts(store, prefix, items) {
    items.forEach((item, index) => {
      const [name, category, price, icon] = item;
      const id = prefix + (index + 1);

      products.push({
        id,
        name,
        category,
        price,
        store,
        icon,
        image: `images/${id}.jpg`
      });
    });
  }

  // ================ AMAZON (35) ================
  addProducts("Amazon", "a", [
    ["Wireless Headphones","electronics",1499,"fa-headphones"],
    ["Bluetooth Speaker","electronics",999,"fa-volume-high"],
    ["Smart Watch","electronics",1999,"fa-clock"],
    ["Power Bank","electronics",899,"fa-battery-full"],
    ["Laptop","electronics",45999,"fa-laptop"],
    ["Computer Monitor","electronics",8999,"fa-desktop"],
    ["Wireless Keyboard","electronics",799,"fa-keyboard"],
    ["Gaming Mouse","electronics",599,"fa-computer-mouse"],
    ["Android Smartphone","mobiles",12999,"fa-mobile-screen"],
    ["5G Smartphone","mobiles",18999,"fa-mobile"],
    ["Mobile Cover","mobiles",299,"fa-shield"],
    ["Fast Charger","mobiles",499,"fa-plug"],
    ["Bluetooth Earbuds","mobiles",1199,"fa-ear-listen"],
    ["Mobile Tripod","mobiles",699,"fa-camera"],
    ["USB Type C Cable","mobiles",199,"fa-link"],
    ["Men Casual T-Shirt","fashion",499,"fa-shirt"],
    ["Women Ethnic Wear","fashion",1299,"fa-person-dress"],
    ["Men Denim Jacket","fashion",1599,"fa-shirt"],
    ["Women Handbag","fashion",999,"fa-bag-shopping"],
    ["Men Formal Shirt","fashion",799,"fa-shirt"],
    ["Women Kurti","fashion",699,"fa-person-dress"],
    ["Men Slim Fit Jeans","fashion",1199,"fa-person"],
    ["Men Running Shoes","shoes",1499,"fa-shoe-prints"],
    ["Women Sneakers","shoes",1799,"fa-shoe-prints"],
    ["Sports Shoes","shoes",1299,"fa-person-running"],
    ["Women Sandals","shoes",799,"fa-shoe-prints"],
    ["Men Formal Shoes","shoes",1899,"fa-shoe-prints"],
    ["Face Wash","beauty",249,"fa-pump-soap"],
    ["Skin Care Kit","beauty",899,"fa-spa"],
    ["Lipstick Set","beauty",499,"fa-wand-magic-sparkles"],
    ["Table Lamp","home",699,"fa-lightbulb"],
    ["Bedsheet Set","home",999,"fa-bed"],
    ["Wall Clock","home",499,"fa-clock"],
    ["Yoga Mat","fitness",599,"fa-dumbbell"],
    ["Gym Bag","fitness",799,"fa-bag-shopping"]
  ]);

  // ================ FLIPKART (35) ================
  addProducts("Flipkart", "f", [
    ["LED Television","electronics",18999,"fa-tv"],
    ["Home Theatre","electronics",4999,"fa-volume-high"],
    ["DSLR Camera","electronics",32999,"fa-camera"],
    ["Wireless Printer","electronics",5999,"fa-print"],
    ["Gaming Laptop","electronics",55999,"fa-laptop"],
    ["External Hard Drive","electronics",3999,"fa-hard-drive"],
    ["Webcam","electronics",1499,"fa-video"],
    ["Bluetooth Headset","electronics",899,"fa-headset"],
    ["Budget Smartphone","mobiles",8999,"fa-mobile-screen"],
    ["Premium Smartphone","mobiles",24999,"fa-mobile"],
    ["Gaming Phone","mobiles",19999,"fa-gamepad"],
    ["Wireless Mobile Charger","mobiles",999,"fa-bolt"],
    ["Phone Ring Holder","mobiles",149,"fa-mobile"],
    ["Tempered Glass","mobiles",199,"fa-shield"],
    ["Selfie Stick","mobiles",399,"fa-camera"],
    ["Women Western Dress","fashion",1199,"fa-person-dress"],
    ["Men Printed Shirt","fashion",699,"fa-shirt"],
    ["Women Denim Jeans","fashion",999,"fa-person"],
    ["Men Hoodie","fashion",899,"fa-shirt"],
    ["Women Saree","fashion",1499,"fa-person-dress"],
    ["Men Cotton T-Shirt","fashion",399,"fa-shirt"],
    ["Women Party Wear Dress","fashion",1799,"fa-person-dress"],
    ["Men Casual Sneakers","shoes",1299,"fa-shoe-prints"],
    ["Women Running Shoes","shoes",1599,"fa-person-running"],
    ["Men Sports Sandals","shoes",699,"fa-shoe-prints"],
    ["Women Flat Sandals","shoes",599,"fa-shoe-prints"],
    ["Kids Sports Shoes","shoes",799,"fa-shoe-prints"],
    ["Hair Dryer","beauty",999,"fa-wind"],
    ["Makeup Brush Set","beauty",399,"fa-brush"],
    ["Perfume","beauty",699,"fa-spray-can"],
    ["Kitchen Storage Set","home",599,"fa-box"],
    ["Decorative Vase","home",499,"fa-vase"],
    ["Curtain Set","home",899,"fa-window-maximize"],
    ["Adjustable Dumbbells","fitness",1999,"fa-dumbbell"],
    ["Resistance Bands","fitness",399,"fa-heart-pulse"]
  ]);

  // ================ MYNTRA (20) ================
  addProducts("Myntra", "m", [
    ["Premium Bluetooth Earbuds","electronics",1499,"fa-ear-listen"],
    ["Fitness Smart Band","electronics",1299,"fa-clock"],
    ["Portable Bluetooth Speaker","electronics",1199,"fa-volume-high"],
    ["Wireless Neckband","electronics",999,"fa-headphones"],
    ["Stylish Mobile Cover","mobiles",349,"fa-mobile"],
    ["Designer Phone Case","mobiles",399,"fa-mobile-screen"],
    ["Premium Fast Charger","mobiles",599,"fa-plug"],
    ["Mobile Back Cover","mobiles",249,"fa-shield"],
    ["Women Designer Kurta","fashion",999,"fa-person-dress"],
    ["Men Casual Blazer","fashion",2299,"fa-user-tie"],
    ["Women Anarkali Suit","fashion",1899,"fa-person-dress"],
    ["Men Printed Kurta","fashion",899,"fa-shirt"],
    ["Women Maxi Dress","fashion",1499,"fa-person-dress"],
    ["Men Polo T-Shirt","fashion",699,"fa-shirt"],
    ["Women Party Heels","shoes",1299,"fa-shoe-prints"],
    ["Men Leather Loafers","shoes",1799,"fa-shoe-prints"],
    ["Women Fashion Sneakers","shoes",1599,"fa-shoe-prints"],
    ["Men Running Trainers","shoes",1399,"fa-person-running"],
    ["Makeup Combo Kit","beauty",799,"fa-wand-magic-sparkles"],
    ["Women's Face Serum","beauty",499,"fa-spa"]
  ]);

  // =====================================
  // ELEMENTS
  // =====================================

  const get = id => document.getElementById(id);

  const productGrid =
    get("productGrid") ||
    get("products");

  const searchInput = get("searchInput");
  const sortProducts = get("sortProducts");
  const resultsCount = get("resultsCount");
  const emptyState = get("emptyState");

  let activeStore = "all";
  let activeCategory = "all";
  let searchText = "";

  let wishlist = [];

  try {
    wishlist = JSON.parse(
      localStorage.getItem("amzadWishlist") || "[]"
    );
  } catch {
    wishlist = [];
  }

  // =====================================
  // STORE LINKS
  // =====================================

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

  // =====================================
  // WISHLIST
  // =====================================

  function updateWishlistCount() {
    const count = get("wishlistCount");
    const heading = get("wishlistHeadingCount");

    if (count) count.textContent = wishlist.length;
    if (heading) heading.textContent = wishlist.length;
  }

  function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
    } else {
      wishlist.push(id);
    }

    localStorage.setItem(
      "amzadWishlist",
      JSON.stringify(wishlist)
    );

    renderProducts();
    renderWishlist();
    updateWishlistCount();
  }

  // =====================================
  // PRODUCT CARD
  // =====================================

  function createProductCard(product) {
    const isSaved = wishlist.includes(product.id);

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
            <i class="fa-solid ${product.icon}"></i>
          </div>

          <button
            class="heart-btn ${isSaved ? "active" : ""}"
            data-wishlist="${product.id}"
            aria-label="Add to wishlist"
          >
            <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>

        <div class="product-info">
          <span class="store">${product.store}</span>

          <h3>${product.name}</h3>

          <div class="product-meta">
            <span class="product-category">${product.category}</span>
          </div>

          <div class="product-footer">
            <strong>₹${product.price.toLocaleString("en-IN")}</strong>

            <a
              class="buy-now"
              href="${getProductLink(product)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Deal <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  // =====================================
  // FILTER + SEARCH + SORT
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
        product.category.toLowerCase().includes(searchText) ||
        product.store.toLowerCase().includes(searchText);

      return storeMatch && categoryMatch && searchMatch;
    });

    if (sortProducts) {
      if (sortProducts.value === "low") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortProducts.value === "high") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortProducts.value === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    productGrid.innerHTML = filtered.length
      ? filtered.map(createProductCard).join("")
      : "";

    if (resultsCount) {
      resultsCount.textContent =
        `Showing ${filtered.length} products`;
    }

    if (emptyState) {
      emptyState.style.display =
        filtered.length ? "none" : "block";
    }

    productGrid.querySelectorAll("[data-wishlist]").forEach(button => {
      button.addEventListener("click", () => {
        toggleWishlist(button.dataset.wishlist);
      });
    });
  }

  // =====================================
  // STORE FILTER BUTTONS
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
      searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";
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
  // WISHLIST DISPLAY
  // =====================================

  function renderWishlist() {
    const savedItems = get("savedItems");
    if (!savedItems) return;

    const savedProducts = products.filter(product =>
      wishlist.includes(product.id)
    );

    savedItems.innerHTML = savedProducts.length
      ? savedProducts.map(product => `
          <div class="saved-item">
            <span>${product.name}</span>
            <strong>₹${product.price.toLocaleString("en-IN")}</strong>
            <button class="remove-saved" data-remove="${product.id}">
              Remove
            </button>
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

  // =====================================
  // FOOTER YEAR
  // =====================================

  const year = get("year");
  if (year) year.textContent = new Date().getFullYear();

  // =====================================
  // INITIALIZE
  // =====================================

  console.log("AMZADORA products:", products.length);
  console.log("Amazon:", products.filter(p => p.store === "Amazon").length);
  console.log("Flipkart:", products.filter(p => p.store === "Flipkart").length);
  console.log("Myntra:", products.filter(p => p.store === "Myntra").length);

  renderProducts();
  renderWishlist();
  updateWishlistCount();
});
