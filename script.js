// 1. DOM SELECTORS
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('searchInput');
const priceFilter = document.getElementById('priceFilter');
const categoriesSection = document.getElementById('categories');

// 2. CATEGORY BUTTONS SETUP
const categories = ["all", ...new Set(products.map(p => p.category))];
categories.forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat.toUpperCase();
  btn.onclick = () => displayProducts(cat);
  categoriesSection.appendChild(btn);
});

// 3. EVENT LISTENERS
searchInput.addEventListener('input', () => displayProducts());
priceFilter.addEventListener('change', () => displayProducts());

// 4. DISPLAY FUNCTION
function displayProducts(category = "all") {
  const searchQuery = searchInput.value.toLowerCase();
  const selectedPrice = priceFilter.value;

  let filtered = products.filter(p => {
    const matchCategory = category === "all" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(searchQuery);

    let matchPrice = true;
    if (selectedPrice === "0-1000") matchPrice = p.price <= 1000;
    else if (selectedPrice === "1001-5000") matchPrice = p.price > 1000 && p.price <= 5000;
    else if (selectedPrice === "5001") matchPrice = p.price > 5000;

    return matchCategory && matchSearch && matchPrice;
  });

  productList.innerHTML = "";
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" width="100" />
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button class="add-to-cart-btn">Add to Cart</button>
    `;

    const addToCartBtn = card.querySelector(".add-to-cart-btn");
    addToCartBtn.onclick = (e) => {
      e.stopPropagation();
      addToCart(p);
    };

    card.onclick = () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.href = "product.html";
    };

    productList.appendChild(card);
  });
}

// 5. ADD TO CART FUNCTION
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showToast(`${product.name} added to cart!`);
}

// 6. TOAST FUNCTION
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#28a745";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "5px";
  toast.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  toast.style.zIndex = "1000";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s";

  document.body.appendChild(toast);
  requestAnimationFrame(() => (toast.style.opacity = "1"));

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2000);
}

// 7. INITIAL LOAD
displayProducts();
