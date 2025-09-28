// Sample Data
const products = [
    {name: "Wireless Headphones", category:"electronics", rating:4.5, trend:"hot", region:"north-america"},
    {name: "Smart Watch", category:"electronics", rating:4, trend:"rising", region:"europe"},
    {name: "Running Shoes", category:"sports", rating:4.2, trend:"new", region:"asia"},
    {name: "Leather Jacket", category:"fashion", rating:4.8, trend:"hot", region:"europe"},
    {name: "Coffee Maker", category:"home", rating:3.9, trend:"rising", region:"north-america"},
];

const suppliers = [
    {name: "TechCorp", rating:4.6, trend:"hot", region:"north-america"},
    {name: "FashionHub", rating:4.4, trend:"new", region:"europe"},
    {name: "HomeEssentials", rating:4.0, trend:"rising", region:"asia"},
    {name: "SportsArena", rating:4.3, trend:"hot", region:"north-america"},
];

// Tab Switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tabContents.forEach(content => content.style.display = 'none');
        document.getElementById(button.dataset.tab).style.display = 'grid';
    });
});

// Render Cards
function renderCards(list, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="placeholder-image"></div>
            <h3>${item.name}</h3>
            ${item.category ? `<p>Category: ${item.category}</p>` : ''}
            <p>Region: ${item.region}</p>
            <div class="rating">${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 ? '½' : ''}</div>
            <p>Trend: ${item.trend}</p>
        `;
        container.appendChild(card);
    });
}

// Initial Render
renderCards(products, 'products');
renderCards(suppliers, 'suppliers');

// Filters
document.getElementById('apply-filters').addEventListener('click', () => {
    const category = document.getElementById('category').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const trend = document.getElementById('trend').value;
    const region = document.getElementById('region').value;

    const filteredProducts = products.filter(p =>
        (category === 'all' || p.category === category) &&
        p.rating >= rating &&
        (trend === 'all' || p.trend === trend) &&
        (region === 'all' || p.region === region)
    );

    const filteredSuppliers = suppliers.filter(s =>
        s.rating >= rating &&
        (trend === 'all' || s.trend === trend) &&
        (region === 'all' || s.region === region)
    );

    renderCards(filteredProducts, 'products');
    renderCards(filteredSuppliers, 'suppliers');
});
