const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  age: {
    type: String,
  },
  location: {
    type: String,
  },
  followed: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  ]
}, {
  timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);