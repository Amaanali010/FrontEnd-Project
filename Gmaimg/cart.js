/* ============================================================
   NEXUS GAMES — cart.js
   LocalStorage cart system + UI helpers
   ============================================================ */

/* ---- Data ---- */
const PRODUCTS = [
  { id: 1,  title: "Cyber Odyssey 2077",  genre: "Action RPG",   price: 59.99, oldPrice: 79.99, rating: 4.8, badge: "sale", platform: ["PC","PS5"],     img: "images/1.jfif" },
  { id: 2,  title: "Stellar Drift",        genre: "Space Sim",    price: 39.99, oldPrice: null,  rating: 4.5, badge: "new",  platform: ["PC","Xbox"],    img: "images/2.jfif" },
  { id: 3,  title: "Voidborn Legends",     genre: "MMORPG",       price: 49.99, oldPrice: null,  rating: 4.7, badge: "",     platform: ["PC"],           img: "images/3.jfif" },
  { id: 4,  title: "Neon Racer X",         genre: "Racing",       price: 29.99, oldPrice: 44.99, rating: 4.3, badge: "sale", platform: ["PC","PS5","Xbox"],img:"images/4.jfif" },
  { id: 5,  title: "Shadow Protocol",      genre: "Stealth FPS",  price: 54.99, oldPrice: null,  rating: 4.6, badge: "",     platform: ["PC","PS5"],     img: "images/5.jfif" },
  { id: 6,  title: "Dragon Abyss",         genre: "Fantasy RPG",  price: 44.99, oldPrice: 59.99, rating: 4.9, badge: "sale", platform: ["PS5","Xbox"],   img: "images/6.jfif" },
  { id: 7,  title: "Iron Dominion",        genre: "Strategy",     price: 34.99, oldPrice: null,  rating: 4.4, badge: "",     platform: ["PC"],           img: "images/iron.jpg" },
  { id: 8,  title: "Phantom Arena",        genre: "Battle Royale", price: 0,    oldPrice: null,  rating: 4.2, badge: "new",  platform: ["PC","PS5","Xbox"],img:"images/7.jfif" },
  { id: 9,  title: "Aurora Breach",        genre: "Sci-Fi FPS",   price: 49.99, oldPrice: null,  rating: 4.5, badge: "new",  platform: ["PC","Xbox"],    img: "images/8.jfif" },
  { id: 10, title: "Pro Controller Elite"
  { id: 11, title: "HyperX Headset Pro",   genre: "Accessory",    price: 129.99,oldPrice: null,  rating: 4.8, badge: "",     platform: [],               img: "images/orago, genre: "Accessory",    price: 89.99, oldPrice: 109.99,rating: 4.7, badge: "sale", platform: [],               img: "images/racer x.jfif" },n abyss.jfif" },
  { id: 12, title: "Mech Keyboard RGB",    genre: "Accessory",    price: 149.99,oldPrice: 179.99,rating: 4.6, badge: "sale", platform: [],               img: "images/mech keyboard.jfif" },
];

/* ---- Cart helpers ---- */
function getCart() {
  return JSON.parse(localStorage.getItem('nexus_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('nexus_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  showToast(`${product.title}`, 'Added to cart!');
}
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}
function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.qty = Math.max(1, qty);
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

/* ---- UI ---- */
function updateCartBadge() {
  document.querySelectorAll('.cart-count').forEach(el => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? '' : 'none';
  });
}

function showToast(title, msg) {
  document.querySelectorAll('.nexus-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'nexus-toast';
  toast.innerHTML = `
    <div class="toast-icon">🎮</div>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ---- Navbar scroll effect ---- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nexus-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Navbar active link ---- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nexus-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  // Spawn particles on hero
  spawnParticles();
});

/* ---- Particles ---- */
function spawnParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 8}s;
      background: ${Math.random() > 0.5 ? 'var(--blue)' : 'var(--purple)'};
    `;
    container.appendChild(p);
  }
}

/* ---- Card builder helper ---- */
function buildGameCard(product) {
  const free = product.price === 0;
  const priceStr = free ? 'FREE' : `$${product.price.toFixed(2)}`;
  const oldStr = product.oldPrice ? `<span class="original">$${product.oldPrice.toFixed(2)}</span>` : '';
  const badgeHtml = product.badge
    ? `<span class="game-card-badge ${product.badge}">${product.badge.toUpperCase()}</span>`
    : '';
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
  return `
    <div class="game-card" onclick="location.href='product.html?id=${product.id}'">
      <div class="game-card-img">
        <img src="${product.img}" alt="${product.title}" loading="lazy">
        ${badgeHtml}
      </div>
      <div class="game-card-body">
        <div class="game-card-genre">${product.genre}</div>
        <div class="game-card-title">${product.title}</div>
        <div class="game-card-rating">${stars} <span style="color:var(--text-muted);font-size:0.7rem;">${product.rating}</span></div>
        <div class="game-card-meta">
          <div class="game-card-price">${priceStr}${oldStr}</div>
          <button class="btn-cart-sm" onclick="event.stopPropagation(); handleAddToCart(this, ${product.id})">
            <i class="bi bi-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </div>`;
}

function handleAddToCart(btn, id) {
  addToCart(id);
  btn.classList.add('added');
  btn.innerHTML = '<i class="bi bi-check-lg"></i> Added';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = '<i class="bi bi-cart-plus"></i> Add';
  }, 2000);
}
