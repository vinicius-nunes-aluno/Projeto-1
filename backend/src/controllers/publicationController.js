import Publication from '../models/Publication.js'
import databaseConnection from '../utils/database'

export const createPublication = async (req, res) => {
  try {
    await databaseConnection()
    const { title, pages, publishDate, category, organizer, introduction } = req.body
    
    // Quando usamos upload.fields, os arquivos vêm em req.files (no plural)
    const coverFile = req.files.cover ? req.files.cover[0].filename : null
    const contentFile = req.files.contentFile ? req.files.contentFile[0].filename : null

    if (!contentFile) {
        return res.status(400).json({ error: 'O arquivo da publicação é obrigatório.' });
    }

    const publication = await Publication.create({
      title,
      pages,
      publishDate,
      category,
      organizer,
      introduction,
      cover: coverFile,       
      contentFile: contentFile 
    })

    res.status(201).json({
      message: 'Publicação criada com sucesso!',
      publication
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


export const getAllPublications = async (req, res) => {
  try {
    await databaseConnection()
    const publications = await Publication.find({})
    res.status(200).json(publications)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updatePublication = async (req, res) => {
  try {
    await databaseConnection() // 👈 2. CHAMAR A CONEXÃO AQUI
    const { id } = req.params
    const updatedData = req.body

    const updatedPublication = await Publication.findByIdAndUpdate(id, updatedData, { new: true })

    if (!updatedPublication) {
      return res.status(404).json({ message: 'Publicação não encontrada' })
    }

    res.status(200).json({
      message: 'Publicação atualizada com sucesso!',
      publication: updatedPublication
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deletePublication = async (req, res) => {
  try {
    await databaseConnection() // 👈 2. CHAMAR A CONEXÃO AQUI
    const { id } = req.params

    const deletedPublication = await Publication.findByIdAndDelete(id)

    if (!deletedPublication) {
      return res.status(404).json({ message: 'Publicação não encontrada' })
    }

    res.status(200).json({ message: 'Publicação deletada com sucesso!' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}