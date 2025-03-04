// PEDIDO DO CLIENTE---------------------------------------------------------------------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.querySelector('#cart-items');
    let cartCardsContainer = document.querySelector('#cart-cards');
    let totalElement = document.getElementById("total");

    cartItemsContainer.innerHTML = '';
    cartCardsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">O carrinho está vazio</td></tr>';
        cartCardsContainer.innerHTML = '<div class="cart-card">O carrinho está vazio</div>';
        totalElement.textContent = "Total: R$ 0,00";
    } else {
        let tableHeader = `
            <tr>
                <th></th>
                <th>Produto</th>
                <th>Valor Un</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
            </tr>
        `;
        cartItemsContainer.innerHTML = tableHeader;


        cart.forEach(item => {
            let valor = item.valor;
            let quantidade = parseInt(item.quantidade);
            let subtotal = valor * quantidade;

            let tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td><img src="${item.imagem}" alt="${item.nome}" style="width: 5vw; height: auto;"></td>
                <td>${item.nome}</td>
                <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}</td>
                <td>${quantidade}</td>
                <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</td>
            `;
            cartItemsContainer.appendChild(tableRow);


            let cartCard = document.createElement('div');
            cartCard.className = 'cart-card';
            cartCard.innerHTML = `
                <div><img src="${item.imagem}" alt="${item.nome}"></div>
                <div class= "text"><strong>Valor Un:</strong> ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}</div>
                <div class= "text"><strong>Quantidade:</strong> ${quantidade}</div>
                <div class= "text"><strong>Subtotal:</strong>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</div>
                <hr>
            `;
            cartCardsContainer.appendChild(cartCard);

            total += subtotal;
        });

        totalElement.textContent = `Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`;
    }

    checkScreenSize();
}


function checkScreenSize() {
    const table = document.getElementById('cart-table');
    const cardsContainer = document.getElementById('cart-cards');

    if (window.innerWidth <= 768) {
        table.style.display = 'none';
        cardsContainer.style.display = 'block';
    } else {
        table.style.display = 'table';
        cardsContainer.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', loadCart);


window.addEventListener('resize', checkScreenSize);

// -------------------------------------------------------------------------------------------------------
// ENVIAR PEDIDO DO CLIENTE

const order = JSON.parse(localStorage.getItem("cart"));
const sku_cliente = localStorage.getItem("sku_cliente");

const pedido = order.map(item => ({
    emissao: item.emissao,
    entrega: item.entrega,
    sku_cliente: sku_cliente,
    parent: item.parent,
    produto: "1-UN",
    quantidade: item.quantidade,
    valor_unit: item.valor,
    sequencia: 50000,
    situacao: "AGUARDANDO CONFIRMACAO"
}));

const pedidoJson = JSON.stringify(pedido);

document.addEventListener('DOMContentLoaded', function() {
    const enviar = document.getElementById("enviar-btn");
    const loadingModal = document.getElementById("loading-modal");
    const successModal = document.getElementById("success-modal");
    const successOkBtn = document.getElementById("success-ok-btn");

    if (enviar) {
        enviar.addEventListener('click', EnviarPedido);
    } else {
        console.error("Elemento '#enviar-btn' não encontrado");
    }

    if (successOkBtn) {
        successOkBtn.addEventListener('click', function() {
            successModal.style.display = 'none';
            window.location.href = 'meuspedidos.html';
        });
    }

    function EnviarPedido() {

        loadingModal.style.display = 'flex';

        fetch('https://api-webstore.onrender.com/inserir/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: pedidoJson,
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro na requisição');
            return response.json();
        })
        .then(data => {
            console.log('Pedido inserido com sucesso!', data);
            localStorage.removeItem("cart");
            loadingModal.style.display = 'none';

            successModal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Erro ao inserir pedido:', error);
            loadingModal.style.display = 'none';
        });
    }
});

// ----------------------------------------------------------------------------
// MENU TOGGLE MOBILE
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.width === "100%") {
        menu.style.width = "0";
    } else {
        menu.style.width = "100%";
    }
}