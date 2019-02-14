const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  imgPath: { type: String, default: 'https://assets.alfaconcursos.com.br/assets/gravatar-05682df21c0a7aeb3c40dfe27317390c7310900783d337d336f54e3b7f125ed2.png' },
  imgName: { type: String, default: 'images/default-avatar.png' },
  linkedin: String,
  github: String,
  description: String
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;