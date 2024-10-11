function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
  
  
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                   
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src"); 
                    observer.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px 100px 0px",
            threshold: 0.1
        });
  
        images.forEach(img => {
            observer.observe(img);
        });
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", lazyLoadImages);  