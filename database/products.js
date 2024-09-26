// Função Clicar em um produto
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
    console.log("nome: ",produtonome);
    console.log("Preço de:",precoDe);
    console.log("Preço por:",precoPor);

    // Armazena no localStorage o id do elemento pai
    localStorage.setItem("produtoSelecionado", elementoPai.id);
    localStorage.setItem("foto",foto);
    localStorage.setItem("nome",produtonome);
    localStorage.setItem("preco_de",precoDe);
    localStorage.setItem("preco_por",precoPor);

    // Redireciona para outra página, se necessário
    window.location.href = "./pages/produto.html";
}

// Seleciona todos os elementos que possuem a classe 'produto' (por exemplo)
let produtos = document.querySelectorAll(".produto");

// Adiciona o evento de clique para todos os produtos
produtos.forEach(produto => {
    produto.addEventListener("click", produtoclicado);
});


