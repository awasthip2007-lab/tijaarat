// =================== DATA ===================
const trustData = [
    {
        id: 1,
        name: "ElectroHub",
        category: "electronics",
        trust: 85,
        connections: 120,
        description: "Highly recommended by tech retailers. Known for quick shipping and product quality."
    },
    {
        id: 2,
        name: "FashionLane",
        category: "clothing",
        trust: 70,
        connections: 80,
        description: "Trusted by fashion retailers, great customer feedback."
    },
    {
        id: 3,
        name: "GreenGrocer",
        category: "grocery",
        trust: 90,
        connections: 150,
        description: "Organic products, excellent supplier reviews."
    },
    {
        id: 4,
        name: "HomeComforts",
        category: "furniture",
        trust: 60,
        connections: 70,
        description: "Moderately recommended furniture supplier."
    },
    {
        id: 5,
        name: "BeautyEssentials",
        category: "beauty",
        trust: 95,
        connections: 200,
        description: "Highly rated beauty products supplier."
    },
    {
        id: 6,
        name: "Sportify",
        category: "sports",
        trust: 80,
        connections: 110,
        description: "Top choice for sports equipment."
    },
    // repeated data for hackathon placeholders
    {
        id: 7,
        name: "ElectroPlus",
        category: "electronics",
        trust: 78,
        connections: 95,
        description: "Popular electronics supplier across markets."
    },
    {
        id: 8,
        name: "StyleTrend",
        category: "clothing",
        trust: 65,
        connections: 60,
        description: "Fashion supplier trusted for quality."
    },
    {
        id: 9,
        name: "FreshMart",
        category: "grocery",
        trust: 88,
        connections: 140,
        description: "Reliable grocery supplier with high ratings."
    },
    {
        id: 10,
        name: "FurniKing",
        category: "furniture",
        trust: 55,
        connections: 50,
        description: "Moderate furniture supplier reviews."
    },
    {
        id: 11,
        name: "GlowBeauty",
        category: "beauty",
        trust: 92,
        connections: 180,
        description: "Well-rated beauty supplier by retailers."
    },
    {
        id: 12,
        name: "ProSports",
        category: "sports",
        trust: 82,
        connections: 100,
        description: "Trusted by sports stores."
    },
    // add more data to reach hackathon length
];

// =================== DOM ELEMENTS ===================
const cardsContainer = document.getElementById("cardsContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const modalClose = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTrustMeter = document.getElementById("modalTrustMeter");
const modalConnectionsMeter = document.getElementById("modalConnectionsMeter");

// =================== FUNCTION TO GENERATE CARDS ===================
function generateCards(data) {
    cardsContainer.innerHTML = ""; // clear container

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", item.category);
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon">🛒</div>
                <h4>${item.name}</h4>
                <button class="view-btn" data-id="${item.id}">View</button>
            </div>
            <div class="card-body">
                <p>${item.description.substring(0, 80)}...</p>
                <div class="trust-meter">
                    <span class="meter" style="width: ${item.trust}%"></span>
                    <p>Trust Score: ${item.trust}%</p>
                </div>
                <div class="connections">
                    <span class="meter" style="width: ${item.connections / 2}%"></span>
                    <p>Connections: ${item.connections}</p>
                </div>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    // Add event listeners to all view buttons
    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", openModal);
    });
}

// =================== SEARCH FUNCTION ===================
function filterSearch() {
    const term = searchInput.value.toLowerCase();
    const filtered = trustData.filter(item => item.name.toLowerCase().includes(term));
    generateCards(filtered);
}

// =================== FILTER FUNCTION ===================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.getAttribute("data-filter");
        if(category === "all") {
            generateCards(trustData);
        } else {
            const filtered = trustData.filter(item => item.category === category);
            generateCards(filtered);
        }
    });
});

// =================== MODAL FUNCTION ===================
function openModal(e) {
    const id = parseInt(e.target.getAttribute("data-id"));
    const data = trustData.find(item => item.id === id);

    modalTitle.textContent = data.name;
    modalDesc.textContent = data.description;

    modalTrustMeter.style.width = "0";
    modalConnectionsMeter.style.width = "0";
    modal.style.display = "block";

    setTimeout(() => {
        modalTrustMeter.style.width = `${data.trust}%`;
        modalConnectionsMeter.style.width = `${data.connections / 2}%`;
    }, 50);
}

// =================== CLOSE MODAL ===================
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", e => {
    if(e.target === modal) {
        modal.style.display = "none";
    }
});

// =================== INIT ===================
generateCards(trustData);
searchInput.addEventListener("input", filterSearch);

// =================== EXTRA: DYNAMIC CATEGORY ICONS ===================
function updateIcons() {
    document.querySelectorAll(".card").forEach(card => {
        const cat = card.getAttribute("data-category");
        const iconDiv = card.querySelector(".card-icon");
        switch(cat) {
            case "electronics": iconDiv.textContent = "💻"; break;
            case "clothing": iconDiv.textContent = "👗"; break;
            case "grocery": iconDiv.textContent = "🥦"; break;
            case "furniture": iconDiv.textContent = "🛋️"; break;
            case "beauty": iconDiv.textContent = "💄"; break;
            case "sports": iconDiv.textContent = "🏀"; break;
            default: iconDiv.textContent = "🛒";
        }
    });
}

// Update icons after generating cards
document.addEventListener("DOMContentLoaded", () => updateIcons());
