const mongoose = require('mongoose');

const  Schema  = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  location: { lat: String, long: String, street: String, number: Number, city: String }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;