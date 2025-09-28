import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

// 1. Definição do Schema (OK)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    uniqueid: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false},
    role: { type: String, required: true, enum: ['aluno', 'professor']},
    createdAt: { type: Date, default: Date.now}
});


// =======================================================
// 2. DEFINIÇÃO DO MIDDLEWARE (Hook) - DEVE SER O PRIMEIRO HOOK
// =======================================================
UserSchema.pre('save', async function(next) {
    const user = this;

    // Se a senha não foi modificada ou é um novo documento, pula o hashing
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


// =======================================================
// 3. DEFINIÇÃO DO MÉTODO DE INSTÂNCIA
// =======================================================
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Se a busca na sua rota de login usou .select('+password'), 'this.password' estará disponível.
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


// =======================================================
// 4. CRIAÇÃO E EXPORTAÇÃO DO MODELO (DEVE SER O ÚLTIMO PASSO)
// =======================================================
// A sintaxe a seguir é a forma recomendada para evitar a redefinição de modelo
// (útil para ambientes como Next.js/Vercel, mas boa prática geral).
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;