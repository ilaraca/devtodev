const mongoose = require('mongoose');
const Course = require('../models/Courses');

const dbName = 'devtodev-project';
mongoose.connect(`mongodb://localhost/${dbName}`);

const courses = [
  {
    name: 'Javascript',
    iduser: []
  },
  {
    name: 'Phyton',
    iduser: []
  },
  {
    name: 'Cobol',
    iduser: []
  },
  {
    name: 'HTML',
    iduser: []
  },
  {
    name: 'CSS',
    iduser: []
  }
];

Course.create(courses, (err) => {
  if (err) {throw (err)}
  console.log(`Created ${courses.length} courses`);
  mongoose.connection.close();
});
