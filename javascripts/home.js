let data = [];

// localStorage.clear()

console.log(localStorage.getItem("logged"));

window.addEventListener('load', function() {
    let statusValue = localStorage.getItem("logged");
    atualizarVisibilidade(statusValue);
});

async function carregar_dados() {
    try {
        const configResponse = await fetch('database/db.json');
        const config = await configResponse.json();
        const response = await fetch(config.spreadsheetUrl);
        const text = await response.text();

        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        data = resultados.data;
    } catch (error) {
        console.error("Erro ao carregar os produtos: ", error);
    }
}

async function load_products(categoria) {
    await carregar_dados();

    let filteredData = data.filter(item => item.HOME === categoria && item.ATIVO === 1);
    let productContainer = document.querySelector(`.${categoria}`);

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
        imagem.src = `${item.IMAGEM}`;
        imagem.loading = "lazy";
        imagem.addEventListener("click",produtoclicado);
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

    atualizarVisibilidade(localStorage.getItem("logged"));
}

function atualizarVisibilidade(statusValue) {
    let btns = document.querySelectorAll(".add-to-cart-btn");
    let precos = document.querySelectorAll(".preco-container");
    let prod_btns = document.querySelectorAll(".btn-prod");

    btns.forEach(btn => {
        btn.style.display = (statusValue === "1") ? "block" : "none";
    });

    precos.forEach(preco => {
        preco.style.display = (statusValue === "1") ? "flex" : "none";
    });

    prod_btns.forEach(prod_btn => {
        prod_btn.style.display = (statusValue === "1") ? "none" : "block";
    });
}

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


load_products("best_sellers");
load_products("destaques");
load_products("estoque_limitado");
