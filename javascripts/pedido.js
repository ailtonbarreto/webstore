
// console.log(JSON.parse(localStorage.getItem('cart')));

// function enviarPedido() {
//     const novoDado = {
//         "PEDIDO": "pedteste001",
//         "EMISSAO": "2024-10-30",
//         "ENTREGA": "2024-12-31",
//         "CLIENTE": "pedteste001",
//         "CIDADE": "FRANCA",
//         "UF": "SP",
//         "SKU": `"${cart.SKU}"`,
//         "PARENT": "1",
//         "DESCRICAO": `${cart.none}`,
//         "CATEGORIA": "pedteste001",
//         "QTD": `${cart.quantidade}`,
//         "VR_UNIT": `${cart.valor}`
//     };

//     fetch('https://api-webstore.onrender.com/tb_vendas', { 

//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(novoDado)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro ao adicionar dados.');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Dados adicionados com sucesso:', data);
//     })
//     .catch(error => console.error('Erro:', error));
// };


// PEDIDO DO CLIENTE----------------------------------------------
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

// <td>R$ ${subtotal.toFixed(2)}</td>

document.addEventListener('DOMContentLoaded', loadCart);
