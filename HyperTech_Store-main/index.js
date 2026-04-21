document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your message has been submitted successfully!');
    event.target.reset();
});



