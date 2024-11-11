document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os dados do formulário
    const formData = {
        razao: document.getElementById('razao').value,
        cnpj: document.getElementById('cnpj').value,
        CIDADE: document.getElementById('CIDADE').value,
        UF: document.getElementById('UF').value,
        password: document.getElementById('password').value,
        passwordConfir: document.getElementById('password-confir').value
    };

    // Envia os dados para o endpoint
    try {
        const response = await fetch('https://seu-endpoint.com/inserircliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Verifica a resposta
        if (response.ok) {
            const data = await response.json();
            alert('Cliente cadastrado com sucesso!');
        } else {
            const errorData = await response.json();
            alert(`Erro ao cadastrar cliente: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao enviar o formulário.');
    }
});

