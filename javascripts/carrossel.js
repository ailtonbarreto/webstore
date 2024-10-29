let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-images a');
const totalSlides = slides.length;
let autoSlideInterval;

function showSlide(index) {
    const carouselImages = document.querySelector('.carousel-images');
    carouselImages.style.transform = `translateX(-${index * 100}%)`;
}

function changeSlide(step) {
    currentIndex = (currentIndex + step + totalSlides) % totalSlides;
    showSlide(currentIndex);
    resetAutoSlide();
}

function autoSlide() {
    changeSlide(1);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 8000);
}

showSlide(currentIndex);
resetAutoSlide();
