// Tenta pegar o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log(cart);

// Função para carregar o carrinho do localStorage
function loadCart() {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Seleciona o contêiner onde os itens serão exibidos (tabela)
    let cartItemsContainer = document.querySelector('#cart-items');
    let totalElement = document.getElementById("total");

    // Limpa o contêiner antes de popular
    cartItemsContainer.innerHTML = '';

    // Inicializa o total como 0
    let total = 0;

    // Se o carrinho estiver vazio
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<tr><td colspan="3">O carrinho está vazio</td></tr>';
        totalElement.textContent = "Total: R$ 0,00";
    } else {
        // Cabeçalho da tabela
        let tableHeader = `
            <tr>
                <th>Produto</th>
                <th>Valor</th>
            </tr>
        `;
        cartItemsContainer.innerHTML = tableHeader;

        // Para cada item no carrinho, cria uma linha na tabela e soma os valores
        cart.forEach(item => {
            let tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${item.nome}</td>
                <td>R$ ${parseFloat(item.valor).toFixed(2)}</td>
            `;
            cartItemsContainer.appendChild(tableRow);

            // Somar o valor ao total (convertendo para número)
            total += parseFloat(item.valor);
        });

        // Atualiza o valor total no elemento de total
        totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', loadCart);
