
let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';



let lista = document.querySelector(".navlist");


lista.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.classList.contains('page')) {
        event.preventDefault();

        document.querySelectorAll('.page').forEach(function(el) {
            el.classList.remove('active');
        });


        event.target.classList.add('active');


        let categoria = event.target.textContent.trim();

        let page_title = document.getElementById('page-title'); 
        page_title.innerHTML = categoria;

        localStorage.setItem("categoria",categoria);

        carregar_produtos(categoria);
    }
});

// Função para fazer o fetch e converter para JSON
function carregar_produtos(categoria) {

    let product_name = document.querySelector(".prod");
    product_name.innerHTML = '';


    fetch(url)
        .then(response => response.text())
        .then(text => {
            const resultados = Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
            });

            const data = resultados.data;


            let filteredData = data.filter(item => item.CATEGORIA === categoria && item.ATIVO === 1);


            filteredData.forEach(item => {
                let card = document.createElement("figure");
                card.id = `${item.PARENT}`;
                card.classList.add("card");

                let list_name = document.createElement("a");
                list_name.classList.add("prodct-name");
                list_name.textContent = `${item.DESCRICAO}`;
                card.appendChild(list_name);

                let imageLink = document.createElement("a");
                imageLink.classList.add("produto");

                let imagem = document.createElement("img");
                imagem.addEventListener("click", produtoclicado);
                imagem.src = item.IMAGEM;
                imagem.alt = item.DESCRICAO;
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
                product_name.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erro ao buscar os dados:", error);
        });
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

