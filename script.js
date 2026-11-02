
document.addEventListener("DOMContentLoaded", function () {
"use strict";

// ======================================
// AMZADORA - 130 PRODUCTS
// ======================================

const AMAZON_TAG = "YOUR_AMAZON_TAG"; // Apna actual Amazon affiliate ID

let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
let activeStore = "all";
let activeCategory = "all";
let searchText = "";

const get = id => document.getElementById(id);
const productGrid = get("productGrid");

// ======================================
// CATEGORY IMAGES
// ======================================

const images = {
electronics: [
"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600",
"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
],
mobiles: [
"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600",
"https://images.unsplash.com/photo-1601593346740-925612772716?w=600"
],
fashion: [
"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600",
"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
],
shoes: [
"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"
],
beauty: [
"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600",
"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"
],
home: [
"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600",
"https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600"
],
fitness: [
"https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600",
"https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600",
"https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600"
]
};

const icons = {
electronics:"fa-headphones",
mobiles:"fa-mobile-screen",
fashion:"fa-shirt",
shoes:"fa-shoe-prints",
beauty:"fa-spa",
home:"fa-house",
fitness:"fa-dumbbell"
};

// ======================================
// PRODUCT LISTS
// Format: Product Name|Category|Price
// ======================================

// AMAZON - 50 PRODUCTS

const amazonData = `
Wireless Headphones|electronics|1499
Bluetooth Speaker|electronics|999
Smart Watch|electronics|1999
Power Bank 20000mAh|electronics|1299
Laptop|electronics|42999
Computer Monitor|electronics|8999
Wireless Keyboard|electronics|799
Gaming Mouse|electronics|599
Bluetooth Earbuds|electronics|1199
Digital Camera|electronics|24999
Gaming Headphones|electronics|1799
Portable Speaker|electronics|1499
USB Flash Drive|electronics|499
External Hard Drive|electronics|3999
Laptop Cooling Pad|electronics|899
Smartphone|mobiles|12999
Android Phone|mobiles|15999
Mobile Phone Cover|mobiles|299
Fast Charger|mobiles|499
USB Type C Cable|mobiles|199
Mobile Tripod|mobiles|599
Phone Stand|mobiles|249
Screen Protector|mobiles|149
Wireless Mobile Charger|mobiles|999
Selfie Stick|mobiles|399
Men Casual T-Shirt|fashion|499
Men Denim Jacket|fashion|1499
Women Fashion Dress|fashion|1299
Men Formal Shirt|fashion|899
Women Handbag|fashion|999
Men Jeans|fashion|1199
Women Kurti|fashion|799
Sunglasses|fashion|499
Men Hoodie|fashion|999
Women Top|fashion|599
Running Shoes|shoes|1799
Sports Shoes|shoes|1499
Casual Sneakers|shoes|1299
Men Formal Shoes|shoes|1999
Women Sandals|shoes|999
Skincare Kit|beauty|899
Face Wash|beauty|299
Moisturizer Cream|beauty|399
Makeup Kit|beauty|799
Sunscreen Lotion|beauty|349
Table Lamp|home|699
Wall Clock|home|499
Bedsheet Set|home|999
Water Bottle|home|299
Gym Dumbbells|fitness|999
`.trim();

// FLIPKART - 50 PRODUCTS

const flipkartData = `
DSLR Digital Camera|electronics|24999
Gaming Headset|electronics|1799
Bluetooth Speaker|electronics|1499
Wireless Mouse|electronics|449
Tablet|electronics|11999
Smart TV|electronics|18999
Laptop Stand|electronics|699
Mechanical Keyboard|electronics|1599
Computer Webcam|electronics|999
WiFi Router|electronics|1299
Smart Watch|electronics|1599
Wireless Earphones|electronics|899
Portable SSD|electronics|2999
Printer|electronics|4999
LED Monitor|electronics|7999
Android Smartphone|mobiles|10999
5G Smartphone|mobiles|14999
Mobile Tripod|mobiles|599
Phone Cover|mobiles|249
Fast Mobile Charger|mobiles|499
Mobile Holder|mobiles|199
Type C Cable|mobiles|199
Power Bank|mobiles|999
Selfie Stick|mobiles|349
Tempered Glass|mobiles|149
Casual T-Shirt|fashion|499
Men Casual Shirt|fashion|799
Women Dress|fashion|1199
Men Jeans|fashion|999
Women Handbag|fashion|899
Men Hoodie|fashion|999
Women Kurti|fashion|699
Cotton Top|fashion|499
Men Jacket|fashion|1499
Sunglasses|fashion|399
Running Shoes|shoes|1299
Sports Shoes|shoes|1599
Casual Sneakers|shoes|1199
Women Sneakers|shoes|1499
Men Sandals|shoes|699
Face Cream|beauty|299
Beauty Makeup Kit|beauty|699
Face Wash|beauty|249
Hair Shampoo|beauty|299
Sunscreen|beauty|349
Home Decor Vase|home|499
Wall Clock|home|399
Table Lamp|home|699
Bedsheet Set|home|899
Yoga Mat|fitness|599
`.trim();

// MYNTRA - 30 PRODUCTS

const myntraData = `
Men Casual T-Shirt|fashion|599
Men Denim Jacket|fashion|1499
Women Fashion Dress|fashion|1299
Women Handbag|fashion|999
Men Formal Shirt|fashion|899
Women Kurti|fashion|799
Men Jeans|fashion|1199
Women Top|fashion|599
Men Hoodie|fashion|999
Sunglasses|fashion|499
Women Ethnic Wear|fashion|1499
Men Casual Shirt|fashion|799
Women Saree|fashion|1299
Men Polo T-Shirt|fashion|699
Women Western Dress|fashion|1199
Men Running Shoes|shoes|1799
Women Sneakers|shoes|1499
Sports Shoes|shoes|1999
Casual Shoes|shoes|1299
Women Sandals|shoes|999
Men Formal Shoes|shoes|1899
Women Heels|shoes|1299
Men Flip Flops|shoes|499
Women's Skincare Set|beauty|999
Makeup Kit|beauty|799
Face Cream|beauty|399
Lipstick Set|beauty|499
Sunscreen|beauty|349
Women's Sports Leggings|fitness|699
Gym Sports T-Shirt|fitness|599
`.trim();

// ======================================
// CREATE ALL PRODUCTS
// ======================================

function createProducts(data, store, prefix) {
return data.split("\n").map((line, index) => {
const [name, category, price] = line.split("|");
const categoryImages = images[category] || images.electronics;

return {
id: prefix + (index + 1),
name,
category,
store,
price: Number(price),
image: categoryImages[index % categoryImages.length],
icon: icons[category] || "fa-bag-shopping"
};
});
}

const products = [
...createProducts(amazonData, "Amazon", "a"),
...createProducts(flipkartData, "Flipkart", "f"),
...createProducts(myntraData, "Myntra", "m")
];

// ======================================
// PRODUCT LINKS
// ======================================

function getProductLink(product) {
const query = encodeURIComponent(product.name);

if (product.store === "Amazon") {
let url = "https://www.amazon.in/s?k=" + query;
if (AMAZON_TAG !== "YOUR_AMAZON_TAG" && AMAZON_TAG.trim()) {
url += "&tag=" + encodeURIComponent(AMAZON_TAG);
}
return url;
}

if (product.store === "Flipkart") {
return "https://www.flipkart.com/search?q=" + query;
}

return "https://www.myntra.com/search?q=" + query;
}

// ======================================
// FILTER PRODUCTS
// ======================================

function getFilteredProducts() {
let list = [...products];

if (activeStore !== "all") {
list = list.filter(p => p.store.toLowerCase() === activeStore.toLowerCase());
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

// ======================================
// RENDER PRODUCTS
// ======================================

function renderProducts() {
if (!productGrid) return;

let list = getFilteredProducts();
const sort = get("sortProducts")?.value || "default";

if (sort === "low") list.sort((a,b) => a.price-b.price);
if (sort === "high") list.sort((a,b) => b.price-a.price);
if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));

if (get("resultsCount")) {
get("resultsCount").textContent = list.length + " products found";
}

if (get("emptyState")) {
get("emptyState").style.display = list.length ? "none" : "block";
}

productGrid.innerHTML = list.map(p => {
const saved = wishlist.includes(p.id);

return `
<article class="product-card">
<div class="product-art">
<img class="product-image"
src="${p.image}"
alt="${p.name}"
loading="lazy"
onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">

<div class="product-fallback-icon" style="display:none">
<i class="fa-solid ${p.icon}"></i>
</div>

<button class="heart-btn ${saved ? "active" : ""}"
data-wishlist="${p.id}" aria-label="Wishlist">
<i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>
</button>
</div>

<div class="product-info">
<div class="product-meta">
<span class="store ${p.store.toLowerCase()}">${p.store}</span>
<span>${p.category}</span>
</div>

<h3>${p.name}</h3>

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
</article>`;
}).join("");
}

// ======================================
// STORE FILTERS
// ======================================

document.querySelectorAll(".store-filter").forEach(button => {
button.addEventListener("click", () => {
activeStore = button.dataset.store || "all";

document.querySelectorAll(".store-filter").forEach(btn =>
btn.classList.remove("active")
);

button.classList.add("active");
renderProducts();
});
});

// ======================================
// CATEGORY FILTERS
// ======================================

document.querySelectorAll(".category-card").forEach(button => {
button.addEventListener("click", () => {
activeCategory = button.dataset.category || "all";

document.querySelectorAll(".category-card").forEach(btn =>
btn.classList.remove("active")
);

button.classList.add("active");
get("products")?.scrollIntoView({behavior:"smooth"});
renderProducts();
});
});

// ======================================
// SEARCH
// ======================================

const searchInput = get("searchInput");
const searchForm = get("searchForm");

if (searchForm) {
searchForm.addEventListener("submit", event => {
event.preventDefault();
searchText = searchInput?.value.trim().toLowerCase() || "";
renderProducts();
get("products")?.scrollIntoView({behavior:"smooth"});
});
}

if (searchInput) {
searchInput.addEventListener("input", () => {
searchText = searchInput.value.trim().toLowerCase();
renderProducts();
});
}

// ======================================
// SORT
// ======================================

get("sortProducts")?.addEventListener("change", renderProducts);

// ======================================
// WISHLIST
// ======================================

function saveWishlist() {
localStorage.setItem("amzadWishlist", JSON.stringify(wishlist));
updateWishlist();
}

function updateWishlist() {
if (get("wishlistCount")) {
get("wishlistCount").textContent = wishlist.length;
}

if (get("wishlistHeadingCount")) {
get("wishlistHeadingCount").textContent = wishlist.length;
}

const savedItems = get("savedItems");
if (!savedItems) return;

const savedProducts = products.filter(p => wishlist.includes(p.id));

if (!savedProducts.length) {
savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty.</p>';
return;
}

savedItems.innerHTML = savedProducts.map(p => `
<div class="saved-item">
<img src="${p.image}" alt="${p.name}">
<div>
<strong>${p.name}</strong>
<p>₹${p.price.toLocaleString("en-IN")} · ${p.store}</p>
</div>
<button class="remove-saved" data-remove="${p.id}">
<i class="fa-solid fa-trash"></i>
</button>
</div>
`).join("");
}

productGrid?.addEventListener("click", event => {
const button = event.target.closest("[data-wishlist]");
if (!button) return;

const id = button.dataset.wishlist;

wishlist = wishlist.includes(id)
? wishlist.filter(item => item !== id)
: [...wishlist, id];

saveWishlist();
renderProducts();
});

get("savedItems")?.addEventListener("click", event => {
const button = event.target.closest("[data-remove]");
if (!button) return;

wishlist = wishlist.filter(id => id !== button.dataset.remove);
saveWishlist();
renderProducts();
});

get("clearWishlist")?.addEventListener("click", () => {
wishlist = [];
saveWishlist();
renderProducts();
});

// ======================================
// RESET FILTERS
// ======================================

get("resetFilters")?.addEventListener("click", () => {
activeStore = "all";
activeCategory = "all";
searchText = "";

if (searchInput) searchInput.value = "";
if (get("sortProducts")) get("sortProducts").value = "default";

document.querySelectorAll(".store-filter").forEach(btn => {
btn.classList.toggle("active", btn.dataset.store === "all");
});

document.querySelectorAll(".category-card").forEach(btn => {
btn.classList.toggle("active", btn.dataset.category === "all");
});

renderProducts();
});

// ======================================
// MOBILE MENU
// ======================================

const mobileMenu = get("mobileMenu");
const mainNav = get("mainNav");

if (mobileMenu && mainNav) {
mobileMenu.addEventListener("click", () => {
mainNav.classList.toggle("open");
});
}

// ======================================
// FOOTER YEAR + START
// ======================================

if (get("year")) {
get("year").textContent = new Date().getFullYear();
}

renderProducts();
updateWishlist();

console.log("AMZADORA loaded:", products.length, "products");
});
