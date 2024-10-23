


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
                <th>Imagem</th>
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
                <td><img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: auto;"></td>
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
