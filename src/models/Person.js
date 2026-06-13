import mongoose from 'mongoose'

const essenceFileSchema = new mongoose.Schema({
  path:          { type: String, default: null },
  lastUpdatedAt: { type: Date,   default: null }
}, { _id: false })

const personSchema = new mongoose.Schema({
  userId:             { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name:               { type: String, required: true, trim: true },
  gender:             { type: String, default: null },
  occupation:         { type: String, default: null },
  dateOfBirth:        { type: Date,   default: null },
  profileImage:       { type: String, default: null },
  traits:             [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  relationshipStatus: { type: String, default: null },
  essenceFile:        { type: essenceFileSchema, default: () => ({}) }
}, { timestamps: true })

personSchema.index({ userId: 1, name: 1 })

export const Person = mongoose.model('Person', personSchema)
