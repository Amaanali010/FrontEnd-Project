const slides = document.querySelectorAll('.hero-slider img');
let current = 0;

function changeSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[current].classList.add('active');
    current = (current + 1) % slides.length;
}

setInterval(changeSlide, 3500); // Slide every 3.5 seconds
function scrollSlider(value) {
  const slider = document.getElementById("productSlider");
  slider.scrollBy({
    left: value,
    behavior: "smooth"
  });
}
function scrollCards(direction) {
    const slider = document.getElementById("cardSlider");
    const scrollAmount = 300;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}