document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let logged = 0;

    fetch('./database/keys.json')
        .then(response => response.json())
        .then(data => {
            const validUsername = data.user;
            const validPassword = data.password;

            if (username === validUsername && password === validPassword) {
                window.location.href = './index.html';
                logged = "1";
            } else {
            
                // window.location.href = './index.html';
                logged = "0";
                alert("Usuário ou Senha incorretos!")
            }

            localStorage.setItem("logged", logged);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});
