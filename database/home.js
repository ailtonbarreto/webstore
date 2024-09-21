

let api = 'https://api-rhmw.onrender.com/';

function load_best_sellers(){

    fetch(api)
    .then(response => response.json())
    .then(data => {

        let categoria = "best_sellers";

        // Filtrando os dados que correspondem à categoria
        let filteredData = data.filter(item => item.HOME === categoria);

        console.log(categoria.HOME);
        console.log(filteredData);

        // Certifique-se de que existe um container no HTML para adicionar os cards
        let productContainer = document.querySelector(".best_sellers");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.classList.add("card");

            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("prodct-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            // Imagem do produto
            let imagem = document.createElement("img");
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            card.appendChild(imagem);

            // Link para login com botão "Ver Preço"
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "../login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

            // Container de preço
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

            // Adiciona o card ao container de produtos
            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}



function load_destaques(){

    fetch(api)
    .then(response => response.json())
    .then(data => {

        let categoria = "destaques";

        // Filtrando os dados que correspondem à categoria
        let filteredData = data.filter(item => item.HOME === categoria);

        console.log(categoria.HOME);
        console.log(filteredData);

        // Certifique-se de que existe um container no HTML para adicionar os cards
        let productContainer = document.querySelector(".destaques");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.classList.add("card");

            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("prodct-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            // Imagem do produto
            let imagem = document.createElement("img");
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            card.appendChild(imagem);

            // Link para login com botão "Ver Preço"
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "../login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

            // Container de preço
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

            // Adiciona o card ao container de produtos
            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}


function load_estoque_limitado(){

    fetch(api)
    .then(response => response.json())
    .then(data => {

        let categoria = "estoque_limitado";

        // Filtrando os dados que correspondem à categoria
        let filteredData = data.filter(item => item.HOME === categoria);

        console.log(categoria.HOME);
        console.log(filteredData);

        // Certifique-se de que existe um container no HTML para adicionar os cards
        let productContainer = document.querySelector(".estoque_limitado");

        filteredData.forEach(item => {
            let card = document.createElement("figure");
            card.classList.add("card");

            // Nome do produto
            let list_name = document.createElement("a");
            list_name.classList.add("prodct-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            // Imagem do produto
            let imagem = document.createElement("img");
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            card.appendChild(imagem);

            // Link para login com botão "Ver Preço"
            let priceLink = document.createElement("a");
            priceLink.classList.add("preco-label");
            priceLink.href = "../login.html";
            card.appendChild(priceLink);

            let priceButton = document.createElement("button");
            priceButton.classList.add("btn-prod");
            priceButton.textContent = "Ver Preço";
            priceLink.appendChild(priceButton);

            // Container de preço
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

            // Adiciona o card ao container de produtos
            productContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });

}



load_best_sellers()
load_destaques()
load_estoque_limitado()