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
        console.log(pedido);

        const itensPedido = Array.isArray(pedido) ? pedido : [pedido];

        if (itensPedido.length === 0) {
            container.innerHTML = `<h2 class='texto-home'>Pedido: ${pedidoId}</h2><p>Este pedido não possui itens.</p>`;
            return;
        }

        container.innerHTML = `<h2 class='title'>Pedido: ${pedidoId}</h2>`;

        const table = document.createElement("table");
        table.border = "1";
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Pedido</th>
                <th>Data de Emissão</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Status</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        let totalPedido = 0; 

        itensPedido.forEach(item => {
            const row = document.createElement("tr");

            const date = new Date(item.EMISSAO);
            const dataFormatada = date.toISOString().split('T')[0].split('-').reverse().join('/');

            totalPedido += item.QTD * parseFloat(item.VR_UNIT);

            row.innerHTML = `
                <td>${item.PEDIDO}</td>
                <td>${dataFormatada}</td>
                <td>${item.DESCRICAO}</td>
                <td>${item.QTD}</td>
                <td>${parseFloat(item.VR_UNIT).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>${item.STATUS}</td>
            `;

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        const totalDiv = document.createElement("div");
        totalDiv.style.marginTop = "20px"; 
        totalDiv.innerHTML = `<p style='font-size:1vw; color:#0f8f8f; font-weight:bold'>Total do Pedido: ${totalPedido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>`;
        container.appendChild(totalDiv);

    } catch (error) {
        console.error("Erro ao carregar detalhes do pedido:", error);
        container.innerHTML = "<p>Erro ao carregar os detalhes do pedido.</p>";
    }
});
