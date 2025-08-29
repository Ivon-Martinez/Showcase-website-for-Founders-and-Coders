
// Slideshow
const slides = ["img/slide1.jpg", "img/slide2.jpg", "img/slide3.jpg"];
let index = 0;
setInterval(() => {
  index = (index + 1) % slides.length;
  document.getElementById("slide").src = slides[index];
}, 3000);

// TopBar scroll effect
const topBar = document.querySelector('.topBar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) topBar.classList.add('scrolled');
  else topBar.classList.remove('scrolled');
});
