// funcao para carregar pedidos da API e armazená-los no sessionStorage
async function load_pedidos() {
    try {
        const response = await fetch("https://api-webstore.onrender.com/vendas");
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        
        const tabela = await response.json();
        if (!Array.isArray(tabela)) throw new Error("Formato de dados inválido.");
        
        const compressedData = LZString.compress(JSON.stringify(tabela));
        sessionStorage.setItem("pedidos", compressedData);
        return tabela;
    } catch (error) {
        console.error("Erro ao obter os Pedidos:", error);
        return [];
    }
}

// funcao para carregar pedidos armazenados no sessionStorage
function carregarPedidosSessionStorage() {
    try {
        const compressedData = sessionStorage.getItem("pedidos");
        return compressedData ? JSON.parse(LZString.decompress(compressedData)) : [];
    } catch (error) {
        console.error("Erro ao carregar dados do sessionStorage:", error);
        return [];
    }
}

// funcao principal para carregar a tela com os pedidos
async function load_tela() {
    const container = document.getElementById("pedidos-container");
    if (container) container.innerHTML = "<p>Carregando pedidos...</p>";

    let dadosSalvos = carregarPedidosSessionStorage();
    console.log("Dados carregados do sessionStorage:", dadosSalvos);

    if (!dadosSalvos.length) {
        console.log("Carregando dados da API...");
        dadosSalvos = await load_pedidos();
    }

    if (!Array.isArray(dadosSalvos)) {
        console.error("Erro: os dados carregados não são um array.");
        if (container) container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    const filtered_pedidos = dadosSalvos.filter(item => item.PEDIDO === "PED69197");
    console.log("Pedidos filtrados:", filtered_pedidos);

    renderPedidos(filtered_pedidos);
}

// funcao para renderizar os pedidos no contêiner
function renderPedidos(pedidos) {
    const container = document.getElementById("pedidos-container");
    if (!container) {
        console.error("Elemento 'pedidos-container' não encontrado.");
        return;
    }

    if (!Array.isArray(pedidos) || !pedidos.length) {
        console.warn("Nenhum pedido disponível para renderizar.");
        container.innerHTML = "<p>Nenhum pedido encontrado.</p>";
        return;
    }

    container.innerHTML = "";

    pedidos.forEach(pedido => {
        const id = pedido.ID || "ID não disponível";
        const cliente = pedido.CLIENTE || "Cliente não informado";
        const sku = pedido.SKU_CLIENTE || "SKU não disponível";

        const pedidoElement = document.createElement("div");
        pedidoElement.className = "pedido-item";
        pedidoElement.innerHTML = `
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Cliente:</strong> ${cliente}</p>
            <p><strong>SKU:</strong> ${sku}</p>
        `;
        container.appendChild(pedidoElement);
    });
}

// Chamar a funcao principal ao carregar a página
load_tela();
