import mongoose, { Schema } from 'mongoose'

const recordsSchema = new Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
  counts: [Number],
  createdAt: {
    type: Date
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

recordsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      key: this.key,
      value: this.value,
      counts: this.counts,
      createdAt: this.createdAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Records', recordsSchema)

export const schema = model.schema
export default model
