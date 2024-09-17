async function fetchProducts() {
    try {
        const response = await fetch('https://api-rhmw.onrender.com/').then(response => response.json());

        console.log(response);

    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
    }
}

// Chamando a função
fetchProducts();


// const dados = await fetch