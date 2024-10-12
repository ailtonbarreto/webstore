
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';
let data = [];




window.addEventListener('load', function() {
    let statusValue = localStorage.getItem("logged");
    if (statusValue === "1") {
        let btns = document.querySelectorAll(".btn-prod");
        btns.forEach(function(btn) {
            btn.style.display = "none";
        });

        let precos = document.querySelectorAll(".preco-container");
        precos.forEach(function(preco){
            preco.style.display = "none";
        });

        console.log("logado");
    }
    else{
        console.log("não logado");
    }
});


// CARREGAR DADOS DA FONTE----------------------------------------------
async function carregar_dados() {
    try {
        const response = await fetch(url);
        const text = await response.text();

        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        data = resultados.data;
        return data;

    } catch (error) {
        console.error("Erro ao carregar os produtos: ", error);
    }
};

// CARREGAR BEST SELLERS-----------------------------------------------
async function load_best_sellers() {
    await carregar_dados();

    let categoria = "best_sellers";

    let filteredData = data.filter(item => item.HOME === categoria && item.ATIVO === 1);

    let productContainer = document.querySelector(".best_sellers");

    filteredData.forEach(item => {
        let card = document.createElement("figure");
        card.id = `${item.PARENT}`;
        card.classList.add("card");

        let cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart-btn");
        cartButton.textContent = "+ Add";
        card.appendChild(cartButton);

        let list_name = document.createElement("a");
        list_name.classList.add("product-name");
        list_name.textContent = `${item.DESCRICAO}`;
        card.appendChild(list_name);

        let imageLink = document.createElement("a");
        imageLink.classList.add("produto");

        let imagem = document.createElement("img");
        imagem.addEventListener("click", produtoclicado);
        imagem.dataset.src = `${item.IMAGEM}`;
        imagem.loading = "lazy";
        imagem.alt = item.DESCRICAO;
        imageLink.appendChild(imagem);
        card.appendChild(imageLink);


        let priceLink = document.createElement("a");
        priceLink.classList.add("preco-label");
        priceLink.href = "login.html";
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
        label_por.setAttribute("valor", item.PRECO_POR);
        label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
        priceContainer.appendChild(label_por);

        card.appendChild(priceContainer);

        productContainer.appendChild(card);
    });
};

// CARREGAR DESTAQUES-----------------------------------------------------------

async function load_destaques() {
    await carregar_dados();

    let categoria = "destaques";

    let filteredData = data.filter(item => item.HOME === categoria && item.ATIVO === 1);

    let productContainer = document.querySelector(".destaques");


    filteredData.forEach(item => {
        let card = document.createElement("figure");
        card.id = `${item.PARENT}`;
        card.classList.add("card");

        let cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart-btn");
        cartButton.textContent = "+ Add";
        card.appendChild(cartButton);

        let list_name = document.createElement("a");
        list_name.classList.add("product-name");
        list_name.textContent = `${item.DESCRICAO}`;
        card.appendChild(list_name);

        let imageLink = document.createElement("a");
        imageLink.classList.add("produto");

        let imagem = document.createElement("img");
        imagem.addEventListener("click", produtoclicado);
        imagem.dataset.src = `${item.IMAGEM}`;
        imagem.loading = "lazy";
        imagem.alt = item.DESCRICAO;
        imageLink.appendChild(imagem);
        card.appendChild(imageLink);


        let priceLink = document.createElement("a");
        priceLink.classList.add("preco-label");
        priceLink.href = "login.html";
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
        label_por.setAttribute("valor", item.PRECO_POR);
        label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
        priceContainer.appendChild(label_por);

        card.appendChild(priceContainer);

        productContainer.appendChild(card);
    });
};

// ------------------------------------------------------------------

async function load_estoque_limitado() {
    await carregar_dados();

    let categoria = "estoque_limitado";


    let filteredData = data.filter(item => item.HOME === categoria && item.ATIVO === 1);


    let productContainer = document.querySelector(".estoque_limitado");

    filteredData.forEach(item => {
        let card = document.createElement("figure");
        card.id = `${item.PARENT}`;
        card.classList.add("card");

        let cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart-btn");
        cartButton.textContent = "+ Add";
        card.appendChild(cartButton);


        let list_name = document.createElement("a");
        list_name.classList.add("product-name");
        list_name.textContent = `${item.DESCRICAO}`;
        card.appendChild(list_name);


        let imageLink = document.createElement("a");
        imageLink.classList.add("produto");


        let imagem = document.createElement("img");
        imagem.addEventListener("click", produtoclicado);
        imagem.dataset.src = `${item.IMAGEM}`
        imagem.loading = "lazy";
        imagem.alt = item.DESCRICAO;
        imageLink.appendChild(imagem);
        card.appendChild(imageLink);

        let priceLink = document.createElement("a");
        priceLink.classList.add("preco-label");
        priceLink.href = "./login.html";
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
        label_por.setAttribute("valor", item.PRECO_POR);
        label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
        priceContainer.appendChild(label_por);

        card.appendChild(priceContainer);

        productContainer.appendChild(card);
    });
};

// CARREGAR IMAGENS-------------------------------------------------------------
function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        observer.unobserve(img);
                    }
                }
            });
        }, {
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
};

// FUNCAO CLICAR NO PRODUTO---------------------------------------------------------

function produtoclicado(event) {

    let selected_product = event.target;


    let elementoPai = selected_product.parentElement.parentElement;


    let foto = elementoPai.querySelector("img").src;
    let produtonome = elementoPai.querySelector("img").alt;
    let precoDe = elementoPai.querySelector(".preco_de").textContent;
    let precoPor = elementoPai.querySelector(".preco_por").textContent;

    localStorage.setItem("produtoSelecionado", elementoPai.id);
    localStorage.setItem("foto", foto);
    localStorage.setItem("nome", produtonome);
    localStorage.setItem("preco_de", precoDe);
    localStorage.setItem("preco_por", precoPor);

    window.location.href = "./produto.html";
}

let produtos = document.querySelectorAll(".produto");


produtos.forEach(produto => {
    produto.addEventListener("click", produtoclicado);
});


// ---------------------------------------------------------------------------------

load_best_sellers().then(() => {
    lazyLoadImages();
});


load_destaques().then(() => {
    lazyLoadImages();
});

load_estoque_limitado().then(() => {
    lazyLoadImages();
});

// --------------------------------------------------------------------------------------

