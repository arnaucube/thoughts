var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var thoughtSchema = new Schema({
    time: { type: String },
    content:   { type: String },
    authorname:   { type: String }
})
module.exports = mongoose.model('thoughtModel', thoughtSchema);
