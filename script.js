
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const AMAZON_TAG = "amzadmart07-21";
  const STORAGE_KEY = "amzadoraWishlist";
  const $ = (id) => document.getElementById(id);

  // =====================================
  // 51 PRODUCTS WITH IMAGE PATHS
  // =====================================

  const products = [
    // ELECTRONICS
    {id:"headphones",name:"Wireless Headphones",category:"electronics",query:"wireless bluetooth headphones",image:"headphone.jpg",description:"Explore wireless and Bluetooth headphones."},
    {id:"speaker",name:"Bluetooth Speakers",category:"electronics",query:"portable bluetooth speaker",icon:"fa-volume-high",image:"images/speaker.jpg",description:"Browse portable speakers."},
    {id:"smartwatch",name:"Smart Watches",category:"electronics",query:"smart watch",icon:"fa-clock",image:"images/smartwatch.jpg",description:"Explore smart and fitness watches."},
    {id:"powerbank",name:"Power Banks",category:"electronics",query:"power bank",icon:"fa-battery-full",image:"images/powerbank.jpg",description:"Find portable charging options."},
    {id:"laptop",name:"Laptops",category:"electronics",query:"laptop",icon:"fa-laptop",image:"images/laptop.jpg",description:"Browse laptops for study and work."},
    {id:"monitor",name:"Computer Monitors",category:"electronics",query:"computer monitor",icon:"fa-desktop",image:"images/monitor.jpg",description:"Explore computer monitors."},
    {id:"keyboard",name:"Wireless Keyboards",category:"electronics",query:"wireless keyboard",icon:"fa-keyboard",image:"images/keyboard.jpg",description:"Browse wireless keyboards."},
    {id:"mouse",name:"Computer Mouse",category:"electronics",query:"wireless computer mouse",icon:"fa-computer-mouse",image:"images/mouse.jpg",description:"Find computer mouse options."},
    {id:"earbuds",name:"Bluetooth Earbuds",category:"electronics",query:"bluetooth earbuds",icon:"fa-ear-listen",image:"images/earbuds.jpg",description:"Explore wireless earbuds."},
    {id:"camera",name:"Digital Cameras",category:"electronics",query:"digital camera",icon:"fa-camera",image:"images/camera.jpg",description:"Browse cameras and photography equipment."},

    // MOBILES
    {id:"phones",name:"Smartphones",category:"mobiles",query:"smartphone",icon:"fa-mobile-screen-button",image:"images/phones.jpg",description:"Explore smartphones."},
    {id:"cases",name:"Mobile Covers",category:"mobiles",query:"mobile phone case cover",icon:"fa-mobile",image:"images/cases.jpg",description:"Browse protective phone covers."},
    {id:"screen",name:"Screen Protectors",category:"mobiles",query:"mobile screen protector",icon:"fa-shield-halved",image:"images/screen.jpg",description:"Find screen protection accessories."},
    {id:"chargers",name:"Mobile Chargers",category:"mobiles",query:"fast mobile charger",icon:"fa-plug",image:"images/chargers.jpg",description:"Explore mobile chargers."},
    {id:"tripods",name:"Mobile Tripods",category:"mobiles",query:"mobile phone tripod",icon:"fa-camera-retro",image:"images/tripods.jpg",description:"Browse phone tripods and stands."},

    // FASHION
    {id:"tshirts",name:"Men's T-Shirts",category:"fashion",query:"mens t shirts",icon:"fa-shirt",image:"images/tshirts.jpg",description:"Explore casual T-shirts."},
    {id:"shirts",name:"Men's Shirts",category:"fashion",query:"mens casual shirts",icon:"fa-user-tie",image:"images/shirts.jpg",description:"Browse casual and formal shirts."},
    {id:"kurtas",name:"Women's Kurtas",category:"fashion",query:"womens kurta",icon:"fa-person-dress",image:"images/kurtas.jpg",description:"Explore women's kurtas."},
    {id:"jeans",name:"Jeans",category:"fashion",query:"jeans for men and women",icon:"fa-person",image:"images/jeans.jpg",description:"Browse different jeans styles."},
    {id:"backpacks",name:"Backpacks",category:"fashion",query:"backpack bag",icon:"fa-backpack",image:"images/backpacks.jpg",description:"Find bags for college and travel."},

    // SHOES
    {id:"running",name:"Running Shoes",category:"shoes",query:"running shoes",icon:"fa-shoe-prints",image:"images/running.jpg",description:"Explore running shoes."},
    {id:"sneakers",name:"Sneakers",category:"shoes",query:"sneakers shoes",icon:"fa-shoe-prints",image:"images/sneakers.jpg",description:"Browse casual sneakers."},
    {id:"formal",name:"Formal Shoes",category:"shoes",query:"formal shoes",icon:"fa-shoe-prints",image:"images/formal.jpg",description:"Explore formal footwear."},
    {id:"sandals",name:"Sandals & Slippers",category:"shoes",query:"sandals slippers",icon:"fa-socks",image:"images/sandals.jpg",description:"Browse everyday footwear."},

    // BEAUTY
    {id:"facewash",name:"Face Wash",category:"beauty",query:"face wash",icon:"fa-pump-soap",image:"images/facewash.jpg",description:"Explore face cleansers."},
    {id:"moisturizer",name:"Moisturizers",category:"beauty",query:"face moisturizer",icon:"fa-droplet",image:"images/moisturizer.jpg",description:"Browse face moisturizers."},
    {id:"sunscreen",name:"Sunscreen",category:"beauty",query:"sunscreen spf",icon:"fa-sun",image:"images/sunscreen.jpg",description:"Explore sunscreen options."},
    {id:"haircare",name:"Hair Care",category:"beauty",query:"hair care products",icon:"fa-wind",image:"images/haircare.jpg",description:"Browse hair care products."},
    {id:"perfume",name:"Perfumes",category:"beauty",query:"perfume",icon:"fa-spray-can-sparkles",image:"images/perfume.jpg",description:"Explore fragrances."},

    // HOME
    {id:"lamps",name:"Table Lamps",category:"home",query:"table lamp",icon:"fa-lightbulb",image:"images/lamps.jpg",description:"Browse home lighting."},
    {id:"bedsheets",name:"Bedsheets",category:"home",query:"bedsheet set",icon:"fa-bed",image:"images/bedsheets.jpg",description:"Explore bedding sets."},
    {id:"curtains",name:"Curtains",category:"home",query:"curtains for home",icon:"fa-table-cells",image:"images/curtains.jpg",description:"Browse home curtains."},
    {id:"organizers",name:"Storage Organizers",category:"home",query:"home storage organizer",icon:"fa-boxes-stacked",image:"images/organizers.jpg",description:"Find home organization products."},
    {id:"walldecor",name:"Wall Decor",category:"home",query:"wall decor",icon:"fa-image",image:"images/walldecor.jpg",description:"Explore home decoration."},

    // KITCHEN
    {id:"mixer",name:"Mixer Grinders",category:"kitchen",query:"mixer grinder",icon:"fa-blender",image:"images/mixer.jpg",description:"Browse kitchen mixer grinders."},
    {id:"airfryer",name:"Air Fryers",category:"kitchen",query:"air fryer",icon:"fa-fire-burner",image:"images/airfryer.jpg",description:"Explore air fryers."},
    {id:"cookware",name:"Cookware Sets",category:"kitchen",query:"cookware set",icon:"fa-kitchen-set",image:"images/cookware.jpg",description:"Browse cookware."},
    {id:"bottles",name:"Water Bottles",category:"kitchen",query:"water bottle",icon:"fa-bottle-water",image:"images/bottles.jpg",description:"Find reusable bottles."},
    {id:"coffee",name:"Coffee Makers",category:"kitchen",query:"coffee maker machine",icon:"fa-mug-hot",image:"images/coffee.jpg",description:"Explore coffee machines."},

    // FITNESS
    {id:"dumbbells",name:"Dumbbells",category:"fitness",query:"dumbbells",icon:"fa-dumbbell",image:"images/dumbbells.jpg",description:"Browse strength training equipment."},
    {id:"yogamat",name:"Yoga Mats",category:"fitness",query:"yoga mat",icon:"fa-person-praying",image:"images/yogamat.jpg",description:"Explore yoga mats."},
    {id:"bands",name:"Resistance Bands",category:"fitness",query:"resistance bands workout",icon:"fa-arrows-left-right",image:"images/bands.jpg",description:"Find resistance workout bands."},
    {id:"gymbag",name:"Gym Bags",category:"fitness",query:"gym bag",icon:"fa-bag-shopping",image:"images/gymbag.jpg",description:"Browse gym bags."},
    {id:"cycle",name:"Exercise Cycles",category:"fitness",query:"exercise cycle",icon:"fa-bicycle",image:"images/cycle.jpg",description:"Explore indoor exercise cycles."},

    // GAMING
    {id:"gamingmouse",name:"Gaming Mouse",category:"gaming",query:"gaming mouse",icon:"fa-computer-mouse",image:"images/gamingmouse.jpg",description:"Browse gaming mouse options."},
    {id:"gamingheadset",name:"Gaming Headsets",category:"gaming",query:"gaming headset",icon:"fa-headset",image:"images/gamingheadset.jpg",description:"Explore gaming headsets."},
    {id:"controller",name:"Game Controllers",category:"gaming",query:"wireless game controller",icon:"fa-gamepad",image:"images/controller.jpg",description:"Browse game controllers."},
    {id:"gamingchair",name:"Gaming Chairs",category:"gaming",query:"gaming chair",icon:"fa-chair",image:"images/gamingchair.jpg",description:"Explore gaming chairs."},

    // BOOKS
    {id:"selfhelp",name:"Self-Help Books",category:"books",query:"self help books",icon:"fa-book-open",image:"images/selfhelp.jpg",description:"Discover personal development books."},
    {id:"programming",name:"Programming Books",category:"books",query:"programming books",icon:"fa-code",image:"images/programming.jpg",description:"Browse programming books."},
    {id:"exambooks",name:"Competitive Exam Books",category:"books",query:"competitive exam preparation books",icon:"fa-graduation-cap",image:"images/exambooks.jpg",description:"Explore exam preparation books."}
  ];

  // =====================================
  // WISHLIST
  // =====================================

  function loadWishlist() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(saved)
        ? saved.filter(id => products.some(p => p.id === id))
        : [];
    } catch {
      return [];
    }
  }

  let wishlist = loadWishlist();

  function saveWishlist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.warn("Could not save wishlist.", error);
    }
  }

  // =====================================
  // AMAZON AFFILIATE LINK
  // =====================================

  function amazonSearchUrl(query) {
    const url = new URL("https://www.amazon.in/s");
    url.searchParams.set("k", query);
    url.searchParams.set("tag", AMAZON_TAG);
    return url.toString();
  }

  // =====================================
  // PRODUCT CARD WITH IMAGE
  // =====================================

  function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;

    const art = document.createElement("div");
    art.className = "product-art";

    const tag = document.createElement("span");
    tag.className = "product-tag";
    tag.textContent = product.category;

    const heart = document.createElement("button");
    heart.type = "button";
    heart.className = "heart-btn";
    heart.dataset.wishlist = product.id;

    const liked = wishlist.includes(product.id);
    heart.setAttribute("aria-label", liked ? "Remove from saved items" : "Save item");
    heart.setAttribute("aria-pressed", String(liked));
    heart.innerHTML = liked
      ? '<i class="fa-solid fa-heart"></i>'
      : '<i class="fa-regular fa-heart"></i>';

    // PRODUCT IMAGE
    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    // If image is missing, show the category icon instead
    image.onerror = function () {
      const fallback = document.createElement("i");
      fallback.className = "fa-solid " + product.icon + " product-fallback-icon";
      fallback.setAttribute("aria-hidden", "true");
      image.replaceWith(fallback);
    };

    art.append(tag, heart, image);

    const info = document.createElement("div");
    info.className = "product-info";

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.textContent = "AMZADORA SEARCH";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const store = document.createElement("span");
    store.className = "store";
    store.innerHTML = '<i class="fa-brands fa-amazon"></i> Search Amazon';

    const buy = document.createElement("a");
    buy.className = "buy-now";
    buy.href = amazonSearchUrl(product.query);
    buy.target = "_blank";
    buy.rel = "sponsored nofollow noopener noreferrer";
    buy.innerHTML = 'View on Amazon <i class="fa-solid fa-arrow-up-right-from-square"></i>';

    footer.append(store, buy);
    info.append(meta, title, description, footer);
    card.append(art, info);

    return card;
  }

  // =====================================
  // SEARCH AND FILTER
  // =====================================

  const grid = $("productGrid");
  const searchInput = $("searchInput");
  const searchForm = $("searchForm");
  const sortSelect = $("sortProducts");
  const resultsCount = $("resultsCount");
  const emptyState = $("emptyState");

  const categoryButtons = Array.from(document.querySelectorAll(".category"));
  let activeCategory = "all";

  function renderProducts() {
    const term = (searchInput?.value || "").trim().toLowerCase();

    let visible = products.filter(product => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      const searchable = (
        product.name + " " +
        product.description + " " +
        product.category + " " +
        product.query
      ).toLowerCase();

      return matchesCategory && searchable.includes(term);
    });

    if (sortSelect?.value === "name") {
      visible.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (grid) {
      grid.replaceChildren(...visible.map(createProductCard));
    }

    if (resultsCount) {
      resultsCount.textContent =
        "Showing " + visible.length + " of " + products.length + " product searches";
    }

    if (emptyState) {
      emptyState.hidden = visible.length !== 0;
    }
  }

  searchForm?.addEventListener("submit", function (event) {
    event.preventDefault();
    renderProducts();
    $("products")?.scrollIntoView({ behavior: "smooth" });
  });

  searchInput?.addEventListener("input", renderProducts);
  sortSelect?.addEventListener("change", renderProducts);

  categoryButtons.forEach(button => {
    button.addEventListener("click", function () {
      activeCategory = this.dataset.category || "all";

      categoryButtons.forEach(btn => {
        btn.classList.toggle("active", btn === this);
      });

      renderProducts();
    });
  });

  $("resetFilters")?.addEventListener("click", function () {
    if (searchInput) searchInput.value = "";

    activeCategory = "all";

    if (sortSelect) sortSelect.value = "default";

    categoryButtons.forEach(button => {
      button.classList.toggle("active", button.dataset.category === "all");
    });

    renderProducts();
  });

  // =====================================
  // WISHLIST DISPLAY
  // =====================================

  function toggleWishlist(id) {
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter(item => item !== id);
    } else {
      wishlist.push(id);
    }

    saveWishlist();
    renderProducts();
    renderWishlist();
  }

  grid?.addEventListener("click", function (event) {
    const heart = event.target.closest("[data-wishlist]");
    if (!heart) return;
    toggleWishlist(heart.dataset.wishlist);
  });

  function renderWishlist() {
    const count = $("wishlistCount");
    const saved = $("savedItems");

    if (count) count.textContent = wishlist.length;
    if (!saved) return;

    saved.replaceChildren();

    if (wishlist.length === 0) {
      const message = document.createElement("p");
      message.className = "saved-empty";
      message.textContent =
        "You have not saved any products yet. Tap the heart on a product to save it.";
      saved.appendChild(message);
      return;
    }

    wishlist.forEach(id => {
      const product = products.find(item => item.id === id);
      if (!product) return;

      const row = document.createElement("div");
      row.className = "saved-item";

      const name = document.createElement("strong");
      name.textContent = product.name;

      const actions = document.createElement("div");

      const open = document.createElement("a");
      open.className = "buy-now";
      open.href = amazonSearchUrl(product.query);
      open.target = "_blank";
      open.rel = "sponsored nofollow noopener noreferrer";
      open.textContent = "View on Amazon";

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";

      remove.addEventListener("click", function () {
        toggleWishlist(id);
      });

      actions.append(open, remove);
      row.append(name, actions);
      saved.appendChild(row);
    });
  }

  $("clearWishlist")?.addEventListener("click", function () {
    if (wishlist.length === 0) {
      alert("Your saved items list is already empty.");
      return;
    }

    if (confirm("Remove all saved items?")) {
      wishlist = [];
      saveWishlist();
      renderProducts();
      renderWishlist();
    }
  });

  // =====================================
  // MOBILE MENU
  // =====================================

  const mobileMenu = $("mobileMenu");
  const mainNav = $("mainNav");

  mobileMenu?.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("active");

    mobileMenu.setAttribute("aria-expanded", String(isOpen));

    const icon = mobileMenu.querySelector("i");

    if (icon) {
      icon.className = isOpen
        ? "fa-solid fa-xmark"
        : "fa-solid fa-bars";
    }
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");
      mobileMenu?.setAttribute("aria-expanded", "false");

      const icon = mobileMenu?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });

  // =====================================
  // FOOTER YEAR
  // =====================================

  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();

  // INITIAL LOAD
  renderProducts();
  renderWishlist();
});
