let data = [];


console.log(localStorage.getItem("logged"));

window.addEventListener('load', function() {
  let statusValue = localStorage.getItem("logged");
  
  let observer = new MutationObserver(function(mutations) {
      let btns = document.querySelectorAll(".add-to-cart-btn");
      let precos = document.querySelectorAll(".preco-container"); 
      let prod_btn = document.querySelectorAll(".btn-prod");
      if (btns.length > 0 && precos.length > 0 && prod_btn.length > 0) {

          btns.forEach(function(btn) {
  
              if (statusValue === "1") {
                  btn.style.visibility = "";
              } else if (statusValue === "0") {
                  btn.style.visibility = "hidden";
              }
          });

          precos.forEach(function(preco) {

              if (statusValue === "1") {
                  preco.style.display = "flex";
              } else if (statusValue === "0") {
                  preco.style.display = "none";
              }
          });

          prod_btn.forEach(function(prod_btn) {

              if (statusValue === "0") {
                  prod_btn.style.display = "";
              } else if (statusValue === "1") {
                  prod_btn.style.display = "none";
              }
          });

          observer.disconnect();
      }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});



// CARREGAR CONFIG JSON E DADOS DA FONTE --------------------------------------
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
    return data;

  } catch (error) {
    console.error("Erro ao carregar os produtos: ", error);
  }
};


// CARREGAR DADOS NA PAGINA---------------------------------------------------
async function carregar_produtos() {
  await carregar_dados();

  let product_name = document.querySelector(".prod");
  let categoria = document.querySelector("#category").textContent.trim();

  let filteredData = data.filter(item => item.CATEGORIA === categoria && item.ATIVO === 1);


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
    product_name.appendChild(card);
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

// CHAMAR FUNCOES NA ORDEM CORRETA----------------------------------------------
carregar_produtos().then(() => {
  lazyLoadImages();
});

