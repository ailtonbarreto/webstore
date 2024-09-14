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
        changeSlide(1); // Muda para a próxima imagem automaticamente
    }, 5000); // 3000ms = 3 segundos entre as trocas
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Inicializa o carrossel mostrando a primeira imagem e iniciando o slide automático
showSlide(currentSlide);
startAutoSlide();


