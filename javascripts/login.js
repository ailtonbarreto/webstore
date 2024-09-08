document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    //validacao
    const validUsername = "ailton";
    const validPassword = "071954";

    if (username === validUsername && password === validPassword) {
        document.getElementById('message').innerText = "Login bem-sucedido!";
       
        window.location.href = './login-sucess.html';
    } else {
        document.getElementById('message').innerText = "Usuário ou senha incorretos!";
    }
});


