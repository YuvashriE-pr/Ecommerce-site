const cartItemsContainer = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalAmount.textContent = "";
    return;
  }

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" width="60" />
      <strong>${item.name}</strong><br/>
      ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
      <div>
        <button onclick="updateQuantity(${index}, -1)">−</button>
        <button onclick="updateQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
      <hr />
    `;
    cartItemsContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalAmount.textContent = `Total: ₹${total}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function clearCart() {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

renderCart();
