// Tenta pegar o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];


console.log(cart);

// Função para carregar o carrinho do localStorage
function loadCart() {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Seleciona o contêiner onde os itens serão exibidos
    let cartItemsContainer = document.getElementById('cart-items');

    // Limpa o contêiner antes de popular
    cartItemsContainer.innerHTML = '';

    // Se o carrinho estiver vazio
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li>O carrinho está vazio</li>';
    } else {
        // Para cada item no carrinho, cria um elemento de lista
        cart.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = `${item}`;
            cartItemsContainer.appendChild(listItem);
        });
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', loadCart);
