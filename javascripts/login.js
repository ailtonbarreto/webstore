document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let logged = ""; // Defina a variável fora do escopo do if/else

    fetch('./database/keys.json')
        .then(response => response.json())
        .then(data => {
            const validUsername = data.user;
            const validPassword = data.password;

            if (username === validUsername && password === validPassword) {
                window.location.href = './index.html';
                logged = "1"; // Modifique a variável aqui
            } else {
                // document.getElementById('message').innerText = "Usuário ou senha incorretos!";
                window.location.href = './index.html';
                logged = "0"; // Modifique a variável aqui
            }

            localStorage.setItem("logged", logged); // Agora 'logged' será setada corretamente
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});
