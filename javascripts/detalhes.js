document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pedidoId = urlParams.get("pedido") || localStorage.getItem("pedido_selecionado");

    if (!pedidoId) {
        document.getElementById("detalhes-container").innerHTML = "<p>Pedido não encontrado.</p>";
        return;
    }

    try {
        const response = await fetch(`https://api-webstore.onrender.com/pedido/${pedidoId}`);
        if (!response.ok) throw new Error("Erro ao obter os detalhes do pedido.");

        const pedido = await response.json();
        
        document.getElementById("detalhes-container").innerHTML = `
            <h2>Pedido: ${pedido.PEDIDO}</h2>
            <p>Data: ${pedido.EMISSAO}</p>
            <p>Entrega Prevista: ${pedido.ENTREGA}</p>
            <p>QTD: ${pedido.QTD}</p>
            <P>SKU: ${pedido.SKU}</P>
            <p>VALOR UNITÁRIO: ${pedido.VR_UNIT}</p>
            <p>STATUS: ${pedido.STATUS}</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar detalhes do pedido:", error);
        document.getElementById("detalhes-container").innerHTML = "<p>Erro ao carregar os detalhes do pedido.</p>";
    }
});
