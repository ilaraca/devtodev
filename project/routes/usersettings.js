const express = require('express');
const Location = require('../controllers/location');
const User = require('../models/User');
const Course = require('../models/Course');

const router = express.Router();
const loc = new Location();

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
      console.log(courses)
      User.find({ _id: user.id })
        .populate('Course')
        .then(() => { 
          res.render('users/settings', { courses, user });
        })
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/settings', (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { name, email } = req.body;
  const courses = req.body.course;
  if (typeof courses !== 'string') {
    courses.forEach((course) => {
      User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [] } })
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
    User.findByIdAndUpdate({ _id: userId }, { $set: { name, email, course: [] } })
      .then(() => {
        User.findByIdAndUpdate({ _id: userId }, { $push: { courses } })
          .then(() => {
            res.redirect('/');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
  // const userUpdate = User.findByIdAndUpdate({ _id: userId }, { $set: { name, email } });
  // Promise.all(userUpdate)
  //   .then(() => {
  //     courses.forEach((course) => {
  //       Course.findByIdAndUpdate({ _id: course }, { $push: { user: userId } });
  //     })
  //       .then(() => {
  //         res.redirect('/');
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });

// Course.update({ _id: courseId }, { $push: { user }})
//   .then(() => {
//     loc.getLatLong(street, city, number)
//       .then((location) => {
//         const getLocation = location.data.results[0].geometry.location;
//         const lat = getLocation.lat
//         const long = getLocation.lng;
//         User.update({ _id: user }, { $set: { location: { lat, long, street, number, city } } });
//         res.redirect('/');
//       })
//       .catch(err => console.log(err));
//   });

// let { street, number, city } = req.body;
//   street = street.split(' ').join('');
//   city = city.split(' ').join('');
//   loc.getLatLong(street, city, number)
//     .then((location) => {
// const getLocation = location.data.results[0].geometry.location;

// router.get('/launderers', (req, res, next) => {
//   User.find({ isLaunderer: true }, (err, launderersList) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     res.render('laundry/launderers', {
//       launderers: launderersList
//     });
//   });
// });

// router.get('/launderers/:id', (req, res, next) => {
//   const laundererId = req.params.id;

//   User.findById(laundererId, (err, theUser) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     res.render('laundry/launderer-profile', {
//       theLaunderer: theUser
//     });
//   });
// });

// router.post('/laundry-pickups', (req, res, next) => {
//   const pickupInfo = {
//     pickupDate: req.body.pickupDate,
//     launderer: req.body.laundererId,
//     user: req.session.currentUser._id
//   };

//   const thePickup = new LaundryPickup(pickupInfo);

//   thePickup.save((err) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     res.redirect('/dashboard');
//   });
// });

module.exports = router;
