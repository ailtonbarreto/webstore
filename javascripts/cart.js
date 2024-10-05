// CARRINHO DE COMPRAS-------------------------------------------------------
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');

// ---------------------------------------------------------------------------
// Delegação de eventos para os botões de adicionar ao carrinho
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    handleAddToCart(event);
  }
});

// ---------------------------------------------------------------------------
// ABRIR E FECHAR CARRINHO
openCartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('active');
});

// ---------------------------------------------------------------------------
// ADICIONAR ITEM AO CARRINHO
function handleAddToCart(event) {
  const parentElement = event.target.parentElement;
  const nome = parentElement.querySelector(".product-name").textContent;
  const preco = parentElement.querySelector(".preco_por").textContent;

  add_to_cart([`${nome} --- ${preco}`]);
}

// ---------------------------------------------------------------------------
// Função para adicionar o item ao carrinho (localStorage)
function add_to_cart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// ---------------------------------------------------------------------------
// Renderiza os itens do carrinho
function renderCartItems() {
  cartItems.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add("item-carrinho");
    li.textContent = item;

    const removeButton = document.createElement('img');
    removeButton.src = './Assets/delete.png';
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });
}

// ---------------------------------------------------------------------------
// Função para remover item do carrinho
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// ---------------------------------------------------------------------------
// Carrega os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
});

renderCartItems() 