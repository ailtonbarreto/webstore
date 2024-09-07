document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    
    // Pega os valores do input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Exemplo simples de validação
    const validUsername = "ailton";
    const validPassword = "071954";

    if (username === validUsername && password === validPassword) {
        document.getElementById('message').innerText = "Login bem-sucedido!";
        // Aqui você poderia redirecionar para outra página:
        // window.location.href = 'index2.html';
    } else {
        document.getElementById('message').innerText = "Usuário ou senha incorretos!";
    }
});
