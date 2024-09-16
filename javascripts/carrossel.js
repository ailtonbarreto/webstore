let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 8000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}


showSlide(currentSlide);
startAutoSlide();


