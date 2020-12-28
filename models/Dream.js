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
    { type: String }
  ],
  type: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = Dream = mongoose.model('Dream', DreamSchema);