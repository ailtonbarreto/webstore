function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Verifica se o 'data-src' ainda está presente e carrega a imagem
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");  // Remove o data-src após carregar
                        observer.unobserve(img);  // Para de observar a imagem
                    }
                }
            });
        }, {
            rootMargin: "0px 0px 100px 0px",  // Carrega 100px antes da imagem entrar na tela
            threshold: 0.1  // Carrega quando 10% da imagem está visível
        });

        images.forEach(img => {
            observer.observe(img);  // Começa a observar todas as imagens
        });
    } else {
        // Fallback para navegadores sem IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Executa o lazy load quando o DOM for carregado
document.addEventListener("DOMContentLoaded", lazyLoadImages);
