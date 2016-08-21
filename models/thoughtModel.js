var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var thoughtSchema = new Schema({
    time: { type: String },
    content:   { type: String },
    user_id: { type: String },
    fav: { type: String } //array amb els users que posen fav
})
module.exports = mongoose.model('thoughtModel', thoughtSchema);
