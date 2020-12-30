const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  lastUsed: {
    type: Date,
    default: Date.now
  }
})

module.exports = Tag = mongoose.model('Tag', TagSchema);