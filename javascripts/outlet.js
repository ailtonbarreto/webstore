let data = [];
let statusValue = localStorage.getItem("logged");



// localStorage.clear();

if (statusValue === null) {
    localStorage.setItem("logged", 0);
    statusValue = "0";
}

window.addEventListener('load', async function() {
    await load_products("Outlet");
});


async function carregar_dados_local() {
    try {
      const response = await fetch("database/api.json");
      const jsonData = await response.json();
      data = jsonData;
      return data;
    } catch (error) {
      console.error("Erro ao carregar os dados locais: ", error);
    }
};


// async function carregar_dados() {
//     try {
//         const configResponse = await fetch('database/db.json');
//         const config = await configResponse.json();
//         const response = await fetch(config.spreadsheetUrl);
//         const text = await response.text();

//         const resultados = Papa.parse(text, {
//             header: true,
//             skipEmptyLines: true,
//             dynamicTyping: true,
//         });

//         data = resultados.data;
//     } catch (error) {
//         console.error("Erro ao carregar os produtos: ", error);
//     }
// }


async function load_products(categoria) {
    await carregar_dados_local();

    let filteredData = data.filter(item => item.HOME === categoria && item.ATIVO === 1);
    let product_name = document.querySelector(`.${categoria}`);

    filteredData.forEach(item => {
        let card = criarCardProduto(item);
        product_name.appendChild(card);
    });

    atualizarVisibilidade(statusValue);
}

function criarCardProduto(item) {
    let card = document.createElement("figure");
    card.id = `${item.PARENT}`;
    card.classList.add("card");

    if (statusValue === "1") {
        let cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart-btn");
        cartButton.textContent = "+ Add";
        card.appendChild(cartButton);
    }

    let list_name = document.createElement("a");
    list_name.classList.add("product-name");
    list_name.textContent = `${item.DESCRICAO}`;
    card.appendChild(list_name);

    let imageLink = document.createElement("a");
    imageLink.classList.add("produto");
   

    let imagem = document.createElement("img");
    imagem.src = `${item.IMAGEM}`;
    imagem.loading = "lazy";
    imagem.addEventListener("click", produtoclicado);
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
    priceButton.style.display = (statusValue === "0") ? "block" : "none";
    priceLink.appendChild(priceButton);

    if (statusValue === "1") {
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
    }

    return card;
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

// FUNÇÃO CLICAR NO PRODUTO
function produtoclicado(event) {
    let selected_product = event.target;
    let elementoPai = selected_product.closest('figure');

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


