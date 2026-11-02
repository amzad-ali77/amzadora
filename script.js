
document.addEventListener("DOMContentLoaded", function () {
"use strict";

// =====================================
// AMZADORA - EXACT 130 PRODUCTS
// AMAZON 50 | FLIPKART 50 | MYNTRA 30
// =====================================

const AMAZON_TAG = "YOUR_AMAZON_TAG"; // Apna Amazon affiliate ID

let wishlist = JSON.parse(localStorage.getItem("amzadWishlist") || "[]");
let activeStore = "all";
let activeCategory = "all";
let searchText = "";

const $ = id => document.getElementById(id);
const grid = $("productGrid");

// =====================================
// CATEGORY IMAGES
// =====================================

const categoryImages = {
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

const categoryIcons = {
electronics:"fa-headphones",
mobiles:"fa-mobile-screen",
fashion:"fa-shirt",
shoes:"fa-shoe-prints",
beauty:"fa-spa",
home:"fa-house",
fitness:"fa-dumbbell"
};

// =====================================
// AMAZON - EXACT 50 PRODUCTS
// =====================================

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

// =====================================
// FLIPKART - EXACT 50 PRODUCTS
// =====================================

const flipkartData = `
DSLR Digital Camera|electronics|24999
Gaming Headset|electronics|1799
Bluetooth Speaker|electronics|1499
Wireless Mouse|electronics|449
Tablet|electronics|11999
Smart TV|electronics|18999
Laptop Stand|electronics|699
Mechanical Keyboard|electronics|1599
Smart Watch|mobiles|1599
Android Smartphone|mobiles|10999
5G Smartphone|mobiles|14999
Mobile Tripod|mobiles|599
Phone Cover|mobiles|249
Power Bank|mobiles|999
Fast Mobile Charger|mobiles|499
Casual T-Shirt|fashion|499
Men Casual Shirt|fashion|799
Women Dress|fashion|1199
Men Jeans|fashion|999
Women Handbag|fashion|899
Men Hoodie|fashion|999
Women Kurti|fashion|699
Sunglasses|fashion|399
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
Fitness Bottle|fitness|299
Exercise Mat|fitness|799
`.trim();

// =====================================
// MYNTRA - EXACT 30 PRODUCTS
// =====================================

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
Women Fashion Dress|fashion|1299
Women Handbag|fashion|999
Men Formal Shirt|fashion|899
Women Kurti|fashion|799
Running Shoes|shoes|1799
Women Sneakers|shoes|1499
Sports Shoes|shoes|1999
Casual Shoes|shoes|1299
Women Sandals|shoes|999
Skincare Set|beauty|999
Makeup Kit|beauty|799
Face Cream|beauty|399
Lipstick Set|beauty|499
Sunscreen|beauty|349
Table Lamp|home|699
Bedsheet Set|home|999
Home Decor Vase|home|499
Wall Clock|home|399
Women's Sports Leggings|fitness|699
Gym Sports T-Shirt|fitness|599
`.trim();

// =====================================
// CREATE PRODUCT OBJECTS
// =====================================

function createProducts(data, store, prefix) {
return data.split("\n").map((line, index) => {
const [name, category, price] = line.split("|");
const imgs = categoryImages[category];

return {
id:prefix + (index + 1),
name:name,
category:category,
store:store,
price:Number(price),
image:imgs[index % imgs.length],
icon:categoryIcons[category]
};
});
}

const products = [
...createProducts(amazonData,"Amazon","a"),
...createProducts(flipkartData,"Flipkart","f"),
...createProducts(myntraData,"Myntra","m")
];

// =====================================
// VERIFY PRODUCT COUNTS
// =====================================

console.log("AMAZON:",products.filter(p=>p.store==="Amazon").length);
console.log("FLIPKART:",products.filter(p=>p.store==="Flipkart").length);
console.log("MYNTRA:",products.filter(p=>p.store==="Myntra").length);
console.log("TOTAL:",products.length);

// =====================================
// PRODUCT LINKS
// =====================================

function getProductLink(p) {
const q = encodeURIComponent(p.name);

if (p.store === "Amazon") {
let link = "https://www.amazon.in/s?k=" + q;
if (AMAZON_TAG !== "YOUR_AMAZON_TAG" && AMAZON_TAG.trim()) {
link += "&tag=" + encodeURIComponent(AMAZON_TAG);
}
return link;
}

if (p.store === "Flipkart") {
return "https://www.flipkart.com/search?q=" + q;
}

return "https://www.myntra.com/search?q=" + q;
}

// =====================================
// FILTER PRODUCTS
// =====================================

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

// =====================================
// SHOW PRODUCTS
// =====================================

function renderProducts() {
if (!grid) {
console.error("productGrid ID nahi mila. HTML check karo.");
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
<img class="product-image"
src="${p.image}"
alt="${p.name}"
loading="lazy"
onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">

<div class="product-fallback-icon" style="display:none">
<i class="fa-solid ${p.icon}"></i>
</div>

<button class="heart-btn ${saved?"active":""}"
data-wishlist="${p.id}" aria-label="Wishlist">
<i class="${saved?"fa-solid":"fa-regular"} fa-heart"></i>
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

// =====================================
// STORE BUTTONS
// =====================================

document.querySelectorAll(".store-filter").forEach(btn => {
btn.addEventListener("click", () => {
activeStore = btn.dataset.store || "all";

document.querySelectorAll(".store-filter").forEach(b => b.classList.remove("active"));
btn.classList.add("active");

renderProducts();
});
});

// =====================================
// CATEGORY BUTTONS
// =====================================

document.querySelectorAll(".category-card").forEach(btn => {
btn.addEventListener("click", () => {
activeCategory = btn.dataset.category || "all";

document.querySelectorAll(".category-card").forEach(b => b.classList.remove("active"));
btn.classList.add("active");

$("products")?.scrollIntoView({behavior:"smooth"});
renderProducts();
});
});

// =====================================
// CATEGORY DROPDOWN SUPPORT
// If HTML has <select id="categoryFilter">
// =====================================

const categoryFilter = $("categoryFilter");

if (categoryFilter) {
categoryFilter.addEventListener("change", () => {
activeCategory = categoryFilter.value || "all";
renderProducts();
});
}

// =====================================
// SEARCH
// =====================================

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

// =====================================
// SORT
// =====================================

$("sortProducts")?.addEventListener("change",renderProducts);

// =====================================
// WISHLIST
// =====================================

function updateWishlist() {
localStorage.setItem("amzadWishlist",JSON.stringify(wishlist));

if ($("wishlistCount")) $("wishlistCount").textContent = wishlist.length;
if ($("wishlistHeadingCount")) $("wishlistHeadingCount").textContent = wishlist.length;

const savedItems = $("savedItems");
if (!savedItems) return;

const saved = products.filter(p=>wishlist.includes(p.id));

if (!saved.length) {
savedItems.innerHTML = '<p class="wishlist-empty">Your wishlist is empty.</p>';
return;
}

savedItems.innerHTML = saved.map(p=>`
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

grid?.addEventListener("click",e=>{
const btn = e.target.closest("[data-wishlist]");
if (!btn) return;

const id = btn.dataset.wishlist;
wishlist = wishlist.includes(id)
? wishlist.filter(x=>x!==id)
: [...wishlist,id];

updateWishlist();
renderProducts();
});

$("savedItems")?.addEventListener("click",e=>{
const btn = e.target.closest("[data-remove]");
if (!btn) return;

wishlist = wishlist.filter(id=>id!==btn.dataset.remove);
updateWishlist();
renderProducts();
});

$("clearWishlist")?.addEventListener("click",()=>{
wishlist = [];
updateWishlist();
renderProducts();
});

// =====================================
// RESET FILTERS
// =====================================

$("resetFilters")?.addEventListener("click",()=>{
activeStore = "all";
activeCategory = "all";
searchText = "";

if (searchInput) searchInput.value = "";
if ($("sortProducts")) $("sortProducts").value = "default";
if (categoryFilter) categoryFilter.value = "all";

document.querySelectorAll(".store-filter").forEach(btn=>{
btn.classList.toggle("active",btn.dataset.store==="all");
});

document.querySelectorAll(".category-card").forEach(btn=>{
btn.classList.toggle("active",btn.dataset.category==="all");
});

renderProducts();
});

// =====================================
// MOBILE MENU
// =====================================

const mobileMenu = $("mobileMenu");
const mainNav = $("mainNav");

if (mobileMenu && mainNav) {
mobileMenu.addEventListener("click",()=>{
mainNav.classList.toggle("open");
});
}

// =====================================
// FOOTER YEAR
// =====================================

if ($("year")) $("year").textContent = new Date().getFullYear();

// =====================================
// START WEBSITE
// =====================================

renderProducts();
updateWishlist();

});
