const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DreamSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required: true
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
  },
  comments: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = Dream = mongoose.model('Dream', DreamSchema);