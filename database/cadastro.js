const url = "https://script.google.com/macros/s/AKfycbzip6oqZHCL4MVppcwu0GhIKYfLc614rMWsnlKLYfrp8I04pnf7MlKDrWNuK_7jGm3x3A/exec";

let dados_formulario = document.forms["formcadastro"]


fetch(url, {method: 'POST', body: new FormData(dados_formulario)})
.then(response => {
    console.log(response); // Adicione isso para verificar a resposta
    return response.text(); // Para converter a resposta em texto
})
.then(data => {
    alert("Dados enviados com Sucesso! " + data);
    dados_formulario.reset();
})
.catch(error => {
    console.error("Falha:", error);
});


