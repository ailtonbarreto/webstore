// Elementos do DOM
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Função para abrir o carrinho
openCartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

// Função para fechar o carrinho
closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('active');
});

// Adicionar produto ao carrinho
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Acessar o elemento pai 'figure' de forma direta
    const card = button.parentElement.parentElement;  // Subindo dois níveis para chegar ao 'figure'
    
    // Dentro do 'figure', pegar o elemento que contém o nome do produto
    const productName = card.querySelector('.product-name').textContent;

    // Adiciona o produto ao carrinho
    addToCart(productName);
  });
});

// Função para adicionar produto ao carrinho e salvar no localStorage
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);  // Adiciona o produto ao array do carrinho
  localStorage.setItem('cart', JSON.stringify(cart));  // Salva o carrinho no localStorage
  renderCartItems();  // Atualiza a visualização do carrinho
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
  cartItems.innerHTML = '';  // Limpa a lista de itens do carrinho
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item, index) => {
    const li = document.createElement('li');  // Cria um novo elemento <li> para o item
    li.textContent = item;

    // Adiciona botão de remover item ao lado do nome do produto
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
      removeFromCart(index);  // Remove o item ao clicar no botão
    });

    li.appendChild(removeButton);  // Adiciona o botão ao <li>
    cartItems.appendChild(li);  // Adiciona o <li> ao <ul id="cart-items">
  });
}

// Função para remover itens do carrinho
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);  // Remove o item do array pelo índice
  localStorage.setItem('cart', JSON.stringify(cart));  // Atualiza o localStorage
  renderCartItems();  // Atualiza a visualização do carrinho
}

// Carregar itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', renderCartItems);
