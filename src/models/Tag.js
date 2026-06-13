import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name:         { type: String, required: true, trim: true },
  scope:        { type: String, required: true, enum: ['person', 'echo'] },
  isPredefined: { type: Boolean, default: false }
}, { timestamps: true })

tagSchema.index({ userId: 1, scope: 1 })
tagSchema.index({ userId: 1, name: 1 }, { unique: true })

export const Tag = mongoose.model('Tag', tagSchema)
