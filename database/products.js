// Função que será chamada ao clicar em um produto
function produtoclicado(event) {
    // O 'event.target' refere-se ao elemento que foi clicado
    let selected_product = event.target;

    let elementoPai = selected_product.parentElement.parentElement;

    console.log("Clicou no produto");
    console.log("Parent do produto:", elementoPai.id);

    let produto = localStorage.setItem("produtoSelecionado",elementoPai.id);

    window.location.href = "./pages/produto.html";
}

// Seleciona todos os elementos que possuem a classe 'produto' (por exemplo)
let produtos = document.querySelectorAll(".produto");

// Adiciona o evento de clique para todos os produtos
produtos.forEach(produto => {
    produto.addEventListener("click", produtoclicado);
});