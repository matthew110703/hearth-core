import mongoose from 'mongoose'

const auraFieldSchema = new mongoose.Schema({
  scale: { type: Number, default: null, min: 1, max: 5 },
  label: { type: String, default: null, enum: ['very_low', 'low', 'medium', 'high', 'very_high', null] }
}, { _id: false })

const auraSchema = new mongoose.Schema({
  mood:        { type: auraFieldSchema, default: () => ({}) },
  stressLevel: { type: auraFieldSchema, default: () => ({}) },
  energy:      { type: auraFieldSchema, default: () => ({}) },
  confidence:  { type: auraFieldSchema, default: () => ({}) },
  motivation:  { type: auraFieldSchema, default: () => ({}) }
}, { _id: false })

const logSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title:         { type: String, default: null, trim: true },
  content:       { type: String, required: true },  // encrypted rich text
  peopleTagged:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  aura:          { type: auraSchema, default: () => ({}) },
  loggedAt:      { type: Date, default: Date.now }
}, { timestamps: true })

logSchema.index({ userId: 1, loggedAt: -1 })
logSchema.index({ userId: 1, peopleTagged: 1 })

export const Log = mongoose.model('Log', logSchema)
