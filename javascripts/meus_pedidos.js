async function load_tela() {
    const container = document.getElementById("pedidos-container");
    if (container) container.innerHTML = "<p class='title' style='font-size:2vw'>Carregando pedidos...</p>";

    let clienteId = localStorage.getItem("sku_cliente");
    if (!clienteId) {
        console.error("Erro: ID do cliente não encontrado.");
        container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    let pedidos = await load_pedidos(clienteId);
    
    if (!Array.isArray(pedidos)) {
        console.error("Erro: os dados carregados não são um array.");
        container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    const pedidosSemDuplicados = removerDuplicados(pedidos, "PEDIDO");

    try {
        localStorage.setItem("pedidos_filtrados", JSON.stringify(pedidosSemDuplicados));
    } catch (error) {
        console.error("Erro ao salvar os pedidos filtrados no localStorage:", error);
    }

    renderPedidos(pedidosSemDuplicados);
}

async function load_pedidos() {
    try {
        let cliente = localStorage.getItem("sku_cliente");
        if (!cliente) throw new Error("Cliente não encontrado no localStorage.");

        const response = await fetch(`https://api-webstore.onrender.com/vendas/${cliente}`);
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        
        return await response.json();
    } catch (error) {
        console.error("Erro ao obter os Pedidos:", error);
        return [];
    }
}


function removerDuplicados(array, campoUnico) {
    const itensUnicos = new Map();
    array.forEach(item => {
        if (!itensUnicos.has(item[campoUnico])) {
            itensUnicos.set(item[campoUnico], item);
        }
    });
    return Array.from(itensUnicos.values());
}

function renderPedidos(pedidos) {
    const container = document.getElementById("pedidos-container");
    if (!container) {
        console.error("Elemento 'pedidos-container' não encontrado.");
        return;
    }

    if (!pedidos || pedidos.length === 0) {
        console.warn("Nenhum pedido disponível para renderizar.");
        container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
        return;
    }

    pedidos.sort((a, b) => new Date(b.EMISSAO) - new Date(a.EMISSAO));

    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Total</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = tabela.querySelector("tbody");

    pedidos.forEach(pedido => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
    
        tr.addEventListener("click", () => {
            localStorage.setItem("pedido_selecionado", pedido.PEDIDO);
            window.location.href = `detalhes.html?pedido=${pedido.PEDIDO}`;
        });
    
        const tdpedido = document.createElement("td");
        tdpedido.textContent = pedido.PEDIDO;
        

        const tdtotal = document.createElement("td");
        tdtotal.textContent = pedido.TOTAL_PEDIDO;

        const tddata = document.createElement("td");
        const date = new Date(pedido.EMISSAO);
        const dataFormatada = date.toISOString().split('T')[0].split('-').reverse().join('/');        
        tddata.textContent = dataFormatada;

        const tdstatus = document.createElement("td");
        tdstatus.textContent = pedido.STATUS;
    
        tr.appendChild(tdpedido);
        tr.appendChild(tddata);
        tr.appendChild(tdtotal);
        tr.appendChild(tdstatus);
        tbody.appendChild(tr);
    });
    

    container.innerHTML = "";
    container.appendChild(tabela);

    
}

load_tela();
