async function load_pedidos() {

    try {
        const response = await fetch("https://api-webstore.onrender.com/vendas");
        if (!response.ok) throw new Error("Erro ao obter os dados da API.");
        
        const tabela = await response.json();
        sessionStorage.setItem("pedidos", JSON.stringify(tabela));
        console.log("Dados obtidos com sucesso:", tabela);
        return tabela;

    } catch (error) {
        console.error("Erro ao carregar pedidos da API:", error);
        return null;
    }
    
}

load_pedidos();
