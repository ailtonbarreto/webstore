// ---------------------------------------------------------------------------
// CARRINHO DE COMPRAS
const cart = document.getElementById('cart');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const subtotalElement = document.querySelector(".subtotal");

// ---------------------------------------------------------------------------
// ABRIR E FECHAR CARRINHO
openCartBtn.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cart.classList.remove('active');
});

// ---------------------------------------------------------------------------
// ADICIONAR EVENTO DE CLIQUE AOS BOTOES "ADICIONAR AO CARRINHO"
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    handleAddToCart(event);
  }
});

// ---------------------------------------------------------------------------
// ADICIONAR ITEM AO CARRINHO
function handleAddToCart(event) {
  const parentElement = event.target.parentElement;
  const nome = parentElement.querySelector(".product-name").textContent;
  const preco = parentElement.querySelector(".preco_por").textContent;
  const container = parentElement.querySelector(".preco_por");
  const valor = container.getAttribute("valor");

  add_to_cart({ nome, valor, quantidade: 1 });
}

// ---------------------------------------------------------------------------
// FUNÇÃO PARA ADICIONAR ITEM AO CARRINHO E SALVAR NO LOCALSTORAGE
function add_to_cart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  

  const existingProductIndex = cart.findIndex(item => item.nome === product.nome);
  
  if (existingProductIndex >= 0) {

    cart[existingProductIndex].quantidade += 1;
  } else {

    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// ---------------------------------------------------------------------------
// RENDERIZAR ITENS DO CARRINHO
function renderCartItems() {
  cartItems.innerHTML = ""; // Limpa os itens anteriores
  let cart = JSON.parse(localStorage.getItem('cart')) || [];


  const table = document.createElement('table');
  table.classList.add("cart-table");


  const tableHeader = `
    <tr>
      <th>Produto</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Remover</th>
    </tr>
  `;
  // table.innerHTML = tableHeader;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

 
    const nomeColuna = document.createElement('td');
    nomeColuna.textContent = item.nome;
    row.appendChild(nomeColuna);

    const valorColuna = document.createElement('td');
    valorColuna.textContent = `R$: ${parseFloat(item.valor).toFixed(2)}`;
    row.appendChild(valorColuna);

    const quantidadeColuna = document.createElement('td');
    const quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.min = '1';
    quantidadeInput.value = item.quantidade || 1;
    quantidadeInput.addEventListener('change', (event) => {
      updateQuantity(index, event.target.value);
    });
    quantidadeColuna.appendChild(quantidadeInput);
    row.appendChild(quantidadeColuna);

    const removeColuna = document.createElement('td');
    const removeButton = document.createElement('img');
    removeButton.src = './Assets/delete.png';
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener('click', () => {
      removeFromCart(index);
    });
    removeColuna.appendChild(removeButton);
    row.appendChild(removeColuna);


    table.appendChild(row);
  });

 
  cartItems.appendChild(table);

  calcularSubtotal();
}

// ---------------------------------------------------------------------------
// FUNCAO ATUALIZAR QUANTIDADE
function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantidade = parseInt(newQuantity);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// ---------------------------------------------------------------------------
// FUNCAO REMOVER ITEM DO CARRINHO
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart))
  renderCartItems();
}

// ---------------------------------------------------------------------------
// CALCULAR O SUBTOTAL DOS ITENS
function calcularSubtotal() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cart.forEach((item) => {
    const quantidade = item.quantidade || 1;
    subtotal += parseFloat(item.valor) * quantidade;
  });

  subtotalElement.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;

 
  localStorage.setItem("Subtotal", subtotal.toFixed(2));
}

// ---------------------------------------------------------------------------
// CARREGAR O CARRINHO SALVO NO LOCALSTORAGE AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', () => {
  renderCartItems();
});

renderCartItems();
