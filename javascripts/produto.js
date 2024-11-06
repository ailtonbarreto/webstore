// localStorage.clear()

window.onload = function () {
  const produto = localStorage.getItem("produtoSelecionado");
  const img = localStorage.getItem("foto");
  const nome = localStorage.getItem("nome");
  const preco_de = localStorage.getItem("preco_de");
  const preco_por = localStorage.getItem("preco_por");
 
  

  if (img) {
    document.getElementById("produtoSelecionado").innerHTML = `Parent: ${produto}`;
  } else {
    console.log("nenhum produto encontrado");
  }

  if (img) {
      document.getElementById("imagemProduto").src = img;
  } else {
      console.log("Nenhuma imagem foi encontrada");
  }

  if (nome) {
      document.getElementById("nome").innerHTML = nome;
  } else {
      console.log("Nenhum nome foi encontrado");
  }

  if (preco_de) {
      document.getElementById("precode").innerHTML = preco_de;
  } else {
      console.log(" ");
  }

  if (preco_por) {
      document.getElementById("precopor").innerHTML = preco_por;
      
  } else {
      console.log(" ");
  }

}

document.addEventListener('DOMContentLoaded', updateCartCounter);

function handleAddToCart(event) {
  const parentElement = event.target.parentElement;
  const nome = document.getElementById("nome").textContent;
  const emissao = new Date().toISOString().slice(0, 10);
  let entrega = new Date();
  entrega.setDate(entrega.getDate() + 30);
  entrega = entrega.toISOString().slice(0, 10);
  // Capturar o valor direto do texto do elemento #precopor
  const precoText = document.getElementById("precopor").textContent;
  const sku_cliente = localStorage.getItem("sku_cliente");
  const parent = document.getElementById("produtoSelecionado").textContent.replace("Parent: ", "");
  
  const valor = parseFloat(precoText.replace("Por: R$", "").replace(",", ".").trim());


 
  if (isNaN(valor)) {
      console.log("Erro ao capturar o valor do preço");
      return; 
  }

  const imagem = document.getElementById("imagemProduto").getAttribute("src");

  add_to_cart({ imagem, nome, valor, quantidade: 1,sku_cliente,emissao,entrega,parent});
  updateCartCounter();
}


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
  updateCartCounter();
}


function updateCartCounter() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCounter = document.querySelector('.cart-counter');
  const totalItems = cart.reduce((acc, item) => acc + item.quantidade, 0);
  cartCounter.textContent = totalItems;
}

function renderCartItems() {
  cartItems.innerHTML = "";
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const table = document.createElement('table');
  table.classList.add("cart-table");

  const tableHeader = `
    <tr>
      <th>imagem</th>
      <th>Produto</th>
      <th>Preço</th>
      <th>Quantidade</th>
      <th>Remover</th>
    </tr>
  `;
  // table.innerHTML = tableHeader; 

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    const imagemColuna = document.createElement('td');
    const imgElement = document.createElement('img');
    imgElement.src = item.imagem;
    imgElement.alt = item.nome;
    imgElement.style.width = '50px';
    imagemColuna.appendChild(imgElement);
    row.appendChild(imagemColuna);
 
  
    const nomeColuna = document.createElement('td');
    nomeColuna.textContent = item.nome;
    row.appendChild(nomeColuna);


    const valorColuna = document.createElement('td');
    valorColuna.textContent = (`RS ${item.valor}`).replace(".",",");
    row.appendChild(valorColuna);

  
    const quantidadeColuna = document.createElement('td');
    const quantidadeWrapper = document.createElement('div');
    quantidadeWrapper.classList.add('quantity-control');

    const minusButton = document.createElement('button');
    minusButton.textContent = "-";
    minusButton.classList.add('quantity-btn');
    minusButton.disabled = item.quantidade === 1;
    minusButton.addEventListener('click', () => {
      updateQuantity(index, item.quantidade - 1);
    });

    const quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.min = '1';
    quantidadeInput.value = item.quantidade || 1;
    quantidadeInput.classList.add('quantity-input');
    quantidadeInput.addEventListener('change', (event) => {
      updateQuantity(index, parseInt(event.target.value));
    });

    const plusButton = document.createElement('button');
    plusButton.textContent = "+";
    plusButton.classList.add('quantity-btn');
    plusButton.addEventListener('click', () => {
      updateQuantity(index, item.quantidade + 1);
    });

    quantidadeWrapper.appendChild(minusButton);
    quantidadeWrapper.appendChild(quantidadeInput);
    quantidadeWrapper.appendChild(plusButton);
    quantidadeColuna.appendChild(quantidadeWrapper);
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
  updateCartCounter();
}


// FUNCAO ATUALIZAR QUANTIDADE
function updateQuantity(index, newQuantity) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart[index].quantidade = parseInt(newQuantity);
localStorage.setItem('cart', JSON.stringify(cart));
renderCartItems();
updateCartCounter();
}

// ---------------------------------------------------------------------------
// FUNCAO REMOVER ITEM DO CARRINHO
function removeFromCart(index) {
let cart = JSON.parse(localStorage.getItem('cart')) || [];
cart.splice(index, 1);
localStorage.setItem('cart', JSON.stringify(cart))
renderCartItems();
updateCartCounter();
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

subtotalElement.textContent = `Subtotal: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}`;


localStorage.setItem("Subtotal", subtotal.toFixed(2));
}

// ---------------------------------------------------------------------------
// CARREGAR O CARRINHO SALVO NO LOCALSTORAGE AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', () => {
renderCartItems();
});

renderCartItems();