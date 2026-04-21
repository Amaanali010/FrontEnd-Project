// eduverse/script.js (unchanged - perfect)
document.addEventListener('DOMContentLoaded', function() {
  
  // Active page highlight
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.style.borderColor = '#ff3eb5';
      link.style.boxShadow = '0 0 15px #ff3eb5, 0 0 30px #ff99cc';
      link.style.background = 'rgba(255, 62, 181, 0.2)';
    }
  });

  // Working registration form
  const regForm = document.getElementById('registrationForm');
  if (regForm) {
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const course = document.getElementById('courseSelect')?.value;
      const feedback = document.getElementById('formFeedback');

      if (!name || !email) {
        feedback.innerHTML = '⚠️ Please fill all required fields.';
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        feedback.innerHTML = '⚠️ Enter a valid email address.';
        return;
      }

      const firstName = name.split(' ')[0];
      feedback.innerHTML = `✅ Thank you, ${firstName}! Your registration for ${course} has been received. A confirmation email has been sent to ${email}. (Demo)`;
      
      regForm.reset();
    });
  }

  console.log('EDUVERSE · Professional CV photos & descriptions active');
});