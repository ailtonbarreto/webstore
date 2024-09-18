

fetch('https://api-rhmw.onrender.com/')
    .then(response => response.json())
    .then(data => {
        
        console.log(data);

        // let nome = document.querySelector('.nome');
        // let imagem = document.querySelector('.imagem');
        // nome.innerHTML = data[3].DESCRICAO;
        // imagem.src = data[3].IMAGEM;
     
    })
    .catch(error => {
        console.error("Erro ao buscar os dados:", error);
    });
