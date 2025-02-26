const loginForm = document.getElementById("loginForm");
const loadingModal = document.getElementById("loading-modal");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    loadingModal.style.display = "flex";

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let logged = "0";

    fetch('./database/keys.json')
        .then(response => response.json())
        .then(config => {
            const apiUrl = config.tb_cliente;
            return fetch(apiUrl);
        })
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => 
                user.USER === username && 
                user.PASSWORD === password &&
                user.STATUS === 1
            );

            if (user) {
                logged = "1";
                localStorage.setItem("sku_cliente", user.SKU_CLIENTE);
                window.location.href = './index.html';
            } else {
                alert("Usuário ou Senha incorretos ou conta inativa!");
            }

            localStorage.setItem("logged", logged);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
            alert("Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.");
        })
        .finally(() => {
            loadingModal.style.display = "none";
        });
});
