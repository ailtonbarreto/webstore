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


// ----------------------------------------------------------------------------
// USER

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

if (statusValue === null) {
  localStorage.setItem("logged", 0);
  statusValue = "0";
}


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

// CARREGAR PRODUTOS NA PÁGINA------------------------------------------------
async function carregar_produtos() {
 
  let dadosSalvos = JSON.parse(sessionStorage.getItem('dadosConsulta'));

 
  if (!dadosSalvos) {
    await carregar_dados_local(); 
    dadosSalvos = JSON.parse(sessionStorage.getItem('dadosConsulta'));
  }

  let product_name = document.querySelector(".prod");
  let categoria = document.querySelector("#category").textContent.trim();

  // Filtra os dados carregados
  let filteredData = dadosSalvos.filter(item => item.CATEGORIA === categoria && item.ATIVO === 1);

  
  product_name.innerHTML = '';

  filteredData.forEach(item => {
    let card = document.createElement("figure");
    card.id = `${item.PARENT}`;
    card.classList.add("card");

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
      label_por.setAttribute("Parent", item.PARENT);

      card.appendChild(priceContainer);
    }

    product_name.appendChild(card);
  });
}

// FUNÇÃO CLICAR NO PRODUTO-------------------------------------------------
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

// FUNÇÃO PARA LAZY LOADING DAS IMAGENS---------------------------------------
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
}

// CHAMAR FUNÇÕES NA ORDEM CORRETA--------------------------------------------
carregar_produtos().then(() => {
  lazyLoadImages();
});


