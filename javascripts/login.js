document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('keys.json')
        .then(response => response.json())
        .then(data => {

            const validUsername = data.user;
            const validPassword = data.password;


            if (username === validUsername && password === validPassword) {
                window.location.href = './login-sucess.html';
            } else {
                document.getElementById('message').innerText = "Usuário ou senha incorretos!";
            }
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});



// FUNCAO PEGAR DADOS

// const url = 'https://script.google.com/macros/s/AKfycbw495fveSWtSytsZ8Hi9wLXeEX69-L78GgtniGMzAIw6FoTAIMGTmmCMzdOXC7dFZAJxA/exec';
// const formulario = document.forms['loginForm'];

// // const url = 'https://jsonplaceholder.typicode.com/posts';

// formulario.addEventListener('submit', function (e) {
//     e.preventDefault();

//     fetch(url, { 
//         method: 'POST', 
//         mode: 'no-cors',
//         body: new FormData(formulario) 
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro na resposta da rede');
//         }
//         return response.json(); 
//     })
//     .then(data => {
//         alert('Dados enviados com sucesso: ' + JSON.stringify(data));
//         formulario.reset();
//     })
//     .catch(error => {
//         console.error('Erro no envio dos dados', error);
//         alert('Erro ao enviar os dados: ' + error.message);
//     });
// });
