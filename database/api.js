
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';



// FUNCAO PARA PEGAR OS DADOS DO LINK
async function carregar_produtos() {

    fetch(url)
        .then(response => response.text())
        .then(text => {

            const resultados = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });

            const data = resultados.data;

            // console.log(data);

            let product_name = document.querySelector(".prod");
            let categoria = document.querySelector("#category").textContent.trim();

            let filteredData = data.filter(item => item.CATEGORIA === categoria && item.ATIVO === 1);

            filteredData.forEach(item => {
                let card = document.createElement("figure");
                card.id = `${item.PARENT}`;
                card.classList.add("card");

                let cartButton = document.createElement("button");
                cartButton.classList.add("add-to-cart-btn");
                cartButton.onclick = function(){cliquei()};
                cartButton.textContent = "+ Add";
                card.appendChild(cartButton);

                let list_name = document.createElement("a");
                list_name.classList.add("prodct-name");
                list_name.textContent = `${item.DESCRICAO}`;
                card.appendChild(list_name);

                let imageLink = document.createElement("a");
                imageLink.classList.add("produto");

                let imagem = document.createElement("img");
                imagem.addEventListener("click", produtoclicado);
                imagem.src = item.IMAGEM;
                imagem.loading = "lazy"
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
                label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
                priceContainer.appendChild(label_por);

                card.appendChild(priceContainer);
                product_name.appendChild(card);
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



function produtoclicado(event) {

    let selected_product = event.target;


    let elementoPai = selected_product.parentElement.parentElement;


    let foto = elementoPai.querySelector("img").src;
    let produtonome = elementoPai.querySelector("img").alt;
    let precoDe = elementoPai.querySelector(".preco_de").textContent;
    let precoPor = elementoPai.querySelector(".preco_por").textContent;

    console.log("Clicou no produto");
    console.log("parent do produto", elementoPai.id);
    console.log("foto do produto:", foto);
    console.log("nome: ", produtonome);
    console.log("Preço de:", precoDe);
    console.log("Preço por:", precoPor);


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




lazyLoadImages()
carregar_produtos()