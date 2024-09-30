// Elementos do DOM
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');



function cliquei() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", () => {
      const parentElement = addToCartButtons[i].parentElement;
      console.log("Produto selecionado:", addToCartButtons[i]);
      console.log("Elemento pai encontrado:", parentElement);

      nome = parentElement.querySelector(".product-name").textContent;
      img = parentElement.querySelector("img");


    add_to_cart(img);

    });
  }
}


// Abrir o carrinho
openCartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

// Fechar o carrinho
closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('active');
});

// Função para adicionar ao carrinho e salvar no localStorage
function add_to_cart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems(); // Renderizar os itens novamente

}

// Função para renderizar os itens no carrinho
function renderCartItems() {
  cartItems.innerHTML = ""; // Limpar o conteúdo atual do carrinho
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Adicionar cada item no <ul> como <li>
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item; // Mostrar o nome do produto

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
      removeFromCart(index); // Função para remover o item do carrinho
    });

    li.appendChild(removeButton); // Adicionar botão ao <li>
    cartItems.appendChild(li); // Adicionar <li> à lista <ul>
  });
}

// Função para remover um item do carrinho
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remover o item específico
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems(); // Re-renderizar os itens no carrinho
}

// Carregar os itens do carrinho quando a página for carregada
document.addEventListener('DOMContentLoaded', renderCartItems);

