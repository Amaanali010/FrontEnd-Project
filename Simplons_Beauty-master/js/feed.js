// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Animate FAQ items sequentially
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.animation = `fadeIn 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards`;
      }, 300 + (index * 100));
    });
    
    // Pulse animation for CTA
    setInterval(() => {
      document.querySelector('.submit-btn').style.animation = 'pulse 2s infinite';
    }, 5000);
  });

  // FAQ toggle with enhanced animation
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains("active");
      
      // Close all other items
      document.querySelectorAll(".faq-item").forEach(item => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });
      
      // Toggle current item
      faqItem.classList.toggle("active", !isActive);
      
      // Add slight bounce effect
      if (!isActive) {
        faqItem.style.transform = 'scale(1.02)';
        setTimeout(() => {
          faqItem.style.transform = 'scale(1)';
        }, 300);
      }
    });
  });

  // Fixed Star Rating System
  const stars = document.querySelectorAll(".star");
  const starContainer = document.getElementById("starRating");
  let currentRating = 0;
  let hoverRating = 0;

  stars.forEach(star => {
    // Click to select rating
    star.addEventListener("click", (e) => {
      e.preventDefault();
      currentRating = parseInt(star.getAttribute("data-value"));
      updateStars();
    });

    // Mouseover for hover effect
    star.addEventListener("mouseover", () => {
      hoverRating = parseInt(star.getAttribute("data-value"));
      updateStars();
    });

    // Mouseleave to revert to selected rating
    star.addEventListener("mouseleave", () => {
      hoverRating = 0;
      updateStars();
    });
  });

  // Update star display based on current state
  function updateStars() {
    const ratingToShow = hoverRating || currentRating;
    
    stars.forEach(star => {
      const value = parseInt(star.getAttribute("data-value"));
      
      // Reset classes
      star.classList.remove("selected", "hover");
      
      // Apply appropriate class
      if (value <= ratingToShow) {
        star.classList.add(hoverRating ? "hover" : "selected");
      }
    });
  }

  // Enhanced form submission with beautiful confirmation
  document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    if (currentRating === 0) {
      alert("Please select a rating before submitting");
      return;
    }
    
    // Get form data
    const formData = new FormData(this);
    
    // Show confirmation animation
    const confirmation = document.getElementById('confirmation');
    const confirmationStars = document.getElementById('confirmationStars');
    
    // Generate stars for confirmation
    confirmationStars.innerHTML = '';
    for (let i = 0; i < currentRating; i++) {
      const star = document.createElement('span');
      star.className = 'confirmation-star';
      star.innerHTML = '★';
      confirmationStars.appendChild(star);
    }
    
    // Show confirmation
    confirmation.classList.add('show');
    
    // Reset form
    this.reset();
    currentRating = 0;
    updateStars();
    
    // Hide confirmation after delay
    setTimeout(() => {
      confirmation.classList.remove('show');
    }, 3000);
    
    // Here you would typically send the data to your server
    console.log('Feedback submitted:', {
      name: formData.get('name'),
      email: formData.get('email'),
      rating: currentRating,
      message: formData.get('message')
    });
  });