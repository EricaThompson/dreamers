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
<<<<<<< HEAD
  likes: [{
    _id: false,
    id: {
    type: Schema.Types.ObjectId,
    ref: 'likes'
    }, 
    username: {
      type: String, 
      required: true, 
      unique: true
    }
  }],

=======
  comments: {
    type: Array,
    default: []
  },
>>>>>>> 3df26c33f5a7457a79d9b32c9551e5fd43a3379a
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

module.exports = Dream = mongoose.model('Dream', DreamSchema);