// scripts/script_cadastro.js

// 1. Defina a URL BASE do seu Backend (Porta 90)
const BASE_URL = 'http://localhost:90'; 

// 2. Seleciona o formulário principal e o botão de continuar
// Nota: O seu HTML usa <form action="#">, então vamos pegar o elemento <form>
const formElement = document.querySelector('.form form'); 

// 3. Adiciona um event listener para o evento de SUBMIT do formulário
formElement.addEventListener('submit', async (e) => {
    // Impede o comportamento padrão do formulário (recarregar a página ou navegar)
    e.preventDefault(); 

    // 4. Coleta os valores de todos os campos
    const name = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    // O campo Matrícula está como 'number' no HTML, mas deve ser o 'uniqueid' no backend
    const uniqueid = document.getElementById('number').value; 
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // 5. Coleta o campo 'role' (Papel: Aluno ou Professor)
    let role = '';
    if (document.getElementById('student').checked) {
        role = 'aluno';
    } else if (document.getElementById('teacher').checked) {
        role = 'professor';
    }

    // =======================================================
    // VALIDAÇÕES FRONTE-END ESSENCIAIS
    // =======================================================
    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        // Opcional: Limpar os campos de senha
        document.getElementById('password').value = '';
        document.getElementById('confirmPassword').value = '';
        return; // Interrompe o processo de envio
    }

    if (!role) {
        alert('Por favor, selecione se você é Aluno ou Professor.');
        return; // Interrompe o processo de envio
    }
    
    // 6. Monta o objeto de dados (Payload) para o Backend
    const userData = {
        name,
        lastname,
        email,
        uniqueid, // Mapeia o campo 'number' do HTML para 'uniqueid' do Backend
        password,
        role      // 'aluno' ou 'professor'
    };

    try {
        // 7. Faz a requisição POST para a rota de cadastro
        // Assumindo que sua rota de cadastro no Controller é '/user/register' ou similar
        const response = await fetch(`${BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // 8. Processa a resposta
        const result = await response.json();

        if (response.ok) {
            // Sucesso: 201 Created
            console.log('Cadastro bem-sucedido!', result);
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de Login.');
            
            // 9. Redirecionamento após o sucesso (conforme seu fluxo)
            window.location.href = 'login.html'; 
            
        } else {
            // Erro: 400 Bad Request, 500 Internal Server Error, etc.
            console.error('Falha no Cadastro:', result.message);
            // Mostra a mensagem de erro específica do backend (ex: "E-mail já cadastrado")
            alert('Erro ao cadastrar: ' + (result.message || 'Erro desconhecido no servidor.'));
        }

    } catch (error) {
        // Trata erros de rede
        console.error('Erro de conexão ou requisição:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
    }
});