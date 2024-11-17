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

function updateImagesForMobile() {
    const isMobile = window.innerWidth <= 768;
    const images = document.querySelectorAll('.carousel-images img');

    images.forEach(img => {
        const mobileSrc = img.getAttribute('data-mobile');
        const desktopSrc = img.getAttribute('src');

     
        img.src = isMobile ? mobileSrc : desktopSrc;
    });
}

updateImagesForMobile();
window.addEventListener('resize', updateImagesForMobile);


showSlide(currentIndex);
resetAutoSlide();
