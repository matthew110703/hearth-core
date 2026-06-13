import mongoose from 'mongoose'

const essenceFileSchema = new mongoose.Schema({
  path:          { type: String, default: null },
  lastUpdatedAt: { type: Date,   default: null }
}, { _id: false })

const userSchema = new mongoose.Schema({
  name:                 { type: String, required: true, trim: true },
  email:                { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:         { type: String, required: true },
  publicKey:            { type: String, required: true },
  encryptedPrivateKey:  { type: String, required: true },
  salt:                 { type: String, required: true },
  essenceFile:          { type: essenceFileSchema, default: () => ({}) },
  refreshToken:         { type: String, default: null }
}, { timestamps: true })

userSchema.index({ email: 1 })

export const User = mongoose.model('User', userSchema)
