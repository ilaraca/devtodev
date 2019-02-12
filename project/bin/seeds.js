const mongoose = require('mongoose');
const Course = require('../models/Course');

const dbName = 'devtodev-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const courses = [
  {
    name: 'Javascript'
  },
  {
    name: 'Phyton'
  },
  {
    name: 'Cobol'
  },
  {
    name: 'HTML'
  },
  {
    name: 'CSS'
  }
];

Course.create(courses, (err) => {
  if (err) {throw (err)}
  console.log(`Created ${courses.length} courses`);
  mongoose.connection.close();
});
