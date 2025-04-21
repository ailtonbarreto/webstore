document.getElementById('newsletterForm').addEventListener('submit', async (event) => {
    event.preventDefault();


    const fullscreenSpinner = document.getElementById('fullscreenSpinner');
    fullscreenSpinner.style.display = 'flex';


    const nome = document.getElementById('nome').value;
    const fone = document.getElementById('fone').value;
    const email = document.getElementById('email').value;

    try {

        const response = await fetch('https://api-webstore.onrender.com/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, fone, email }),
        });


        if (response.ok) {
            const data = await response.json();
            alert('Cadastro realizado com sucesso!');
        } else {
            throw new Error('Falha ao cadastrar. Tente novamente.');
        }
    } catch (error) {

        alert(error.message);
        console.error('Erro:', error);
    } finally {
 
        fullscreenSpinner.style.display = 'none';
    }
});
