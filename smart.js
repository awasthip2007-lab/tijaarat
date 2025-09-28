v// ========== SMART FILTERS JS ==========

// Sample supplier data
const suppliers = [
  { name: "Golden Traders", location: "Delhi", price: 3500, stock: 90, rating: 4.5, category: "Electronics" },
  { name: "SpiceMart", location: "Mumbai", price: 1200, stock: 60, rating: 4.2, category: "Groceries" },
  { name: "Furniture Hub", location: "Chandigarh", price: 7500, stock: 30, rating: 4.8, category: "Furniture" },
  { name: "Tech Supplies", location: "Delhi", price: 4500, stock: 75, rating: 4.7, category: "Electronics" },
  { name: "Organic Farms", location: "Mumbai", price: 2200, stock: 50, rating: 4.3, category: "Groceries" },
  { name: "DecoHome", location: "Chandigarh", price: 6000, stock: 40, rating: 4.6, category: "Furniture" },
  { name: "ElectroWorld", location: "Delhi", price: 3000, stock: 85, rating: 4.4, category: "Electronics" },
  { name: "Healthy Harvest", location: "Mumbai", price: 2000, stock: 65, rating: 4.5, category: "Groceries" },
  { name: "WoodArt", location: "Chandigarh", price: 6800, stock: 25, rating: 4.9, category: "Furniture" },
  { name: "AI Supplies", location: "Delhi", price: 5000, stock: 70, rating: 4.7, category: "Electronics" }
];

// DOM Elements
const supplierList = document.getElementById("supplierList");
const filterForm = document.getElementById("filterForm");
const priceInput = document.getElementById("price");
const priceValue = document.getElementById("priceValue");
const suggestionList = document.getElementById("suggestionList");

// Suggested AI filters
const suggestions = ["Electronics", "Groceries", "Furniture", "High Stock", "Low Price", "Top Rated"];

// ========== Initialize Suggestions Panel ==========
function initSuggestions() {
  suggestions.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    li.addEventListener("click", () => {
      applySuggestion(s);
    });
    suggestionList.appendChild(li);
  });
}

// ========== Apply Suggestion ==========
function applySuggestion(s) {
  let filtered;
  switch(s){
    case "High Stock":
      filtered = suppliers.filter(sup => sup.stock > 70);
      break;
    case "Low Price":
      filtered = suppliers.filter(sup => sup.price <= 3000);
      break;
    case "Top Rated":
      filtered = suppliers.filter(sup => sup.rating >= 4.5);
      break;
    default:
      filtered = suppliers.filter(sup => sup.category === s);
  }
  renderSuppliers(filtered);
}

// ========== Render Suppliers ==========
function renderSuppliers(list) {
  supplierList.innerHTML = "";
  if(list.length === 0){
    supplierList.innerHTML = "<li>No suppliers match the selected filters.</li>";
    return;
  }
  list.forEach(sup => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="supplier-name">${sup.name}</div>
      <div class="supplier-location">📍 ${sup.location}</div>
      <div class="supplier-price">💰 ₹${sup.price.toLocaleString()}</div>
      <div class="supplier-meter">
        <div class="supplier-meter-fill" style="width:0%"></div>
      </div>
      <div class="supplier-rating">⭐ ${sup.rating}</div>
    `;
    supplierList.appendChild(li);

    // Animate meter
    const meter = li.querySelector(".supplier-meter-fill");
    setTimeout(() => {
      meter.style.width = `${sup.stock}%`;
    }, 100);
  });
}

// ========== Filter Form ==========
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loc = document.getElementById("location").value;
  const avail = document.getElementById("availability").value;
  const price = parseInt(priceInput.value);

  let filtered = suppliers.filter(sup => {
    let match = true;
    if(loc) match = match && sup.location === loc;
    if(avail){
      if(avail === "in-stock") match = match && sup.stock >= 70;
      if(avail === "low-stock") match = match && sup.stock < 70 && sup.stock >=30;
      if(avail === "out-of-stock") match = match && sup.stock < 30;
    }
    match = match && sup.price <= price;
    return match;
  });

  renderSuppliers(filtered);
});

// ========== Update Price Range ==========
priceInput.addEventListener("input", () => {
  priceValue.textContent = `₹100 - ₹${priceInput.value}`;
});

// ========== Live Search ==========
function initSearch() {
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search supplier by name…";
  searchInput.style.padding = "10px 12px";
  searchInput.style.borderRadius = "12px";
  searchInput.style.border = "1px solid rgba(0,0,0,.2)";
  searchInput.style.marginBottom = "12px";
  searchInput.style.width = "100%";
  filterForm.prepend(searchInput);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = suppliers.filter(sup => sup.name.toLowerCase().includes(query));
    renderSuppliers(filtered);
  });
}

// ========== Animations for Cards ==========
function initAnimations() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.transform = "translateY(0)";
        entry.target.style.opacity = "1";
        entry.target.style.transition = "all 0.6s ease";
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll("#supplierList li");
  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    observer.observe(card);
  });
}

// ========== Initialize Everything ==========
function initSmartFilters() {
  initSuggestions();
  renderSuppliers(suppliers);
  initSearch();
  setTimeout(initAnimations, 200); // Give DOM time to render cards
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initSmartFilters);

// ========== Bonus: Auto-Refresh Ratings ==========
function autoUpdateRatings(){
  suppliers.forEach(sup => {
    sup.rating = (4 + Math.random()).toFixed(1);
  });
  renderSuppliers(suppliers);
}
setInterval(autoUpdateRatings, 15000); // every 15s

// ========== Extra: Random AI tips ==========
const aiTips = [
  "Filter by top-rated suppliers for quality.",
  "Low-price suppliers can save budget.",
  "Check stock before ordering.",
  "High-stock suppliers reduce delivery delays.",
  "Use location filter to reduce shipping cost."
];
function showAITip(){
  const tipBox = document.createElement("div");
  tipBox.style.position = "fixed";
  tipBox.style.bottom = "20px";
  tipBox.style.right = "20px";
  tipBox.style.background = "var(--primary-brown)";
  tipBox.style.color = "#fff";
  tipBox.style.padding = "14px 20px";
  tipBox.style.borderRadius = "16px";
  tipBox.style.boxShadow = "var(--shadow)";
  tipBox.textContent = aiTips[Math.floor(Math.random()*aiTips.length)];
  document.body.appendChild(tipBox);
  setTimeout(()=>tipBox.remove(), 5000);
}
setInterval(showAITip, 20000); // every 20s
