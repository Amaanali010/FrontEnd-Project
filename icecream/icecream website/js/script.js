// ========================================
// ICE CREAM PARADISE - FINAL POLISHED SCRIPT
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Products Data
const products = [
  { id: 1, name: "Chocolate Shake", price: 300, category: "Shakes", image: "images/chocolate-shake.png", tag: "best" },
  { id: 2, name: "Chocolate Scoop", price: 200, category: "Scoops", image: "images/chocolate scoop.png" },
  { id: 3, name: "Strawberry Sundae", price: 350, category: "Sundaes", image: "images/strawberry_sundae-.png" },
  { id: 4, name: "Cookies & Cream", price: 250, category: "Scoops", image: "images/cookie and cream scoop.png", tag: "new" },
  { id: 5, name: "Chocolate Fudge Sundae", price: 380, category: "Sundaes", image: "images/chocolate sundae.png" },
  { id: 6, name: "Strawberry Milkshake", price: 320, category: "Shakes", image: "images/strawberry milkshake.png" },
  { id: 7, name: "Mint Chocolate Chip", price: 260, category: "Scoops", image: "images/mint chocolate scoop.png" },
  { id: 8, name: "Brownie Blast Sundae", price: 400, category: "Sundaes", image: "images/browniie sundae.png", tag: "best" },
  { id: 9, name: "Oreo Shake", price: 340, category: "Shakes", image: "images/oreo milkshake.png" },
  { id: 10, name: "Mango Shake", price: 310, category: "Shakes", image: "images/mango milkshake.png", tag: "new" }
];

// Update Cart Count
function updateCartCount() {
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll("#cartCount").forEach(badge => {
    badge.textContent = totalQty;
  });
}

// Add to Cart with Fly Animation
function addToCart(name, price, event) {
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  if (event) flyToCart(event);
  showToast(`${name} added to cart! 🍦`);
}

// Fly to Cart Animation
function flyToCart(event) {
  const img = event.target.closest(".product-card, .popular-card")?.querySelector("img");
  if (!img) return;

  const clone = img.cloneNode(true);
  document.body.appendChild(clone);

  const rect = img.getBoundingClientRect();
  const cartIcon = document.getElementById("cartCount")?.getBoundingClientRect();

  clone.style.position = "fixed";
  clone.style.left = `${rect.left}px`;
  clone.style.top = `${rect.top}px`;
  clone.style.width = "80px";
  clone.style.height = "80px";
  clone.style.zIndex = "9999";
  clone.style.transition = "all 0.9s cubic-bezier(0.4, 0, 0.2, 1)";
  clone.style.pointerEvents = "none";

  setTimeout(() => {
    if (cartIcon) {
      clone.style.left = `${cartIcon.left + 10}px`;
      clone.style.top = `${cartIcon.top - 10}px`;
      clone.style.transform = "scale(0.2)";
      clone.style.opacity = "0";
    }
  }, 50);

  setTimeout(() => clone.remove(), 1000);
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement("div");
  toast.style.cssText = `position:fixed; bottom:20px; left:50%; transform:translateX(-50%);
    background:#ff6bcb; color:white; padding:12px 24px; border-radius:50px;
    box-shadow:0 10px 30px rgba(255,107,203,0.4); z-index:99999; font-weight:500;`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "all 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 1800);
}

// Render Cart
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-center py-5 text-muted">Your cart is empty 🍦<br><a href="products.html" class="text-pink">Browse Menu</a></p>`;
    if (totalPriceEl) totalPriceEl.innerHTML = "Rs 0";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item d-flex align-items-center">
        <div class="me-3">
          <strong>${item.name}</strong><br>
          <small class="text-muted">Rs ${item.price}</small>
        </div>
        <div class="ms-auto d-flex align-items-center gap-3">
          <div class="d-flex align-items-center">
            <button class="quantity-btn" onclick="changeQty(${index}, -1)">−</button>
            <span class="mx-3 fw-bold">${item.qty}</span>
            <button class="quantity-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  });

  if (totalPriceEl) totalPriceEl.innerHTML = `Rs ${total}`;
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Checkout with Printable Receipt
function checkout() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const payment = document.getElementById("payment")?.value || "Cash on Delivery";

  if (!name || !phone || !address) {
    alert("⚠️ Please fill in all delivery details!");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const loading = document.createElement("div");
  loading.innerHTML = `<div style="position:fixed;inset:0;background:rgba(255,255,255,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <div style="font-size:70px;margin-bottom:20px;">🍦</div>
      <h3>Preparing your sweet order...</h3>
    </div>`;
  document.body.appendChild(loading);

  setTimeout(() => {
    loading.remove();
    showPrintableReceipt(name, phone, address, payment, total);
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCart();
  }, 1800);
}

function showPrintableReceipt(name, phone, address, payment, total) {
  let itemsHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;margin:8px 0;">
      <span>${item.name} ×${item.qty}</span>
      <span>Rs ${item.price * item.qty}</span>
    </div>
  `).join("");

  const receiptHTML = `
    <div style="text-align:center;margin-bottom:15px;">
      <h3 style="color:#ff6bcb;">Order Receipt</h3>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
    </div>
    <div style="border-top:2px dashed #ddd; padding-top:15px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Payment:</strong> ${payment}</p>
    </div>
    <div style="margin:20px 0;">
      <strong>Items:</strong><br>${itemsHTML}
    </div>
    <div style="font-size:1.35rem;font-weight:700;color:#ff6bcb;border-top:3px dashed #ddd;padding-top:15px;">
      Total: Rs ${total}
    </div>
    <div style="text-align:center;margin-top:25px;color:#666;">
      Thank you for your order! 💖<br>Ice Cream Paradise - Karachi
    </div>
  `;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("receiptContainer").style.display = "flex";
}

function printReceipt() {
  window.print();
}

function closeReceipt() {
  document.getElementById("receiptContainer").style.display = "none";
}

// Fridge Transition
function startTransition(event) {
  event.preventDefault();
  const link = event.currentTarget.getAttribute("href");
  const transition = document.getElementById("pageTransition");

  if (!transition) {
    window.location.href = link;
    return;
  }

  transition.style.display = "block";
  setTimeout(() => transition.classList.add("active"), 50);
  setTimeout(() => window.location.href = link, 1300);
}

// Display Featured Products (Home Page - 2 items)
function displayFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;

  const popularItems = [products[0], products[7]]; // Chocolate Shake + Brownie Blast Sundae

  container.innerHTML = "";

  popularItems.forEach(product => {
    container.innerHTML += `
      <div class="col-6 col-md-4 col-lg-3">
        <div class="popular-card">
          <div class="img-wrap">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.png'">
          </div>
          <div class="p-3">
            <h6>${product.name}</h6>
            <p class="text-pink fw-bold mb-2">Rs ${product.price}</p>
            <button class="btn btn-sm btn-custom w-100" onclick="addToCart('${product.name}', ${product.price}, event)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// Display Products Page
function displayProducts(filter = "All") {
  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "";

  let filtered = filter === "All" ? products : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="text-center py-5">No products found 😢</p>`;
    return;
  }

  filtered.forEach(product => {
    productList.innerHTML += `
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="product-card">
          <div class="img-wrap">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.png'">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="price fw-bold">Rs ${product.price}</p>
            <button class="btn btn-add mt-3" onclick="addToCart('${product.name}', ${product.price}, event)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function filterProducts(category, btn) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  displayProducts(category);
}

function searchProducts() {
  const term = document.getElementById("searchInput").value.toLowerCase().trim();
  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "";

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term)
  );

  if (filtered.length === 0) {
    productList.innerHTML = `<p class="text-center py-5">No matching flavors found 😢</p>`;
    return;
  }

  filtered.forEach(product => {
    productList.innerHTML += `
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="product-card">
          <div class="img-wrap">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.png'">
          </div>
          <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="price fw-bold">Rs ${product.price}</p>
            <button class="btn btn-add mt-3" onclick="addToCart('${product.name}', ${product.price}, event)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  if (document.getElementById("featuredProducts")) displayFeaturedProducts();
  if (document.getElementById("productList")) displayProducts("All");
  if (document.getElementById("cartItems")) renderCart();

  // Attach transition
  document.querySelectorAll('a[href^="index.html"], a[href^="products.html"], a[href^="cart.html"]').forEach(link => {
    link.addEventListener("click", startTransition);
  });
});

// Global functions
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.checkout = checkout;
window.filterProducts = filterProducts;
window.searchProducts = searchProducts;
window.startTransition = startTransition;
window.printReceipt = printReceipt;
window.closeReceipt = closeReceipt;

// Checkout Function
function checkout() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value || "Cash on Delivery";

  if (!name || !phone || !address) {
    alert("⚠️ Please fill in all delivery details!");
    return;
  }
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Simple loading
  const loading = document.createElement("div");
  loading.style.cssText = "position:fixed;inset:0;background:rgba(255,255,255,0.95);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;";
  loading.innerHTML = `<div style="font-size:70px;margin-bottom:20px;">🍦</div><h3>Preparing your order...</h3>`;
  document.body.appendChild(loading);

  setTimeout(() => {
    loading.remove();
    showPrintableReceipt(name, phone, address, payment, total);

    // Clear cart
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    renderCart();
  }, 1600);
}

// Show Receipt
function showPrintableReceipt(name, phone, address, payment, total) {
  let itemsHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;margin:8px 0;">
      <span>${item.name} ×${item.qty}</span>
      <span>Rs ${item.price * item.qty}</span>
    </div>
  `).join("");

  const receiptHTML = `
    <div style="text-align:center;margin-bottom:15px;">
      <h3 style="color:#ff6bcb;">Order Receipt</h3>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-PK')}</p>
    </div>
    <div style="border-top:2px dashed #ddd; padding-top:15px;">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Payment:</strong> ${payment}</p>
    </div>
    <div style="margin:20px 0;">
      <strong>Items:</strong><br>
      ${itemsHTML}
    </div>
    <div style="font-size:1.35rem;font-weight:700;color:#ff6bcb;border-top:3px dashed #ddd;padding-top:15px;">
      Total: Rs ${total}
    </div>
    <div style="text-align:center;margin-top:25px;color:#666;">
      Thank you for your order! 💖<br>Ice Cream Paradise - Karachi
    </div>
  `;

  document.getElementById("receiptBody").innerHTML = receiptHTML;
  document.getElementById("receiptContainer").style.display = "flex";
}

function printReceipt() {
  window.print();
}

function closeReceipt() {
  document.getElementById("receiptContainer").style.display = "none";
}