// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const pedidoId = urlParams.get("pedido") || localStorage.getItem("pedido_selecionado");

//     if (!pedidoId) {
//         document.getElementById("detalhes-container").innerHTML = "<p>Pedido não encontrado.</p>";
//         return;
//     }

//     try {
//         const response = await fetch(`https://api-webstore.onrender.com/pedido/${pedidoId}`);
//         if (!response.ok) throw new Error("Erro ao obter os detalhes do pedido.");

//         const pedido = await response.json();
        
//         document.getElementById("detalhes-container").innerHTML = `
//             <h2>Pedido: ${pedido.PEDIDO}</h2>
//             <p>Data: ${pedido.EMISSAO}</p>
//             <p>Entrega Prevista: ${pedido.ENTREGA}</p>
//             <P>SKU: ${pedido.SKU}</P>
//             <p>QTD: ${pedido.QTD}</p>
//             <p>VALOR UNITÁRIO: ${pedido.VR_UNIT}</p>
//             <p>STATUS: ${pedido.STATUS}</p>
//         `;
//     } catch (error) {
//         console.error("Erro ao carregar detalhes do pedido:", error);
//         document.getElementById("detalhes-container").innerHTML = "<p>Erro ao carregar os detalhes do pedido.</p>";
//     }
// });

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get("pedido") || localStorage.getItem("pedido_selecionado");

    const container = document.getElementById("detalhes-container");
    if (!container) {
        console.error("Elemento #detalhes-container não encontrado.");
        return;
    }

    if (!pedidoId) {
        container.innerHTML = "<p>Pedido não encontrado.</p>";
        return;
    }

    try {
        const response = await fetch(`https://api-webstore.onrender.com/pedido/${pedidoId}`);
        if (!response.ok) throw new Error("Erro ao obter os detalhes do pedido.");

        const pedido = await response.json();

        // Debug: Verificar o que a API retornou
        console.log("Dados da API:", pedido);

        // Garante que seja um array
        const itensPedido = Array.isArray(pedido) ? pedido : [pedido];

        // Se o array estiver vazio, exibir mensagem
        if (itensPedido.length === 0) {
            container.innerHTML = `<h2>Pedido: ${pedidoId}</h2><p>Este pedido não possui itens.</p>`;
            return;
        }

        // Limpa o container antes de adicionar a tabela
        container.innerHTML = `<h2>Pedido: ${pedidoId}</h2>`;

        // Criando a tabela
        const table = document.createElement("table");
        table.border = "1";
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        // Criando o cabeçalho da tabela
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>SKU</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        `;
        table.appendChild(thead);

        // Criando o corpo da tabela
        const tbody = document.createElement("tbody");

        itensPedido.forEach(item => {
            console.log("Item do pedido:", item); // Debug: Verificar se o loop está rodando corretamente

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.SKU}</td>
                <td>${item.QTD}</td>
                <td>R$ ${parseFloat(item.VR_UNIT).toFixed(2)}</td>
                <td>R$ ${(item.QTD * item.VR_UNIT).toFixed(2)}</td>
                <td>${item.STATUS}</td>
            `;

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);

    } catch (error) {
        console.error("Erro ao carregar detalhes do pedido:", error);
        container.innerHTML = "<p>Erro ao carregar os detalhes do pedido.</p>";
    }
});
