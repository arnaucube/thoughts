var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/*var tvshowSchema = new Schema({
  title:    { type: String },
  year:     { type: Number },
  country:  { type: String },
  poster:   { type: String },
  seasons:  { type: Number },
  genre:    { type: String, enum:
  ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
        },
  summary:  { type: String }
});*/

var userSchema = new Schema({
    username: { type: String },
    password: { type: String },
    description:   { type: String },
    avatar:   { type: String },
    mail:   { type: String },
    admin: { type: Boolean }
})
module.exports = mongoose.model('userModel', userSchema);
