const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: String,
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

courseSchema.set('timestamps', true);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
