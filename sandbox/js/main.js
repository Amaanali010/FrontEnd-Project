/* =========================================
   Smart School Canteen – Main JavaScript
   ========================================= */

'use strict';

// =============================================
// ORDER ITEMS DATA
// =============================================
const orderItems = [
  {
    id: 'granola-bar',
    name: 'Granola Bar',
    emoji: '🌾',
    price: 30,
    category: 'Snacks',
    img: 'https://sspark.genspark.ai/cfimages?u1=CVEWBsjsI%2BeX3V7DC1CYQj8jqtlSogS6DU1TIXwAbLatfllZh67HY3vl8Ns3Vs6zPkiJHhzmZeRIDXBZlOQC%2B1Jynd6RkWb3sxNPWStVNv0qNyl02MJ6LHZ9A2PRlGI%3D&u2=3D9aD4VeD3gBrXX7&width=2560'
  },
  {
    id: 'fruit-salad',
    name: 'Fruit Salad Cup',
    emoji: '🍓',
    price: 45,
    category: 'Snacks',
    img: 'https://sspark.genspark.ai/cfimages?u1=nq3sEbEvrU4wnCw3rZCVQcdMGBGt7utng1KvB1xPJl0jrCHJPenlI%2BpQSWN%2BmtQUeljIxUQ42sd3L9FUUqXwlnNschrnyaffQGwVVzc%2BPw5fIaxsYVU5FfM%2F0hYMRbZ86mcsG169pHECzGG07U3Bvn8%3D&u2=H9bASmMmJh%2FoEy5J&width=2560'
  },
  {
    id: 'orange-smoothie',
    name: 'Orange Smoothie',
    emoji: '🍊',
    price: 35,
    category: 'Drinks',
    img: 'https://sspark.genspark.ai/cfimages?u1=IEjivSpNgNrNQm6pPNK92UbUPNHqYdLwrF1QTiACb7wW56ZiVF5XcY1230YfnzggqxfVIcv9hDscVJcf8ItSP5OrmfUmxxGznWgRbYqsi%2BAbkCqytfsBEtTM1%2F5dOf8xdLoR6oxGVTvvVg%3D%3D&u2=9E02Ktkg89pvNgcR&width=2560'
  },
  {
    id: 'veggie-wrap',
    name: 'Veggie Wrap',
    emoji: '🌯',
    price: 55,
    category: 'Lunch',
    img: 'https://sspark.genspark.ai/cfimages?u1=2q%2FHouqeUfRqYpTb450miqVGJd947ZdtoNEKFE0Yrr8195CFddzp0ecRRIHkGKHe9tTjGg0cQKxdA4LGRN6vSELL3MhEtqI1zZFOFPKqQ4aAEutXeY0T4IAy8okF&u2=YDwQ82Z4zaxiyYxz&width=2560'
  },
  {
    id: 'rice-bowl',
    name: 'Teriyaki Rice Bowl',
    emoji: '🍱',
    price: 75,
    category: 'Lunch',
    img: 'https://sspark.genspark.ai/cfimages?u1=KPbcy53wOLpsz%2BYb3y6QEjJu%2Fku9qGMP2bihdSLsIU49VcroH%2FALwGbWi63z7N9e44A0NKu9WcZPVrddne6dontFVdJcCoYJ%2B7TLLm07JvLniKF2thSmhLnVoKdhDhLFXs01FK8S7F0%3D&u2=Ng7Lb6QGa%2B%2F6Beab&width=2560'
  },
  {
    id: 'chicken-bowl',
    name: 'Chicken Rice Bowl',
    emoji: '🍗',
    price: 85,
    category: 'Lunch',
    img: 'https://sspark.genspark.ai/cfimages?u1=XPyK%2FyV%2BHdCaDnrBZVbSVSSAZ1QH8MjA23UNxqov55vPTbPDhkzFsIcFfq1HRkz6tsYafhVKncZ%2B%2FBpOX99rEduyFNKa202HBpIgZSOdH4OPm5IW8knavTppzNDNp5Ga5VVAgvxFrSGeTK1OSzPw&u2=fcNXgQEw6KtGWNVp&width=2560'
  },
  {
    id: 'green-smoothie',
    name: 'Green Smoothie',
    emoji: '🌿',
    price: 40,
    category: 'Drinks',
    img: 'https://sspark.genspark.ai/cfimages?u1=6Tj%2FdqiyLeGXAlqGFJHdBCbngXq4z6m%2BEwk3IWYHfWnFT1Lt4OICrqO%2BPgishOprkvVfKiJaBvi3Y4L%2FWNqdaZR6xW7oiuxjfQAMEWBeRUbQYav3wvGwS7ImDRAok83j5O5N&u2=mR6ou2315wr%2Bjc3L&width=2560'
  },
  {
    id: 'student-combo',
    name: 'Student Combo A',
    emoji: '🌟',
    price: 110,
    category: 'Special Deals',
    img: 'https://sspark.genspark.ai/cfimages?u1=hH4DapU%2BocoAQuv7QuNdfJaRlyneMcRqOZVR0n9vk4oWOfu5hEPlxxfSsKXNLn6zK8xpYwNlVr%2BcJBzb%2BhZ1gwfylNw9OOBYzL%2BwZRu2G%2B74GhYeXolcKeJKjXohBJZRR3zfaY3vWt1nUf2SXdyqEHIN8qJfzzlxpXH1IpITHPCmhG8lFCx%2BoIFuK86ofK59R0t8ukPX%2B18%3D&u2=75UoOiPnm32XftzI&width=2560'
  },
  {
    id: 'scholars-pack',
    name: "Scholar's Pack",
    emoji: '🎒',
    price: 125,
    category: 'Special Deals',
    img: 'https://sspark.genspark.ai/cfimages?u1=G%2BFM2%2FB0p%2F4k8DU7NF9mwK3fn1J8YGkgkzuFy6ywHr2a0VjWy1F36ug5r9xkxdwqNW63wOh3hkVcShNcCKG3t8CRJIUteHVZ3kNp7rEw1kHrTIQPc51AbYMmsXjTtREle5zPielm%2FNf%2FYO2ePhMk9i%2B%2FE%2BCl%2FcSHSkiHh4UFUgpD%2B2w%3D&u2=Tag5q%2FZrb0X%2FWx3G&width=2560'
  },
  {
    id: 'buddy-deal',
    name: 'Buddy Meal Deal',
    emoji: '👫',
    price: 140,
    category: 'Special Deals',
    img: 'https://sspark.genspark.ai/cfimages?u1=o1CDDahwwwi2lhkVbpJUjV80zZG685fLR%2FkP5oA6byMZBjGch9Scf15NMlRnVn95Mv9d%2BySJLdCg4rHfB0d9SrkMgQU%2B53BAeI%2F7xZeqv4MPV3vZa%2FFoAzYTE6cxF9oVcmNA%2BzV4XLqO9XAAQn5PEjxqT%2FAvyMMLeOtZA7DlrPYK6Ri%2FwmI%3D&u2=OKAtlqjO0DoGxrpu&width=2560'
  }
];

// State: map of itemId -> quantity
const selectedItems = {};

// =============================================
// RENDER ORDER ITEMS GRID
// =============================================
function renderOrderItems() {
  const grid = document.getElementById('orderItemsGrid');
  if (!grid) return;

  grid.innerHTML = orderItems.map(item => `
    <div
      class="order-item-card ${selectedItems[item.id] ? 'selected' : ''}"
      id="order-card-${item.id}"
      onclick="toggleItemSelection('${item.id}')"
    >
      <img class="order-item-img" src="${item.img}" alt="${item.name}" loading="lazy" />
      <div class="order-item-info">
        <h4>${item.emoji} ${item.name}</h4>
        <p>${item.category}</p>
        <span class="order-item-price">₹${item.price}</span>
        ${selectedItems[item.id] ? `
        <div class="order-qty-control" onclick="event.stopPropagation()">
          <button class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button>
          <span class="qty-display" id="qty-${item.id}">${selectedItems[item.id]}</span>
          <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
        </div>` : ''}
      </div>
    </div>
  `).join('');
}

// =============================================
// TOGGLE ITEM SELECTION
// =============================================
function toggleItemSelection(itemId) {
  if (selectedItems[itemId]) {
    delete selectedItems[itemId];
  } else {
    selectedItems[itemId] = 1;
  }
  renderOrderItems();
  updateOrderSummary();
}

// =============================================
// CHANGE QUANTITY
// =============================================
function changeQty(itemId, delta) {
  if (!selectedItems[itemId]) return;
  selectedItems[itemId] += delta;
  if (selectedItems[itemId] <= 0) {
    delete selectedItems[itemId];
  }
  renderOrderItems();
  updateOrderSummary();
}

// =============================================
// UPDATE ORDER SUMMARY (REAL-TIME CALCULATION)
// =============================================
function updateOrderSummary() {
  const summaryList   = document.getElementById('summaryList');
  const summaryEmpty  = document.getElementById('summaryEmpty');
  const subtotalEl    = document.getElementById('summarySubtotal');
  const serviceEl     = document.getElementById('summaryService');
  const totalEl       = document.getElementById('summaryTotal');

  const selectedIds = Object.keys(selectedItems);

  if (selectedIds.length === 0) {
    summaryList.innerHTML = '<div class="summary-empty" id="summaryEmpty">No items selected yet. Pick your favourites!</div>';
    subtotalEl.textContent = '₹0';
    serviceEl.textContent  = '₹0';
    totalEl.textContent    = '₹0';
    return;
  }

  let subtotal = 0;
  let summaryHTML = '';

  selectedIds.forEach(id => {
    const item = orderItems.find(i => i.id === id);
    if (!item) return;
    const qty = selectedItems[id];
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    summaryHTML += `
      <div class="summary-item">
        <span class="summary-item-name">${item.emoji} ${item.name} × ${qty}</span>
        <span class="summary-item-price">₹${lineTotal}</span>
      </div>`;
  });

  const service = Math.round(subtotal * 0.05);
  const total   = subtotal + service;

  summaryList.innerHTML = summaryHTML;
  subtotalEl.textContent = `₹${subtotal}`;
  serviceEl.textContent  = `₹${service}`;
  totalEl.textContent    = `₹${total}`;
}

// =============================================
// PLACE ORDER
// =============================================
function placeOrder() {
  const name  = document.getElementById('studentName').value.trim();
  const grade = document.getElementById('studentGrade').value;
  const roll  = document.getElementById('rollNumber').value.trim();
  const time  = document.getElementById('pickupTime').value;

  // Validate items
  if (Object.keys(selectedItems).length === 0) {
    showToast('⚠️ Please select at least one item before placing your order!', 'warning');
    return;
  }

  // Validate student fields
  if (!name) {
    showToast('⚠️ Please enter your Student Name.', 'warning');
    document.getElementById('studentName').focus();
    return;
  }
  if (!grade) {
    showToast('⚠️ Please select your Grade / Class.', 'warning');
    document.getElementById('studentGrade').focus();
    return;
  }
  if (!roll) {
    showToast('⚠️ Please enter your Roll Number.', 'warning');
    document.getElementById('rollNumber').focus();
    return;
  }

  // Build summary
  let subtotal = 0;
  let itemsSummaryHTML = '';
  let itemsSummaryText = '';

  Object.keys(selectedItems).forEach(id => {
    const item = orderItems.find(i => i.id === id);
    const qty  = selectedItems[id];
    const line = item.price * qty;
    subtotal += line;
    itemsSummaryHTML += `
      <div class="detail-row">
        <span>${item.emoji} ${item.name} × ${qty}</span>
        <span>₹${line}</span>
      </div>`;
    itemsSummaryText += `${item.name} × ${qty} — ₹${line}\n`;
  });

  const service = Math.round(subtotal * 0.05);
  const total   = subtotal + service;

  // Generate order number
  const orderNum = 'SC' + Date.now().toString().slice(-6);

  // Populate Modal
  const detailsEl = document.getElementById('modalOrderDetails');
  detailsEl.innerHTML = `
    <div class="detail-row">
      <span>📋 Order No.</span>
      <span>#${orderNum}</span>
    </div>
    <div class="detail-row">
      <span>👤 Student</span>
      <span>${name}</span>
    </div>
    <div class="detail-row">
      <span>📚 Grade</span>
      <span>${grade}</span>
    </div>
    <div class="detail-row">
      <span>🔢 Roll No.</span>
      <span>${roll}</span>
    </div>
    ${time ? `<div class="detail-row"><span>⏰ Pickup</span><span>${time}</span></div>` : ''}
    <hr style="border:none;border-top:1px dashed #ddd;margin:8px 0;">
    ${itemsSummaryHTML}
    <div class="detail-row">
      <span>🔧 Service Charge</span>
      <span>₹${service}</span>
    </div>`;

  document.getElementById('modalTotalRow').innerHTML = `
    <span>💰 Total Amount</span>
    <span>₹${total}</span>`;

  // Show modal
  document.getElementById('orderModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// =============================================
// CLOSE ORDER MODAL + RESET
// =============================================
function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
  document.body.style.overflow = '';

  // Reset all selections
  Object.keys(selectedItems).forEach(k => delete selectedItems[k]);
  document.getElementById('studentName').value = '';
  document.getElementById('studentGrade').value = '';
  document.getElementById('rollNumber').value = '';
  document.getElementById('pickupTime').value = '';

  renderOrderItems();
  updateOrderSummary();
}

// =============================================
// SCROLL TO ORDER
// =============================================
function scrollToOrder() {
  document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function showToast(message, type = 'info') {
  // Remove existing toast
  const existing = document.getElementById('smartToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'smartToast';
  const bgColor = type === 'warning' ? '#f58b1f' : '#2d5a27';
  toast.style.cssText = `
    position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
    background:${bgColor}; color:#fff; padding:12px 24px; border-radius:40px;
    font-size:0.88rem; font-weight:600; font-family:Poppins,sans-serif;
    box-shadow:0 6px 24px rgba(0,0,0,0.2); z-index:99999;
    animation:toastIn 0.3s ease; white-space:nowrap;
    max-width:90vw; text-align:center;
  `;
  toast.innerHTML = message;

  // Inject keyframes if not present
  if (!document.getElementById('toastStyle')) {
    const s = document.createElement('style');
    s.id = 'toastStyle';
    s.textContent = `@keyframes toastIn{from{opacity:0;transform:translate(-50%,20px)}to{opacity:1;transform:translate(-50%,0)}}`;
    document.head.appendChild(s);
  }

  document.body.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 3500);
}

// =============================================
// NAVIGATION
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-open');
  hamburger.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-open');
    hamburger.classList.remove('open');
  });
});

// =============================================
// ACTIVE NAV LINK ON SCROLL
// =============================================
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchs = document.querySelectorAll('.nav-links a[href^="#"]');

const setActiveNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navAnchs.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
};

// =============================================
// HEADER SCROLL EFFECT
// =============================================
const header = document.getElementById('header');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  // Header shadow
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }

  // Active nav
  setActiveNav();

  // Reveal animations
  revealOnScroll();
});

// =============================================
// BACK TO TOP
// =============================================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================================
// REVEAL ANIMATIONS ON SCROLL
// =============================================
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  reveals.forEach(el => {
    const top    = el.getBoundingClientRect().top;
    const window_h = window.innerHeight || document.documentElement.clientHeight;
    if (top < window_h - 80) {
      el.classList.add('visible');
    }
  });
}

// =============================================
// MENU TABS
// =============================================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Switch panels
    document.querySelectorAll('.menu-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const targetPanel = document.getElementById('tab-' + tab);
    if (targetPanel) {
      targetPanel.classList.add('active');
      // Re-trigger reveal for newly visible cards
      setTimeout(revealOnScroll, 50);
    }
  });
});

// =============================================
// GALLERY FILTER
// =============================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.gallery-item').forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.4s ease'; }, 10);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// =============================================
// CONTACT FORM
// =============================================
function submitContactForm(e) {
  e.preventDefault();
  const successEl = document.getElementById('contactSuccess');
  const form      = document.getElementById('contactForm');
  const btn       = form.querySelector('button[type="submit"]');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    successEl.classList.add('show');
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    form.reset();

    setTimeout(() => {
      successEl.classList.remove('show');
    }, 5000);
  }, 1200);
}

// =============================================
// HERO PARTICLES
// =============================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const emojis = ['🍎', '🥦', '🍊', '🥗', '🌿', '🍓', '🥕', '🍋', '🌱', '🫐'];
  const count  = 12;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.textContent = emojis[i % emojis.length];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 6}s;
      font-size: ${1 + Math.random() * 1.2}rem;
    `;
    container.appendChild(p);
  }
}

// =============================================
// NUMBER COUNTER ANIMATION (Hero Stats)
// =============================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''), 10);
    const suffix = counter.textContent.replace(/[\d]/g, '');
    let current  = 0;
    const step   = Math.max(1, Math.floor(target / 50));
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current + suffix;
    }, 30);
  });
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// =============================================
// CLOSE MODAL ON OVERLAY CLICK
// =============================================
document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === this) closeOrderModal();
});

// Close modal with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('orderModal');
    if (modal.classList.contains('active')) closeOrderModal();
  }
});

// =============================================
// OBSERVE HERO SECTION FOR COUNTER ANIMATION
// =============================================
let countersAnimated = false;
const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersAnimated) {
      countersAnimated = true;
      setTimeout(animateCounters, 400);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// =============================================
// HOVER EFFECT ON MENU ADD-TO-ORDER BUTTONS
// =============================================
document.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-order-btn')) {
    showToast('👉 Scroll down to the Order section to add this item!', 'info');
  }
});

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  // Render order items
  renderOrderItems();

  // Create hero particles
  createParticles();

  // Initial reveal check
  revealOnScroll();

  // Trigger reveal on load
  setTimeout(revealOnScroll, 100);

  // Add smooth image loading fallback
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.style.background = 'linear-gradient(135deg, #e8f5e3, #c8e6c2)';
      this.style.minHeight = '160px';
    });
  });

  console.log('%c🍎 Smart School Canteen loaded!', 'color:#2d5a27;font-size:14px;font-weight:bold;');
});
