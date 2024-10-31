let data = [];
let statusValue = localStorage.getItem("logged");
let menu_user = document.querySelector(".menu_user");
let user_icon = document.querySelector(".login");
let item_sair = document.querySelector(".item_sair");
let item_cadastro = document.querySelector(".item_cadastro");
let item_entrar = document.querySelector(".item_entrar");
let item_pedidos = document.querySelector(".item_pedidos");
let cart_counter = document.querySelector(".cart-counter");

// localStorage.clear();

if (statusValue === null) {
    localStorage.setItem("logged", 0);
    statusValue = "0";
}

if (statusValue === "0") {
    item_sair.style.display = "none";
    item_pedidos.style.display = "none";
    cart_counter.style.display = "none";
} else {
    item_sair.style.display = "block";
    item_cadastro.style.display = "none";
    item_entrar.style.display = "none";
    
}

// ----------------------------------------------------------------------------
// CARREGAR OS DADOS DA API DO CRIADA
window.addEventListener('load', async function() {
    try {
        const response = await fetch("https://api-webstore.onrender.com/integracao");
        if (!response.ok) {
            throw new Error('Erro ao obter os dados da API.');
        }
        
        const dadosArray = await response.json();
        sessionStorage.setItem('dadosConsulta', JSON.stringify(dadosArray));
    } catch (error) {
        console.error('Erro ao obter os dados:', error);
    }

    function carregarDadosDoSessionStorage() {
        const dadosSalvos = sessionStorage.getItem('dadosConsulta');
        if (dadosSalvos) {
            return JSON.parse(dadosSalvos);
        } else {
            console.log('Nenhum dado encontrado no sessionStorage.');
            return [];
        }
    }

    const dadosCarregados = carregarDadosDoSessionStorage();

    // Verifique se os dados foram carregados e chame load_products
    if (dadosCarregados.length > 0) {
        await load_products("best_sellers", dadosCarregados);
        await load_products("destaques", dadosCarregados);
        await load_products("estoque_limitado", dadosCarregados);
    } else {
        console.log('Dados vazios, não é possível carregar produtos.');
    }
});


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

menu_user.addEventListener("mouseleave", () => {
    menu_user.style.display = "none";
});

// CARREGAR PRODUTOS NA PÁGINA------------------------------------------------

async function load_products(categoria) {

    let dadosSalvos = JSON.parse(sessionStorage.getItem('dadosConsulta'));


    if (!dadosSalvos) {

        await carregar_dados();
        dadosSalvos = JSON.parse(sessionStorage.getItem('dadosConsulta'));
    }


    let filteredData = dadosSalvos.filter(item => item.HOME === categoria && item.ATIVO === 1);
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
        label.innerHTML = `De: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PRECO_DE)}`
        priceContainer.appendChild(label);

        let label_por = document.createElement("p");
        label_por.classList.add("preco_por");
        label_por.setAttribute("valor", item.PRECO_POR);
        label_por.innerHTML = `Por: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.PRECO_POR)}`
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
// ---------------------------------------------------------------------------------------
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

// --------------------------------------FIM------------------------------------------------

