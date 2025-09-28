import mongoose from 'mongoose'

const PublicationSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  pages:        { type: Number, required: true },
  publishDate:  { type: Date,   required: true },
  category:     { type: String, required: true },
  organizer:    { type: String, required: true },
  introduction: { type: String, required: true },
  cover:        { type: String },
  contentFile:  { type: String, required: true }
}, { timestamps: true })

export default mongoose.models.Publication ||
       mongoose.model('Publication', PublicationSchema)

///trim: true/
