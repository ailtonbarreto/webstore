// Função principal para carregar a tela com os pedidos
async function load_tela() {
    const container = document.getElementById("pedidos-container");
    if (container) container.innerHTML = "<p class='title'>Carregando pedidos...</p>";

    let cliente = localStorage.getItem("sku_cliente");

    // Carregar dados salvos
    let dadosSalvos = carregarPedidosSessionStorage();

    if (!dadosSalvos.length) {
        dadosSalvos = await load_pedidos();
    }

    if (!Array.isArray(dadosSalvos)) {
        console.error("Erro: os dados carregados não são um array.");
        if (container) container.innerHTML = "<p>Erro ao carregar pedidos.</p>";
        return;
    }

    const filtered_pedidos = dadosSalvos.filter(item => item.SKU_CLIENTE === cliente);

    const pedidosSemDuplicados = removerDuplicados(filtered_pedidos, "PEDIDO");

    try {
        const compressedFiltered = LZString.compress(JSON.stringify(pedidosSemDuplicados));
        localStorage.setItem("pedidos_filtrados", compressedFiltered);
    } catch (error) {
        console.error("Erro ao salvar os pedidos filtrados no localStorage:", error);
    }

    renderPedidos(pedidosSemDuplicados);
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


function carregarPedidosSessionStorage() {
    try {
        const compressedFiltered = sessionStorage.getItem("pedidos_filtrados");
        if (compressedFiltered) {
            return JSON.parse(LZString.decompress(compressedFiltered));
        }

        const compressedData = sessionStorage.getItem("pedidos");
        return compressedData ? JSON.parse(LZString.decompress(compressedData)) : [];
    } catch (error) {
        console.error("Erro ao carregar dados do sessionStorage:", error);
        return [];
    }
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

    // Criar a tabela
    const tabela = document.createElement("table");
    tabela.setAttribute("border", "1");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Pedido</th>
                <th>Data</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = tabela.querySelector("tbody");

    pedidos.forEach(pedido => {
        const tr = document.createElement("tr");

        
        const tdpedido = document.createElement("td");
        tdpedido.textContent = pedido.PEDIDO;


        const tddata = document.createElement("td");
 
        const data = new Date(pedido.EMISSAO);

    
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const dia = String(data.getDate()).padStart(2, "0");

        const dataFormatada = `${dia}/${mes}/${ano}`;

        tddata.textContent = dataFormatada;

      
        const tdstatus = document.createElement("td");
        tdstatus.textContent = pedido.STATUS;

        tr.appendChild(tdpedido);
        tr.appendChild(tddata);
        tr.appendChild(tdstatus);


        tbody.appendChild(tr);
    });


    container.innerHTML = "";
    container.appendChild(tabela);
}


load_tela();
