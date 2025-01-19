// Função para carregar pedidos da API e armazená-los no sessionStorage
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

// Função para carregar pedidos armazenados no sessionStorage
function carregarPedidosSessionStorage() {
    try {
        const compressedData = sessionStorage.getItem("pedidos");
        return compressedData ? JSON.parse(LZString.decompress(compressedData)) : [];
    } catch (error) {
        console.error("Erro ao carregar dados do sessionStorage:", error);
        return [];
    }
}

// Função principal para carregar a tela com os pedidos
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

    const filtered_pedidos = dadosSalvos.filter(item => item.SKU_CLIENTE === "0");
    console.log("Pedidos filtrados:", filtered_pedidos);

    renderPedidos(filtered_pedidos);
}

// Função para renderizar os pedidos em uma tabela
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

    // Criação da tabela
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Emissão</th>
                <th>Entrega</th>
                <th>SKU Cliente</th>
                <th>SKU</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = tabela.querySelector("tbody");

    pedidos.forEach(pedido => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = pedido.PARENT || "ID não disponível";

        const tdEmissao = document.createElement("td");
        tdEmissao.textContent = pedido.EMISSAO || "Data de emissão não disponível";

        const tdEntrega = document.createElement("td");
        tdEntrega.textContent = pedido.ENTREGA || "Data de entrega não disponível";

        const tdSkuCliente = document.createElement("td");
        tdSkuCliente.textContent = pedido.SKU_CLIENTE || "SKU Cliente não disponível";

        const tdSku = document.createElement("td");
        tdSku.textContent = pedido.SKU || "SKU não disponível";

        tr.appendChild(tdId);
        tr.appendChild(tdEmissao);
        tr.appendChild(tdEntrega);
        tr.appendChild(tdSkuCliente);
        tr.appendChild(tdSku);

        tbody.appendChild(tr);
    });

    container.innerHTML = "";  // Limpa o conteúdo do contêiner
    container.appendChild(tabela);  // Adiciona a tabela ao contêiner
}

// Chamar a função principal para carregar a página
load_tela();
