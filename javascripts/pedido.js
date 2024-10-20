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
            let valor = parseFloat(item.valor.replace(',', '.'));
            let quantidade = parseInt(item.quantidade);

            let subtotal = valor * quantidade;

  
            tableRow.innerHTML = `
                <td><img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: auto;"></td> <!-- Exibe a imagem -->
                <td>${item.nome}</td>
                <td>R$ ${valor.toFixed(2)}</td>
                <td>${quantidade}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(tableRow);

            total += subtotal;
        });

        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

document.addEventListener('DOMContentLoaded', loadCart);
