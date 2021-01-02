const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, //
        ref: 'users'
    },
    username: {
        type: String,
        required: true
    },
    dreamId: {
        type: Schema.Types.ObjectId, //
        ref: "dreams"
    },
    like: {
        type: Schema.Types.ObjectId, //
        ref: 'users'
    },
    date: {
        type: Date, 
        default: Date.now
    }
}, {
    timestamps: true
}); 

module.exports = Like = mongoose.model('Like', LikeSchema);