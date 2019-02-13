const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const Course = require('../models/Course');
const Comment = require('../models/Comment');

const upload = multer({ dest: './public/uploads/' });

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');
});

router.get('/settings', (req, res, next) => {
  const user = req.session.currentUser;
  Course.find()
    .then((courses) => {
      User.find({ _id: user._id })
        .populate('course', 'name')
        .then((user) => {
          user = user[0];
          const userCourses = user.course.map(item => item.name);
          const coursesOut = courses.slice().filter(item => !userCourses.includes(item.name));
          res.render('users/settings', { coursesOut, user });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/settings', upload.single('photo'), (req, res, next) => {
  const userId = req.session.currentUser._id;

  const { name, email, github, linkedin, description } = req.body;
  const courses = req.body.course;
  const imgPath = `/uploads/${req.file.filename}`;
  const imgName = req.file.originalname;
  console.log(description)

  if (typeof courses !== 'string') {
    courses.forEach((course) => {
      User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [], imgPath, imgName, github, linkedin, description } })
        .then(() => {
          User.findByIdAndUpdate({ _id: userId }, { $push: { course } })
            .then(() => {
              res.redirect('/');
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } else {
    User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [], imgPath, imgName, github, linkedin, description } })
      .then(() => {
        User.findByIdAndUpdate({ _id: userId }, { $push: { course: courses } })
          .then(() => {
            res.redirect('/');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  let comments;
  let teacher;
  const students = [];
  const promise = []
  User.find({ _id: id })
    .populate('comment')
    .then((user) => {
      teacher = user[0];
      comments = user[0].comment;
      comments.forEach((comment) => {
        promise.push(Comment.find({ _id: comment.id })
          .populate('student')
          .then((com) => {
            students.push(com[0].student);
          }));
      });
    })
    .then(() => {
      Promise.all(promise)
        .then(() => {
          console.log(students)
          res.render('users/index', { comments, teacher, students });
        })
    });
});

router.post('/:id', (req, res, next) => {
  const teacher = req.params.id;
  const student = req.session.currentUser._id;
  const content = req.body.comment;
  const comments = {
    content,
    student
  };

  const newComment = new Comment(comments);

  newComment.save();

  User.findByIdAndUpdate({ _id: teacher }, { $push: { comment: newComment.id } })
    .then(() => {
      res.redirect('/');
    });
});

module.exports = router;
