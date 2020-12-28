const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DreamSchema = new Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  tags: [
    { type: ObjectId, ref: 'Tag' }
  ],
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = User = mongoose.model('Dream', DreamSchema);