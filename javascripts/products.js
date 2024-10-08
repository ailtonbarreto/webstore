// PAGINA DE PRODUTO
function produtoclicado(event) {

    let selected_product = event.target;


    let elementoPai = selected_product.parentElement.parentElement;


    let foto = elementoPai.querySelector("img").src;
    let produtonome = elementoPai.querySelector("img").alt;
    let precoDe = elementoPai.querySelector(".preco_de").textContent;
    let precoPor = elementoPai.querySelector(".preco_por").textContent;

    console.log("parent do produto", elementoPai.id);
    console.log("foto do produto:", foto);
    console.log("nome: ",produtonome);
    console.log("Preço de:",precoDe);
    console.log("Preço por:",precoPor);


    localStorage.setItem("produtoSelecionado", elementoPai.id);
    localStorage.setItem("foto",foto);
    localStorage.setItem("nome",produtonome);
    localStorage.setItem("preco_de",precoDe);
    localStorage.setItem("preco_por",precoPor);

  
    window.location.href = "./produto.html";
}


let produtos = document.querySelectorAll(".produto");


produtos.forEach(produto => {
    produto.addEventListener("click", produtoclicado);
});


