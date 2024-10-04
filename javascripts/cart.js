// CARRINHO DE COMPRAS-------------------------------------------------------
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');



console.log("TESTE DE CARREGAR SCRIPT");

window.addEventListener('load', () => {
  renderCartItems();
});


// ---------------------------------------------------------------------------
function cliquei() {

  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

  addToCartButtons.forEach(button=>{

    button.addEventListener("click",handleAddToCart);
    
  });

  console.log(cart);
  
}


// ---------------------------------------------------------------------------
function handleAddToCart(event) {

  const parentElement = event.target.parentElement;
  const nome = parentElement.querySelector(".product-name").textContent;
  const preco = parentElement.querySelector(".preco_por").textContent;

  add_to_cart([nome + " --- " + preco]);
}
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  cliquei();
  renderCartItems();
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
function add_to_cart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// ---------------------------------------------------------------------------
function renderCartItems() {
  cartItems.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add("item-carrinho");
    li.textContent = item;

    const removeButton = document.createElement('img');
    removeButton.src = '../Assets/delete.png';
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });
}
// ---------------------------------------------------------------------------
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}
// ---------------------------------------------------------------------------
