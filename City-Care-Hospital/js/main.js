/* =============================================
   MediCare Hospital - Main JavaScript File
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Preloader ---- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
      }, 400);
    });
  }

  /* ---- Sticky Navbar ---- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ---- Scroll-to-Top Button ---- */
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Fade-up on Scroll (Intersection Observer) ---- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ---- Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }
  const counterEls = document.querySelectorAll('[data-target]');
  if (counterEls.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));
  }

  /* ---- Contact Form Validation ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Name
      const name = document.getElementById('contactName');
      if (!name.value.trim() || name.value.trim().length < 2) {
        name.classList.add('is-invalid'); valid = false;
      } else { name.classList.remove('is-invalid'); name.classList.add('is-valid'); }

      // Email
      const email = document.getElementById('contactEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add('is-invalid'); valid = false;
      } else { email.classList.remove('is-invalid'); email.classList.add('is-valid'); }

      // Phone (optional but validated if filled)
      const phone = document.getElementById('contactPhone');
      if (phone && phone.value.trim() && !/^\+?[\d\s\-()]{7,15}$/.test(phone.value.trim())) {
        phone.classList.add('is-invalid'); valid = false;
      } else if (phone) { phone.classList.remove('is-invalid'); }

      // Message
      const msg = document.getElementById('contactMessage');
      if (!msg.value.trim() || msg.value.trim().length < 10) {
        msg.classList.add('is-invalid'); valid = false;
      } else { msg.classList.remove('is-invalid'); msg.classList.add('is-valid'); }

      if (valid) {
        showToast('✅ Your message has been sent successfully! We\'ll get back to you shortly.', 'success');
        contactForm.reset();
        contactForm.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
      } else {
        showToast('⚠️ Please fix the errors and try again.', 'danger');
      }
    });
  }

  /* ---- Toast Notification ---- */
  window.showToast = function (message, type = 'success') {
    const existing = document.getElementById('toastContainer');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;min-width:300px;max-width:400px;';

    const toast = document.createElement('div');
    toast.style.cssText = `
      background:${type === 'success' ? '#198754' : type === 'danger' ? '#dc3545' : '#0d6efd'};
      color:#fff;padding:16px 20px;border-radius:12px;font-size:.9rem;font-weight:500;
      box-shadow:0 8px 25px rgba(0,0,0,.2);display:flex;align-items:center;gap:12px;
      animation:slideIn .3s ease;
    `;
    toast.innerHTML = `<span>${message}</span><button onclick="this.closest('#toastContainer').remove()" style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;margin-left:auto;">×</button>`;
    container.appendChild(toast);
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = '@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(style);

    setTimeout(() => { if (container.parentNode) container.remove(); }, 5000);
  };

}); // end DOMContentLoaded
