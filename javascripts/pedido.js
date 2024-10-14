// PEDIDO DO CLIENTE----------------------------------------------
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.querySelector('#cart-items');
    let totalElement = document.getElementById("total");

    cartItemsContainer.innerHTML = ''; // Limpa os itens anteriores
    let total = 0;

    // Verifica se o carrinho está vazio
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="4">O carrinho está vazio</td></tr>'; // Corrigido para 4 colunas
        totalElement.textContent = "Total: R$ 0,00";
    } else {
        let tableHeader = `
            <tr>
                <th>Imagem</th> <!-- Nova coluna para a imagem -->
                <th>Produto</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Subtotal</th>
            </tr>
        `;
        cartItemsContainer.innerHTML = tableHeader;

        // Itera sobre os itens do carrinho
        cart.forEach(item => {
            let tableRow = document.createElement('tr');
            let valor = parseFloat(item.valor.replace(',', '.')); // Corrige a formatação do valor
            let quantidade = parseInt(item.quantidade);

            let subtotal = valor * quantidade; // Calcula o subtotal

            // Cria a linha da tabela
            tableRow.innerHTML = `
                <td><img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: auto;"></td> <!-- Exibe a imagem -->
                <td>${item.nome}</td>
                <td>R$ ${valor.toFixed(2)}</td>
                <td>${quantidade}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(tableRow); // Adiciona a linha ao contêiner

            total += subtotal; // Soma o subtotal ao total
        });

        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`; // Exibe o total
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', loadCart);
