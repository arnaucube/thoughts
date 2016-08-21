var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var thoughtSchema = new Schema({
    time: { type: String },
    content:   { type: String },
    username: { type: String },
    fav: { type: String }, //array amb els users que posen fav
    avatar: { type: String }
})
module.exports = mongoose.model('thoughtModel', thoughtSchema);
