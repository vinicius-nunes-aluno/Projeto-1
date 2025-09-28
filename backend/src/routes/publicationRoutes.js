import express from 'express'
import upload from '../middlewares/upload.js'

// A linha abaixo foi corrigida para importar TODAS as funções necessárias
import { 
  createPublication, 
  getAllPublications, 
  updatePublication, 
  deletePublication 
} from '../controllers/publicationController.js'

const router = express.Router()

// --- ROTAS DO CRUD DE PUBLICAÇÕES ---

// Rota para CRIAR uma publicação (C do CRUD)
router.post('/', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'contentFile', maxCount: 1 }
]), createPublication)

// Rota para LER TODAS as publicações (R do CRUD)
router.get('/', getAllPublications)

// Rota para ATUALIZAR uma publicação (U do CRUD)
router.put('/:id', updatePublication)

// Rota para DELETAR uma publicação (D do CRUD)
router.delete('/:id', deletePublication)


export default router