let data = [];
let statusValue = localStorage.getItem("logged") || "0";
localStorage.setItem("logged", statusValue);
if (statusValue === "0") localStorage.removeItem("sku_cliente");

const elements = {
    menu_user: document.querySelector(".menu_user"),
    user_icon: document.querySelector(".login"),
    item_sair: document.querySelector(".item_sair"),
    item_cadastro: document.querySelector(".item_cadastro"),
    item_entrar: document.querySelector(".item_entrar"),
    item_pedidos: document.querySelector(".item_pedidos"),
    cart_counter: document.querySelector(".cart-counter"),
};

if (statusValue === "0") {
    elements.item_sair.style.display = "none";
    elements.item_pedidos.style.display = "none";
    elements.cart_counter.style.display = "none";
} else {
    elements.item_sair.style.display = "block";
    elements.item_cadastro.style.display = "none";
    elements.item_entrar.style.display = "none";
}

// USER MENU
elements.user_icon.addEventListener("click", () => {
    elements.menu_user.classList.toggle("active");
});
elements.menu_user.addEventListener("mouseleave", () => {
    elements.menu_user.classList.remove("active");
});

// CARREGAR DADOS DA API
async function carregarDados() {
    try {
        const response = await fetch("https://api-webstore.onrender.com/integracao");
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        const dadosArray = await response.json();
        sessionStorage.setItem("dadosConsulta", JSON.stringify(dadosArray));
        return dadosArray;
    } catch (error) {
        console.error("Erro ao obter os dados:", error);
        return [];
    }
}

function carregarDadosDoSessionStorage() {
    const dadosSalvos = sessionStorage.getItem("dadosConsulta");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
}

// CARREGAR PRODUTOS
async function load_products(categoria) {
    let dadosSalvos = carregarDadosDoSessionStorage();
    if (!dadosSalvos.length) dadosSalvos = await carregarDados();

    const filteredData = dadosSalvos.filter(item => item.HOME === categoria && item.ATIVO === 1);
    const productContainer = document.querySelector(`.${categoria}`);

    filteredData.forEach(item => {
        const card = criarCardProduto(item);
        productContainer.appendChild(card);
    });

    atualizarVisibilidade();
}

function criarCardProduto(item) {
    const card = document.createElement("figure");
    card.id = item.PARENT;
    card.classList.add("card");

    if (statusValue === "1") {
        const cartButton = document.createElement("button");
        cartButton.classList.add("add-to-cart-btn");
        cartButton.textContent = "+ Add";
        card.appendChild(cartButton);
    }

    const list_name = document.createElement("a");
    list_name.classList.add("product-name");
    list_name.textContent = item.DESCRICAO;
    card.appendChild(list_name);

    const imageLink = document.createElement("a");
    imageLink.classList.add("produto");

    const imagem = document.createElement("img");
    imagem.src = item.IMAGEM;
    imagem.loading = "lazy";
    imagem.alt = item.DESCRICAO;
    imagem.addEventListener("click", produtoclicado);
    
    imageLink.appendChild(imagem);
    card.appendChild(imageLink);

    const priceLink = document.createElement("a");
    priceLink.classList.add("preco-label");
    priceLink.href = "./login.html";
    card.appendChild(priceLink);

    const priceButton = document.createElement("button");
    priceButton.classList.add("btn-prod");
    priceButton.textContent = "Ver Preço";
    priceButton.style.display = (statusValue === "0") ? "block" : "none";
    priceLink.appendChild(priceButton);

    if (statusValue === "1") {
        const priceContainer = document.createElement("div");
        priceContainer.classList.add("preco-container");

        const label = document.createElement("p");
        label.classList.add("preco_de");
        label.innerHTML = `De: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PRECO_DE)}`;
        priceContainer.appendChild(label);

        const label_por = document.createElement("p");
        label_por.classList.add("preco_por");
        label_por.setAttribute("valor", item.PRECO_POR);
        label_por.innerHTML = `Por: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PRECO_POR)}`;
        priceContainer.appendChild(label_por);
        
        card.appendChild(priceContainer);
    }

    return card;
}

function atualizarVisibilidade() {
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.style.display = (statusValue === "1") ? "block" : "none";
    });
    document.querySelectorAll(".preco-container").forEach(preco => {
        preco.style.display = (statusValue === "1") ? "flex" : "none";
    });
    document.querySelectorAll(".btn-prod").forEach(prod_btn => {
        prod_btn.style.display = (statusValue === "1") ? "none" : "block";
    });
}

function produtoclicado(event) {
    const elementoPai = event.target.closest("figure");
    localStorage.setItem("produtoSelecionado", elementoPai.id);
    localStorage.setItem("foto", elementoPai.querySelector("img").src);
    localStorage.setItem("nome", elementoPai.querySelector("img").alt);
    localStorage.setItem("preco_de", elementoPai.querySelector(".preco_de").textContent);
    localStorage.setItem("preco_por", elementoPai.querySelector(".preco_por").textContent);
    window.location.href = "./produto.html";
}

// INICIALIZAR CARREGAMENTO DE PRODUTOS AO CARREGAR A PÁGINA
window.addEventListener("load", async () => {
    await load_products("best_sellers");
    await load_products("destaques");
    await load_products("estoque_limitado");
});
