import databaseConnection from '../utils/database'
import User from '../models/user'

export const listUsers = async () => {
    await databaseConnection ()
    const users = await User.find()
    return users
}

export const createUser = async (user) => {
    await databaseConnection ()
    const createdUser = await User.create(user)
    return createdUser
}
 
export const deleteUser = async (id) => {
    await databaseConnection ()
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, newBody) => {
    await databaseConnection ()
    await User.findByIdAndUpdate(id, newBody)
}