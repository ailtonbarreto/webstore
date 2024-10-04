
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';





function load_best_sellers(){

    fetch(url)
    .then(response => response.text())
    .then(text => {
        
        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const data = resultados.data;

        let categoria = "best_sellers";


        // Filtrando os dados que correspondem à categoria
        let filteredData = data.filter(item => item.HOME === categoria);


        // Certifique-se de que existe um container no HTML para adicionar os cards
        let productContainer = document.querySelector(".best_sellers");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.id = `${item.PARENT}`;
            card.classList.add("card");

            let cartButton = document.createElement("button");
            cartButton.classList.add("add-to-cart-btn");
            cartButton.onclick = function(){cliquei()};
            cartButton.onclick = function(){add_to_cart()};
            cartButton.textContent = "+ Add";
            // cartButton.setAttribute("data-listener-added",true);
            card.appendChild(cartButton);

            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("product-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);


            // Imagem do produto
            let imageLink = document.createElement("a");
            imageLink.classList.add("produto");
            // imageLink.href ="../pages/produto.html";

            let imagem = document.createElement("img");
            imagem.addEventListener("click",produtoclicado);
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            imagem.loading = "lazy";
            imagem.setAttribute("valor",item.PRECO_POR);
            imageLink.appendChild(imagem);
            card.appendChild(imageLink);

            // Link para login com botão "Ver Preço"
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

            // -----------------------------------


            // Container de preço
            let priceContainer = document.createElement("div");
            priceContainer.classList.add("preco-container");

            let label = document.createElement("p");
            label.classList.add("preco_de");
            label.innerHTML = `De: R$ ${item.PRECO_DE}`;
            priceContainer.appendChild(label);

            let label_por = document.createElement("p");
            label_por.classList.add("preco_por");
            label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
            priceContainer.appendChild(label_por);

            card.appendChild(priceContainer);

            // Adiciona o card ao container de produtos
            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}



function load_destaques(){

    fetch(url)
    .then(response => response.text())
    .then(text => {
        
        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const data = resultados.data;

        let categoria = "destaques";

        
        let filteredData = data.filter(item => item.HOME === categoria);


        // Certifique-se de que existe um container no HTML para adicionar os cards
        let productContainer = document.querySelector(".destaques");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.id = `${item.PARENT}`;
            card.classList.add("card");

            let cartButton = document.createElement("button");
            cartButton.classList.add("add-to-cart-btn");
            cartButton.textContent = "+ Add";
            cartButton.onclick = function(){cliquei()};
            card.appendChild(cartButton);


            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("product-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            let imageLink = document.createElement("a");
            imageLink.classList.add("produto");
          

            let imagem = document.createElement("img");
            imagem.addEventListener("click",produtoclicado);
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            imagem.loading = "lazy"; 
            imageLink.appendChild(imagem);
            card.appendChild(imageLink);

           
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "../login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

       
            let priceContainer = document.createElement("div");
            priceContainer.classList.add("preco-container");

            let label = document.createElement("p");
            label.classList.add("preco_de");
            label.innerHTML = `De: R$ ${item.PRECO_DE}`;
            priceContainer.appendChild(label);

            let label_por = document.createElement("p");
            label_por.classList.add("preco_por");
            label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
            priceContainer.appendChild(label_por);

            card.appendChild(priceContainer);

            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}


function load_estoque_limitado(){

    fetch(url)
    .then(response => response.text())
    .then(text => {
        
        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const data = resultados.data;

        let categoria = "estoque_limitado";

      
        let filteredData = data.filter(item => item.HOME === categoria);

  
        let productContainer = document.querySelector(".estoque_limitado");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.id = `${item.PARENT}`;
            card.classList.add("card");

            let cartButton = document.createElement("button");
            cartButton.classList.add("add-to-cart-btn");
            cartButton.textContent = "+ Add";
            cartButton.onclick = function(){cliquei()};
            card.appendChild(cartButton);


            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("product-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            // ------------------------------------------------------------------------------------
            let imageLink = document.createElement("a");
            imageLink.classList.add("produto");
            // imageLink.href = "../pages/produto.html";

            let imagem = document.createElement("img");
            imagem.addEventListener("click",produtoclicado);
            imagem.loading = "lazy"; 
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            imageLink.appendChild(imagem);
            card.appendChild(imageLink);

            // ------------------------------------------------------------------------------------
            // Link para login com botão "Ver Preço"
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "../login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

            // Container de preço
            let priceContainer = document.createElement("div");
            priceContainer.classList.add("preco-container");

            let label = document.createElement("p");
            label.classList.add("preco_de");
            label.innerHTML = `De: R$ ${item.PRECO_DE}`;
            priceContainer.appendChild(label);

            let label_por = document.createElement("p");
            label_por.classList.add("preco_por");
            label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
            priceContainer.appendChild(label_por);

            card.appendChild(priceContainer);

            // Adiciona o card ao container de produtos
            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}

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
      });
  
      images.forEach(img => {
        observer.observe(img);
      });
    }
}


lazyLoadImages()
load_best_sellers()
load_destaques()
load_estoque_limitado()

