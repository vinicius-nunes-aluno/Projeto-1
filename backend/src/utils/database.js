import mongoose from "mongoose"

const URI = 'mongodb+srv://admin:JuqOZAX9QrBInXgE@cluster0.zashxsd.mongodb.net/'

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection