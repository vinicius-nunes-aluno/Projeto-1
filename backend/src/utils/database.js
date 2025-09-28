import mongoose from "mongoose"

const URI = 'mongodb+srv://nissinhomentiara:MXIt4RK6tgwfyE1u@cluster2.8gdoscg.mongodb.net/'

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection