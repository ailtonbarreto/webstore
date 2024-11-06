

// PEDIDO DO CLIENTE---------------------------------------------------------------------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.querySelector('#cart-items');
    let totalElement = document.getElementById("total");
    

    cartItemsContainer.innerHTML = '';
    let total = 0;

 
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">O carrinho está vazio</td></tr>';
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

        // Itera sobre os itens do carrinho
        cart.forEach(item => {
            let tableRow = document.createElement('tr');
            let valor = item.valor;
            let quantidade = parseInt(item.quantidade);

            let subtotal = valor * quantidade;

  
            tableRow.innerHTML = `
                <td><img src="${item.imagem}" alt="${item.nome}" style="width: 5vw; height: auto;"></td>
                <td>${item.nome}</td>
                <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)}</td>
                
                <td>${quantidade}</td>
                

                <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}</td>
            `;
            cartItemsContainer.appendChild(tableRow);

            total += subtotal;
        });

        totalElement.textContent = `Total: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}`;

    }
}

document.addEventListener('DOMContentLoaded', loadCart);
console.log(JSON.parse(localStorage.getItem("cart")));



// ENVIAR PEDIDO DO CLIENTE---------------------------------------------------------------------
const order = JSON.parse(localStorage.getItem("cart"))
const sku_cliente = localStorage.getItem("sku_cliente");


const pedido = order.map(item => ({
    pedido: "PEDTESTE",
    emissao : item.emissao,
    entrega: item.entrega,
    sku_cliente: item.sku_cliente,
    parent: item.parent,
    produto: "1-UN",
    quantidade: item.quantidade,
    valor_unit: item.valor,
    sequencia: 50000,
    situacao: "AGUARDANDO CONFIRMACAO"
  }));
  
  const pedidoJson = JSON.stringify(pedido);

// console.log(pedidoJson)

document.addEventListener('DOMContentLoaded', function() {
    const enviar = document.querySelector(".enviar");

    if (enviar) {
        enviar.addEventListener('click', EnviarPedido);
    } else {
        console.error("Elemento '.enviar' não encontrado");
    }

    function EnviarPedido() {
        fetch('https://api-webstore.onrender.com/inserir/', {

        // fetch('http://localhost:3000/inserir', {

        
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
            pedidoJson

        })
        .then(response => {
            if (!response.ok) throw new Error('Erro na requisição');
            return response.json();
        })
        .then(data => console.log('Sucesso:', data))
        .catch(error => console.error('Erro:', error));
    }
});

