// Função principal para carregar a tela com os pedidos
async function load_tela() {
    const container = document.getElementById("pedidos-container");
    if (container) container.innerHTML = "<p>Carregando pedidos...</p>";

    let cliente = localStorage.getItem("sku_cliente");
    console.log("SKU do cliente carregado:", cliente);

    // Carregar dados salvos
    let dadosSalvos = carregarPedidosSessionStorage();

    if (!dadosSalvos.length) {
        console.log("Nenhum dado encontrado no sessionStorage, carregando da API...");
        dadosSalvos = await load_pedidos();
    }

    if (!Array.isArray(dadosSalvos)) {
        console.error("Erro: os dados carregados não são um array.");
        if (container) container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    console.log("Dados completos antes do filtro:", dadosSalvos);

    // Filtrar pedidos por cliente
    const filtered_pedidos = dadosSalvos.filter(item => item.SKU_CLIENTE === cliente);
    console.log("Pedidos filtrados:", filtered_pedidos);

    // Remover duplicados com base no campo PEDIDO
    const pedidosSemDuplicados = removerDuplicados(filtered_pedidos, "PEDIDO");
    console.log("Pedidos filtrados e sem duplicados:", pedidosSemDuplicados);

    // Salvar os pedidos filtrados e sem duplicados no sessionStorage
    try {
        const compressedFiltered = LZString.compress(JSON.stringify(pedidosSemDuplicados));
        sessionStorage.setItem("pedidos_filtrados", compressedFiltered);
        console.log("Pedidos filtrados e sem duplicados salvos no sessionStorage:", pedidosSemDuplicados);
    } catch (error) {
        console.error("Erro ao salvar os pedidos filtrados no sessionStorage:", error);
    }

    // Renderizar os pedidos
    renderPedidos(pedidosSemDuplicados);
}

// Função para remover duplicados com base em um campo específico
function removerDuplicados(array, campoUnico) {
    console.log(`Removendo duplicados com base no campo: ${campoUnico}`);
    const itensUnicos = new Map();
    array.forEach(item => {
        if (!itensUnicos.has(item[campoUnico])) {
            itensUnicos.set(item[campoUnico], item);
        } else {
            console.log(`Item duplicado encontrado:`, item);
        }
    });
    return Array.from(itensUnicos.values());
}

// Função para carregar pedidos da API e armazená-los no sessionStorage
async function load_pedidos() {
    try {
        const response = await fetch("https://api-webstore.onrender.com/vendas");
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        
        const tabela = await response.json();
        console.log("Dados recebidos da API:", tabela);

        if (!Array.isArray(tabela)) throw new Error("Formato de dados inválido.");

        const compressedData = LZString.compress(JSON.stringify(tabela));
        sessionStorage.setItem("pedidos", compressedData);
        console.log("Dados salvos no sessionStorage:", tabela);

        return tabela;
    } catch (error) {
        console.error("Erro ao obter os Pedidos:", error);
        return [];
    }
}

// Função para carregar pedidos armazenados no sessionStorage
function carregarPedidosSessionStorage() {
    try {
        const compressedFiltered = sessionStorage.getItem("pedidos_filtrados");
        if (compressedFiltered) {
            const dadosFiltrados = JSON.parse(LZString.decompress(compressedFiltered));
            console.log("Dados filtrados carregados do sessionStorage:", dadosFiltrados);
            return dadosFiltrados;
        }

        const compressedData = sessionStorage.getItem("pedidos");
        const dadosCompletos = compressedData 
            ? JSON.parse(LZString.decompress(compressedData)) 
            : [];
        console.log("Dados completos carregados do sessionStorage:", dadosCompletos);
        return dadosCompletos;
    } catch (error) {
        console.error("Erro ao carregar dados do sessionStorage:", error);
        return [];
    }
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

    console.log("Renderizando pedidos na tabela:", pedidos);

    // Criação da tabela
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = tabela.querySelector("tbody");

    pedidos.forEach(pedido => {
        const tr = document.createElement("tr");

        const tdpedido = document.createElement("td");
        tdpedido.textContent = pedido.PEDIDO;

        const tdstatus = document.createElement("td");
        tdstatus.textContent = pedido.STATUS;

        tr.appendChild(tdpedido);
        tr.appendChild(tdstatus);

        tbody.appendChild(tr);
    });

    container.innerHTML = "";
    container.appendChild(tabela);
}

// Chamar a função principal para carregar a página
load_tela();
