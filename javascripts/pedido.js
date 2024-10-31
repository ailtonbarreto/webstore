
// async function enviarPedido() {
   
//     const pedidoData = {
//         pedido: "PEDTESTE",
//         emissao: "2024-10-30",
//         entrega: "2024-10-30",
//         sku_cliente: 9999999,
//         sku: "49-44",
//         parent: 49,
//         qtd: 12,
//         vr_unit: 233.99
//     };

//     try {
//         // Envio da requisição POST
//         const response = await fetch("https://api-53jr.onrender.com/pedido/", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(pedidoData)
//         });

//         // Verificação da resposta
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Erro:", errorData.detail);
//         } else {
//             const result = await response.json();
//             console.log("Resposta da API:", result.message);
//             alert("Pedido enviado com sucesso!");
//         }
//     } catch (error) {
//         console.error("Erro na conexão:", error);
//     }
// }

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
