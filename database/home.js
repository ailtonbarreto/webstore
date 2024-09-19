


let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';
let api = 'https://api-rhmw.onrender.com/';



fetch(api)
    .then(response => response.json())

    .then(data => {
        
        let product_name = document.querySelector(".prod");


        console.log(data)

        let categoria = document.querySelector(".category").textContent.trim();
 

        let filteredData = data.filter(item => item.HOME === categoria);

        filteredData.forEach(item => {

            let card = document.createElement("figure");
            card.classList.add("card");

            let list_name = document.createElement("a");
            list_name.classList.add("prodct-name");
            list_name.textContent = `${item.DESCRICAO}`;
            card.appendChild(list_name);

            
            let imagem = document.createElement("img");
            imagem.src = item.IMAGEM;
            imagem.alt = item.DESCRICAO;
            card.appendChild(imagem);


            let priceLink = document.createElement("a");
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
