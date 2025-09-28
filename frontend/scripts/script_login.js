// scripts/script_login.js

// 1. Defina a URL BASE do seu Backend
// O seu backend está configurado para rodar na porta 90 (http://localhost:90)
const BASE_URL = 'http://localhost:90'; 

// 2. Seleciona o formulário de login usando o ID que definimos no HTML
const loginForm = document.getElementById('loginForm');

// 3. Adiciona um event listener para o evento de SUBMIT do formulário
loginForm.addEventListener('submit', async (e) => {
    // Impede o comportamento padrão do formulário (recarregar a página)
    e.preventDefault(); 

    // 4. Coleta os dados do formulário
    const uniqueid = loginForm.uniqueid.value;
    const password = loginForm.password.value;

    // Objeto de dados a ser enviado para o Backend
    const loginData = {
        uniqueid: uniqueid,
        password: password
    };

    try {
        // 5. Faz a requisição POST para a rota de login
        // Assumindo que sua rota de login no Controller está em '/user/login'
        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                // Informa o backend que estamos enviando dados em formato JSON
                'Content-Type': 'application/json',
            },
            // Converte o objeto JavaScript em uma string JSON para envio
            body: JSON.stringify(loginData),
        });

        // 6. Processa a resposta do Backend
        const result = await response.json();

        if (response.ok) {
            // Se o status da resposta for 200 (sucesso)
            console.log('Login bem-sucedido!', result);
            alert('Login realizado com sucesso!');
            
                // ⭐️ NOVO: Redireciona para a página principal
            window.location.href = 'logado.html'; 
            
        } else {
            // Se o status for 401 (Credenciais Inválidas) ou outro erro
            console.error('Falha no Login:', result.message);
            alert('Erro ao fazer login: ' + (result.message || 'Erro desconhecido.'));
        }

    } catch (error) {
        // Trata erros de rede, servidor fora do ar, ou erro na requisição fetch
        console.error('Erro de conexão ou requisição:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
});

