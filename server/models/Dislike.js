const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
<<<<<<< HEAD
        ref: 'Video'
=======
        ref: 'Product'
>>>>>>> 7950d7c671386bdf69294fdbcf5fd51062878c70
    }

}, {timestamps: true})

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }