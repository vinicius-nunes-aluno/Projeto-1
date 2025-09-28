import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import userController from './controllers/user.js'
import publicationRoutes from './routes/publicationRoutes.js'

const app = express()
const port = 2018

app.use(bodyParser.json())
app.use(cors()) //

app.use('/user', userController)

// 🔹 Servir a pasta de uploads
app.use('/uploads', express.static('uploads'))

// Rotas de publicação
app.use('/api/publications', publicationRoutes)

app.listen(port, () => {
  console.log(`App rodando em http://localhost:${port}`)
})