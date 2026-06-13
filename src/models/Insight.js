import mongoose from 'mongoose'

const insightSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true, index: true },
  personId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Person', default: null },
  type:        { type: String, required: true, enum: ['person', 'user'] },
  source:      { type: String, required: true, enum: ['ai', 'user'] },
  content:     { type: String, required: true },  // encrypted
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true })

insightSchema.index({ userId: 1, personId: 1 })
insightSchema.index({ userId: 1, generatedAt: -1 })

export const Insight = mongoose.model('Insight', insightSchema)
