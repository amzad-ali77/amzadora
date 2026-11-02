
document.addEventListener("DOMContentLoaded", function () {
"use strict";

// ========================================
// AMZADORA - 130 PRODUCTS WITH UNIQUE IMAGES
// AMAZON 50 | FLIPKART 50 | MYNTRA 30
// ========================================

const AMAZON_TAG = "YOUR_AMAZON_TAG";

let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
let activeStore = "all";
let activeCategory = "all";
let searchText = "";

const $ = id => document.getElementById(id);
const grid = $("productGrid");

// ========================================
// CATEGORY ICONS
// ========================================

const icons = {
electronics:"fa-headphones",
mobiles:"fa-mobile-screen",
fashion:"fa-shirt",
shoes:"fa-shoe-prints",
beauty:"fa-spa",
home:"fa-house",
fitness:"fa-dumbbell"
};

// ========================================
// AMAZON - 50 PRODUCTS
// ========================================

const amazonData = `
Wireless Headphones|electronics|1499
Bluetooth Speaker|electronics|999
Smart Watch|electronics|1999
Power Bank 20000mAh|electronics|1299
Laptop|electronics|42999
Computer Monitor|electronics|8999
Wireless Keyboard|electronics|799
Gaming Mouse|electronics|599
Smartphone|mobiles|12999
Android 5G Phone|mobiles|15999
Mobile Phone Cover|mobiles|299
Fast Charger|mobiles|499
Bluetooth Earbuds|mobiles|1199
Mobile Tripod|mobiles|599
Selfie Stick|mobiles|399
Men Casual T-Shirt|fashion|499
Men Denim Jacket|fashion|1499
Women Fashion Dress|fashion|1299
Men Formal Shirt|fashion|899
Women Handbag|fashion|999
Men Jeans|fashion|1199
Women Kurti|fashion|799
Sunglasses|fashion|499
Running Shoes|shoes|1799
Sports Shoes|shoes|1499
Casual Sneakers|shoes|1299
Men Formal Shoes|shoes|1999
Women Sandals|shoes|999
Walking Shoes|shoes|1399
Men Loafers|shoes|1599
Skincare Kit|beauty|899
Face Wash|beauty|299
Moisturizer Cream|beauty|399
Makeup Kit|beauty|799
Sunscreen Lotion|beauty|349
Lipstick Set|beauty|499
Table Lamp|home|699
Wall Clock|home|499
Bedsheet Set|home|999
Water Bottle|home|299
Home Decor Vase|home|599
Storage Organizer|home|449
Gym Dumbbells|fitness|999
Yoga Mat|fitness|599
Resistance Bands|fitness|399
Gym Bag|fitness|799
Skipping Rope|fitness|249
Protein Shaker Bottle|fitness|299
Push Up Bars|fitness|499
Fitness Gloves|fitness|349
`.trim();

// ========================================
// FLIPKART - 50 PRODUCTS
// ========================================

const flipkartData = `
DSLR Digital Camera|electronics|24999
Gaming Headset|electronics|1799
Bluetooth Speaker Portable|electronics|1499
Wireless Mouse|electronics|449
Android Tablet|electronics|11999
Smart LED TV|electronics|18999
Laptop Stand|electronics|699
Mechanical Keyboard|electronics|1599
Smart Watch Fitness|electronics|1599
Android Smartphone|mobiles|10999
5G Smartphone|mobiles|14999
Mobile Tripod Stand|mobiles|599
Phone Cover|mobiles|249
Power Bank|mobiles|999
Fast Mobile Charger|mobiles|499
Casual Cotton T-Shirt|fashion|499
Men Casual Shirt|fashion|799
Women Party Dress|fashion|1199
Men Slim Fit Jeans|fashion|999
Women Handbag|fashion|899
Men Hoodie|fashion|999
Women Printed Kurti|fashion|699
Aviator Sunglasses|fashion|399
Running Shoes|shoes|1299
Sports Shoes|shoes|1599
Casual Sneakers|shoes|1199
Women Sneakers|shoes|1499
Men Sandals|shoes|699
Women Heels|shoes|1299
Men Formal Shoes|shoes|1799
Face Cream|beauty|299
Beauty Makeup Kit|beauty|699
Face Wash|beauty|249
Hair Shampoo|beauty|299
Sunscreen|beauty|349
Lip Balm|beauty|199
Home Decor Vase|home|499
Wall Clock|home|399
Table Lamp|home|699
Bedsheet Set|home|899
Kitchen Organizer|home|349
Decorative Light|home|599
Yoga Mat|fitness|599
Gym Gloves|fitness|399
Dumbbells Set|fitness|999
Skipping Rope|fitness|249
Gym Bag|fitness|699
Resistance Bands|fitness|349
Fitness Water Bottle|fitness|299
Exercise Mat|fitness|799
`.trim();

// ========================================
// MYNTRA - 30 PRODUCTS
// ========================================

const myntraData = `
Wireless Headphones|electronics|1499
Smart Watch|electronics|1999
Bluetooth Speaker|electronics|1299
Wireless Earbuds|electronics|999
Smartphone|mobiles|12999
Mobile Cover|mobiles|299
Fast Charger|mobiles|499
Power Bank|mobiles|899
Men Casual T-Shirt|fashion|599
Men Denim Jacket|fashion|1499
Women Ethnic Wear|fashion|1299
Women Handbag|fashion|999
Men Formal Shirt|fashion|899
Women Kurti|fashion|799
Men Slim Fit Jeans|fashion|1199
Women Western Dress|fashion|1399
Men Running Shoes|shoes|1799
Women Sneakers|shoes|1499
Sports Shoes|shoes|1999
Casual Shoes|shoes|1299
Women Sandals|shoes|999
Men Formal Shoes|shoes|1899
Women Heels|shoes|1299
Men Loafers|shoes|1599
Women's Skincare Set|beauty|999
Makeup Kit|beauty|799
Face Cream|beauty|399
Lipstick Set|beauty|499
Table Lamp|home|699
Bedsheet Set|home|999
`.trim();

// ========================================
// UNIQUE IMAGE URL FOR EVERY PRODUCT
// ========================================

function makeImage(name, category, lock) {
const searchTerms = {
electronics:"electronics gadget product",
mobiles:"mobile phone smartphone",
fashion:"fashion clothing outfit",
shoes:"footwear shoes",
beauty:"beauty skincare cosmetics",
home:"home decor interior",
fitness:"fitness gym equipment"
};

const query = encodeURIComponent(
name + " " + searchTerms[category]
);

return "https://loremflickr.com/600/600/" +
query + "?lock=" + lock;
}

// ========================================
// CREATE PRODUCT OBJECTS
// ========================================

function createProducts(data, store, prefix, lockStart) {
return data.split("\n").map((line, index) => {
const [name, category, price] = line.split("|");

return {
id:prefix + (index + 1),
name:name,
category:category,
store:store,
price:Number(price),
image:makeImage(name, category, lockStart + index),
icon:icons[category] || "fa-bag-shopping"
};
});
}

const products = [
...createProducts(amazonData,"Amazon","a",1001),
...createProducts(flipkartData,"Flipkart","f",2001),
...createProducts(myntraData,"Myntra","m",3001)
];

// ========================================
// PRODUCT COUNT CHECK
// ========================================

console.log("Amazon:",products.filter(p=>p.store==="Amazon").length);
console.log("Flipkart:",products.filter(p=>p.store==="Flipkart").length);
console.log("Myntra:",products.filter(p=>p.store==="Myntra").length);
console.log("TOTAL:",products.length);

// ========================================
// AFFILIATE AND STORE LINKS
// ========================================

function getProductLink(p) {
const query = encodeURIComponent(p.name);

if (p.store === "Amazon") {
let link = "https://www.amazon.in/s?k=" + query;

if (AMAZON_TAG !== "YOUR_AMAZON_TAG" && AMAZON_TAG.trim()) {
link += "&tag=" + encodeURIComponent(AMAZON_TAG);
}

return link;
}

if (p.store === "Flipkart") {
return "https://www.flipkart.com/search?q=" + query;
}

return "https://www.myntra.com/search?q=" + query;
}

// ========================================
// HTML SAFE TEXT
// ========================================

function safe(value) {
return String(value).replace(/[&<>"']/g, char => ({
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#039;"
})[char]);
}

// ========================================
// FILTER PRODUCTS
// ========================================

function getFilteredProducts() {
let list = [...products];

if (activeStore !== "all") {
list = list.filter(p =>
p.store.toLowerCase() === activeStore.toLowerCase()
);
}

if (activeCategory !== "all") {
list = list.filter(p => p.category === activeCategory);
}

if (searchText) {
list = list.filter(p =>
p.name.toLowerCase().includes(searchText) ||
p.category.toLowerCase().includes(searchText) ||
p.store.toLowerCase().includes(searchText)
);
}

return list;
}

// ========================================
// DISPLAY PRODUCTS
// ========================================

function renderProducts() {
if (!grid) {
console.error("productGrid ID missing in HTML");
return;
}

let list = getFilteredProducts();
const sort = $("sortProducts")?.value || "default";

if (sort === "low") list.sort((a,b)=>a.price-b.price);
if (sort === "high") list.sort((a,b)=>b.price-a.price);
if (sort === "name") list.sort((a,b)=>a.name.localeCompare(b.name));

if ($("resultsCount")) {
$("resultsCount").textContent = list.length + " products found";
}

if ($("emptyState")) {
$("emptyState").style.display = list.length ? "none" : "block";
}

grid.innerHTML = list.map(p => {
const saved = wishlist.includes(p.id);

return `
<article class="product-card">
<div class="product-art">
<img
class="product-image"
src="${p.image}"
alt="${safe(p.name)}"
loading="lazy"
onerror="this.style.display='none';this.nextElementSibling.style.display='grid';"
>

<div class="product-fallback-icon" style="display:none">
<i class="fa-solid ${p.icon}"></i>
</div>

<button class="heart-btn ${saved?"active":""}"
data-wishlist="${p.id}"
aria-label="Add to wishlist">
<i class="${saved?"fa-solid":"fa-regular"} fa-heart"></i>
</button>
</div>

<div class="product-info">
<div class="product-meta">
<span class="store ${p.store.toLowerCase()}">${p.store}</span>
<span>${safe(p.category)}</span>
</div>

<h3>${safe(p.name)}</h3>

<div class="product-footer">
<strong>₹${p.price.toLocaleString("en-IN")}</strong>
<a class="buy-now"
href="${getProductLink(p)}"
target="_blank"
rel="nofollow sponsored noopener">
Buy Now <i class="fa-solid fa-arrow-up-right-from-square"></i>
</a>
</div>
</div>
</article>
`;
}).join("");
}

// ========================================
// STORE FILTERS
// ========================================

document.querySelectorAll(".store-filter").forEach(btn => {
btn.addEventListener("click", () => {
activeStore = btn.dataset.store || "all";

document.querySelectorAll(".store-filter").forEach(b => {
b.classList.remove("active");
});

btn.classList.add("active");
renderProducts();
});
});

// ========================================
// CATEGORY FILTERS
// ========================================

document.querySelectorAll(".category-card").forEach(btn => {
btn.addEventListener("click", () => {
activeCategory = btn.dataset.category || "all";

document.querySelectorAll(".category-card").forEach(b => {
b.classList.remove("active");
});

btn.classList.add("active");
$("products")?.scrollIntoView({behavior:"smooth"});
renderProducts();
});
});

// ========================================
// CATEGORY DROPDOWN SUPPORT
// ========================================

const categoryFilter = $("categoryFilter");

if (categoryFilter) {
categoryFilter.addEventListener("change", () => {
activeCategory = categoryFilter.value || "all";
renderProducts();
});
}

// ========================================
// SEARCH
// ========================================

const searchInput = $("searchInput");
const searchForm = $("searchForm");

if (searchForm) {
searchForm.addEventListener("submit", e => {
e.preventDefault();
searchText = searchInput?.value.trim().toLowerCase() || "";
renderProducts();
$("products")?.scrollIntoView({behavior:"smooth"});
});
}

if (searchInput) {
searchInput.addEventListener("input", () => {
searchText = searchInput.value.trim().toLowerCase();
renderProducts();
});
}

// ========================================
// SORT PRODUCTS
// ========================================

$("sortProducts")?.addEventListener("change", renderProducts);

// ========================================
// WISHLIST
// ========================================

function updateWishlist() {
localStorage.setItem("amzadWishlist",JSON.stringify(wishlist));

if ($("wishlistCount")) {
$("wishlistCount").textContent = wishlist.length;
}

if ($("wishlistHeadingCount")) {
$("wishlistHeadingCount").textContent = wishlist.length;
}

const savedItems = $("savedItems");
if (!savedItems) return;

const saved = products.filter(p=>wishlist.includes(p.id));

if (!saved.length) {
savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty.</p>';
return;
}

savedItems.innerHTML = saved.map(p=>`
<div class="saved-item">
<img src="${p.image}" alt="${safe(p.name)}">
<div>
<strong>${safe(p.name)}</strong>
<p>₹${p.price.toLocaleString("en-IN")} · ${p.store}</p>
</div>
<button class="remove-saved" data-remove="${p.id}">
<i class="fa-solid fa-trash"></i>
</button>
</div>
`).join("");
}

grid?.addEventListener("click", e => {
const btn = e.target.closest("[data-wishlist]");
if (!btn) return;

const id = btn.dataset.wishlist;

wishlist = wishlist.includes(id)
? wishlist.filter(x=>x!==id)
: [...wishlist,id];

updateWishlist();
renderProducts();
});

$("savedItems")?.addEventListener("click", e => {
const btn = e.target.closest("[data-remove]");
if (!btn) return;

wishlist = wishlist.filter(id=>id!==btn.dataset.remove);
updateWishlist();
renderProducts();
});

$("clearWishlist")?.addEventListener("click", () => {
wishlist = [];
updateWishlist();
renderProducts();
});

// ========================================
// RESET FILTERS
// ========================================

$("resetFilters")?.addEventListener("click", () => {
activeStore = "all";
activeCategory = "all";
searchText = "";

if (searchInput) searchInput.value = "";
if ($("sortProducts")) $("sortProducts").value = "default";
if (categoryFilter) categoryFilter.value = "all";

document.querySelectorAll(".store-filter").forEach(btn => {
btn.classList.toggle("active",btn.dataset.store==="all");
});

document.querySelectorAll(".category-card").forEach(btn => {
btn.classList.toggle("active",btn.dataset.category==="all");
});

renderProducts();
});

// ========================================
// MOBILE MENU
// ========================================

const mobileMenu = $("mobileMenu");
const mainNav = $("mainNav");

if (mobileMenu && mainNav) {
mobileMenu.addEventListener("click", () => {
mainNav.classList.toggle("open");
});
}

// ========================================
// FOOTER YEAR
// ========================================

if ($("year")) {
$("year").textContent = new Date().getFullYear();
}

// ========================================
// START
// ========================================

renderProducts();
updateWishlist();

});
