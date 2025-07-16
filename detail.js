console.log("Detail page JS loaded");

const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if (selectedProduct) {
  document.getElementById("detail-image").src = selectedProduct.image;
  document.getElementById("detail-name").textContent = selectedProduct.name;
  document.getElementById("detail-price").textContent = "₹" + selectedProduct.price;
  document.getElementById("detail-description").textContent =
    selectedProduct.description || "No description available.";
} else {
  document.body.innerHTML = "<p style='padding:20px;'>⚠️ No product data found. Please go back and select a product.</p>";
}
