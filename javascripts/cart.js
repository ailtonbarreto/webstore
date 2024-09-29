// Elementos do DOM
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');



addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
   
    const card = button.parentElement.getAttribute("id");
    

    const productName = card.querySelector('.prodct-name').textContent;
    

    add_to_cart(card);

  });
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


  // alert("clicou no botao")
  console.log(product);

}


function renderCartItems() {
  cartItems.innerHTML = "teste";
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;

 
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });

    li.appendChild(removeButton);
    cartItems.appendChild(li);
  });
}


function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}


document.addEventListener('DOMContentLoaded', renderCartItems);
