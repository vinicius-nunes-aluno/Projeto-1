import { Router } from "express"
import User from '../models/user.js'; // Ajuste o caminho
import bcrypt from "bcryptjs";
import { listUsers, createUser, deleteUser, updateUser } from "../services/user"
const saltRounds = 10; 

async function loginUser(req, res) {
    // 1. Recebe 'uniqueid' (Matrícula) e 'password' do corpo da requisição
 const { uniqueid, password } = req.body; 

    // Verifique se o campo de identificação existe (uniqueid OU email)
    // Para simplificar, vou assumir que o frontend envia 'uniqueid' no body da requisição
    if (!uniqueid || !password) {
        return res.status(400).json({ message: 'Matrícula e senha são obrigatórios.' });
    }

    try {
        // 2. Busca o usuário pelo campo de Matrícula (uniqueid)
        // O campo 'uniqueid' deve ser usado aqui.
     const user = await User.findOne({ uniqueid }).select('+password').lean();


         if (!user) {
             return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
             return res.status(401).json({ message: 'Credenciais inválidas.' });
         }

         // Sucesso!
         return res.status(200).json({ 
             message: 'Login realizado com sucesso!', 
             userId: user._id 
         });

     } catch (error) {
         console.error(error);
         return res.status(500).json({ message: 'Erro interno do servidor.' });
     }
}

const registerUser = async (req, res) => {
    try {
        // 1. Desestruturar os dados do BODY da requisição (JSON do front-end)
        const { name, lastname, email, uniqueid, password, role } = req.body;

        // 2. Validação Básica de Presença
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        
        // O Mongoose já garante a unicidade de email/uniqueid (ver passo 4)
        // mas é bom ter uma verificação mais direta para feedback.

        // 3. Gerar a HASH da Senha
        /*const hashedPassword = await bcrypt.hash(password, saltRounds);*/

        // 4. Criar a Nova Instância do Usuário
        const newUser = new User({
            name,
            lastname,
            email,
            uniqueid,
            password: password, // Salva a HASH!
            role
        });

        // 5. Salvar o Usuário no MongoDB
        await newUser.save();

        // 6. Resposta de Sucesso
        // Status 201 é o ideal para "Created" (Criado)
        return res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!', 
            userId: newUser._id 
        });

    } catch (error) {
        // 7. Tratamento de Erro (Geral e Unicidade)
        console.error("Erro no cadastro:", error);
        
        // Verifica se é um erro de unicidade do MongoDB (código 11000)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(409).json({ // 409 Conflict
                message: `Este ${field} já está em uso.`,
                field: field
            });
        }
        
        // Erro genérico do servidor
        return res.status(500).json({ message: 'Falha interna ao processar o cadastro.' });
    }
};

/*module.exports = {
    registerUser
};
*/

const router = Router()

// ROTA DE AUTENTICAÇÃO
router.post('/login', loginUser) // ⬅️ Rota adicionada

router.post('/register', registerUser) // <-- Rota de cadastro adicionada

// ROTAS DE CRUD DE USUÁRIO

router.get('/', async (req, res) => {
    const userList = await listUsers()
    res.send(userList)
})

router.post('/', async (req, res) => {
    try {
        const user = await createUser(req.body)
        res.status(201).send(user)

    } catch (err) {
        // Enviar apenas a mensagem de erro ou usar um middleware de tratamento de erro
        res.status(400).send({ message: err.message }) 
    }

})

router.delete('/:userId', async (req, res) => {
    await deleteUser(req.params.userId)
    res.status(204).send() // Status 204 No Content é o padrão para DELETE bem-sucedido

})

router.put('/:userId', async (req, res) => {
    await updateUser(req.params.userId, req.body)
    res.status(200).send() // Ou retorne o objeto atualizado

})

export default router