let data = [];
let statusValue = localStorage.getItem("logged");
let menu_user = document.querySelector(".menu_user");
let user_icon = document.querySelector(".login");
let item_sair = document.querySelector(".item_sair");
let item_cadastro = document.querySelector(".item_cadastro");
let item_entrar = document.querySelector(".item_entrar");
let item_pedidos = document.querySelector(".item_pedidos");
let cart_counter = document.querySelector(".cart-counter");
let btn_close = document.querySelector(".close-btn");

// localStorage.clear();
// sessionstorage.clear();


// ----------------------------------------------------------------------------

if (statusValue === null) {
    localStorage.setItem("logged", 0);
    statusValue = "0";
    localStorage.removeItem("sku_cliente");

}

if (statusValue === "0") {
    item_sair.style.display = "none";
    item_pedidos.style.display = "none";
    cart_counter.style.display = "none";
    localStorage.removeItem("sku_cliente");
    
} else {
    item_sair.style.display = "block";
    item_cadastro.style.display = "none";
    item_entrar.style.display = "none";
    
}

// ----------------------------------------------------------------------------
// USER

function toggle_menu() {
    if (menu_user.style.display === "block") {
        menu_user.style.display = "none";
    } else {
        menu_user.style.display = "block";
    }
}

user_icon.addEventListener("click", () => {
    menu_user.style.display = "block";
});

btn_close.addEventListener("click", () => {
    menu_user.style.display = "none";
});

// ----------------------------------------------------------------------------
/// CARREGAR DADOS DA API
async function carregarDadosApi() {
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

// ----------------------------------------------------------------------------
/// CARREGAR DADOS DA LOCAL
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

// ----------------------------------------------------------------------------
// CARREGAR DADOS DA SESSION STORAGE
function carregarDadosDoSessionStorage() {
    const dadosSalvos = sessionStorage.getItem("dadosConsulta");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
}

// ----------------------------------------------------------------------------
// CARREGAR PRODUTOS
async function load_products(categoria) {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block"; // Mostrar o spinner

    let dadosSalvos = carregarDadosDoSessionStorage();
    if (!dadosSalvos.length) dadosSalvos = await carregarDados();

    const filteredData = dadosSalvos.filter(item => item.HOME === categoria && item.ATIVO === 1 && Number(item.ESTOQUE_VENDA) > 0);
    const productContainer = document.querySelector(`.${categoria}`);

    filteredData.forEach(item => {
        const card = criarCardProduto(item);
        productContainer.appendChild(card);
    });

    spinner.style.display = "none"; // Esconder o spinner após carregar os produtos
    atualizarVisibilidade();
}


// ------------------------------------------------------------------------------
// TENTAR RECARREGAR IMAGEM SE DER ERRO

function carregarImagem(imagem, src, tentativas = 0) {
    const maxTentativas = 3;

  
    imagem.src = src;

    imagem.addEventListener('error', function() {
        if (tentativas < maxTentativas) {
   
            setTimeout(() => carregarImagem(imagem, src, tentativas + 1), 1000);
        } else {
            imagem.src = ".Assets/logo.png";
        }
    });
}

// ------------------------------------------------------------------------------
// CRIAR CARD DE PRODUTO

function criarCardProduto(item) {
    const card = document.createElement("figure");
    card.id = item.PARENT;
    card.classList.add("card");

    const list_name = document.createElement("a");
    list_name.classList.add("product-name");
    list_name.textContent = item.DESCRICAO;
    card.appendChild(list_name);

    const imageLink = document.createElement("a");
    imageLink.classList.add("produto");

    const imagem = document.createElement("img");
    imagem.loading = "lazy";
    imagem.alt = item.DESCRICAO;
    imagem.addEventListener("click", produtoclicado);
    
    // Carregar a imagem com a função de tentativa
    carregarImagem(imagem, item.IMAGEM);

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
        label_por.setAttribute("Parent", item.PARENT);
        
        card.appendChild(priceContainer);
    }

    return card;
}

// ----------------------------------------------------------------------------
function atualizarVisibilidade() {

    document.querySelectorAll(".preco-container").forEach(preco => {
        preco.style.display = (statusValue === "1") ? "flex" : "none";
    });

}

// ----------------------------------------------------------------------------
// PRODUTO CLICADO
function produtoclicado(event) {
    const elementoPai = event.target.closest("figure");
    localStorage.setItem("produtoSelecionado", elementoPai.id);
    localStorage.setItem("foto", elementoPai.querySelector("img").src);
    localStorage.setItem("nome", elementoPai.querySelector("img").alt);
    localStorage.setItem("preco_de", elementoPai.querySelector(".preco_de").textContent);
    localStorage.setItem("preco_por", elementoPai.querySelector(".preco_por").textContent);
    window.location.href = "./produto.html";
}

// ----------------------------------------------------------------------------
// INICIALIZAR CARREGAMENTO DE PRODUTOS AO CARREGAR A PÁGINA
window.addEventListener("load", async () => {
    await load_products("best_sellers");
    await load_products("destaques");
    await load_products("estoque_limitado");
});


// ----------------------------------------------------------------------------
// MENU TOOGLE MOBILE
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.width === "100%") {
      menu.style.width = "0";
    } else {
      menu.style.width = "100%";
    }
  }
  
  