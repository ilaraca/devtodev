const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  imgPath: String,
  imgName: String,
  linkedin: String,
  github: String,
  description: String
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
