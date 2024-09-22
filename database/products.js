


// Função que será chamada ao clicar em um produto
function produtoclicado(event) {
    // O 'event.target' refere-se ao elemento que foi clicado
    let selected_product = event.target;

    let elementoPai = selected_product.parentElement.parentElement;

    console.log("Clicou num produto");
    console.log("ID do produto:", selected_product.alt);
    console.log("Elemento pai:", elementoPai.id);
}

// Seleciona todos os elementos que possuem a classe 'produto' (por exemplo)
let produtos = document.querySelectorAll(".produto");

// Adiciona o evento de clique para todos os produtos
produtos.forEach(produto => {
    produto.addEventListener("click", produtoclicado);
});


