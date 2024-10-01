// Elementos do DOM
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');


function cliquei() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');


  addToCartButtons.forEach(button => {
    if (!button.dataset.listenerAdded) { 
      button.addEventListener("click", handleAddToCart);
      button.dataset.listenerAdded = true;
    }
  });
}


function handleAddToCart(event) {
  const parentElement = event.target.parentElement;
  console.log("Elemento pai encontrado:", parentElement);

  const nome = parentElement.querySelector(".product-name").textContent;
  const preco = parentElement.querySelector(".preco_por").textContent;


  add_to_cart([nome + " --- " + preco]);
}

// Chamar a função uma vez após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  cliquei();
  renderCartItems(); // Carregar os itens do carrinho ao iniciar
});

openCartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('active');
});


function add_to_cart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// Função para renderizar os itens no carrinho
function renderCartItems() {
  cartItems.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add("item-carrinho");
    li.textContent = item;

    const removeButton = document.createElement('a');
    removeButton.textContent = 'x';
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
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
