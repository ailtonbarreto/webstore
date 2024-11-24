async function load_pedidos() {
    try {
        const response = await fetch("https://api-webstore.onrender.com/vendas");
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        
        const tabela = await response.json();
        sessionStorage.setItem("pedidos", JSON.stringify(tabela));
        return tabela;
    } catch (error) {
        console.error("Erro ao obter os Pedidos:", error);
        return [];
    }
}

function carregarPedidosSessionStorage() {
    const pedidos_salvos = sessionStorage.getItem("pedidos");
    return pedidos_salvos ? JSON.parse(pedidos_salvos) : [];
}
async function load_tela() {
    let dadosSalvos = carregarPedidosSessionStorage();
    console.log("Dados carregados do sessionStorage:", dadosSalvos);

    if (!dadosSalvos.length) {
        console.log("Carregando dados da API...");
        dadosSalvos = await load_pedidos();
    }

    if (!Array.isArray(dadosSalvos)) {
        console.error("Erro: os dados carregados não são um array.");
        return;
    }

    const filtered_pedidos = dadosSalvos.filter(item => item.PEDIDO === "PED69147");
    console.log("Pedidos filtrados:", filtered_pedidos);

    renderPedidos(filtered_pedidos);
}
    
function renderPedidos(pedidos) {
    const container = document.getElementById("pedidos-container");
    if (!container) {
        console.error("Elemento 'pedidos-container' não encontrado.");
        return;
    }

    if (!Array.isArray(pedidos) || !pedidos.length) {
        console.error("Nenhum pedido disponível para renderizar.");
        container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
        return;
    }

    container.innerHTML = "";

    pedidos.forEach(pedido => {
        const pedidoElement = document.createElement("div");
        pedidoElement.className = "pedido-item";
        pedidoElement.innerHTML = `
            <p><strong>ID:</strong> ${pedido.ID}</p>
            <p><strong>Cliente:</strong> ${pedido.CLIENTE}</p>
            <p><strong>SKU:</strong> ${pedido.SKU_CLIENTE}</p>
        `;
        container.appendChild(pedidoElement);
    });
}


load_tela();
