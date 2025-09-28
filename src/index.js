import express from 'express'
const cors = require('cors')
import bodyParser from 'body-parser'
import userController from './controllers/user'
import connectDB from './utils/database.js'; // Ajuste o caminho conforme necessário
const app = express()
const port = 90

// =========================================================
// ATENÇÃO: COLOQUE AQUI, LOGO APÓS A CRIAÇÃO DO APP
// =========================================================

// 2. ATIVA o middleware CORS. 
// Isso permite que navegadores aceitem respostas do seu backend
app.use(cors());

// É essencial que você também tenha o middleware para JSON:
app.use(express.json()); 

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userController)

// ---------------------------------------------------------
// 🚀 INICIALIZAÇÃO CORRETA DO SERVIDOR
// ---------------------------------------------------------

const startServer = async () => {
    try {
        // 1. ESPERA A CONEXÃO COM O MONGODB
        // Se a conexão falhar aqui, o bloco catch será ativado.
        await connectDB(); 

        // 2. SE A CONEXÃO FOR UM SUCESSO, INICIA O SERVIDOR HTTP
        app.listen(port, () => {
            console.log(`✅ Servidor HTTP rodando em http://localhost:${port}`);
        });

    } catch (error) {
        // Se a conexão falhar (string errada, permissão de rede, etc.)
        console.error("❌ FALHA CRÍTICA: Conexão com o Banco de Dados falhou.");
        console.error(error);
        // Encerra o processo Node.js
        process.exit(1);
    }
}

// 3. CHAMA A FUNÇÃO DE INICIALIZAÇÃO
startServer();

/*app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})
*/

