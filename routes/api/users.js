const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// user profile

const validateUpdateUserInput = require('../../validation/update_dream');

router.get('/user/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ nouserfound: 'No user found with specified id'}))
})

router.post('/array', (req, res) => {
  User.find({ _id: { $in: req.body.userIds } })
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: 'No users found with ids in the given list'}))
})

router.patch('/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUpdateUserInput(req.body);

    if (!isValid) {
      return res.json.status(400).json(errors);
    }

    var query = { _id: req.params.userId },
        update = { $set: req.body },
        options = { new: true }

    User.findOne(query)
      .then(user => {
        if (user._id != req.user.id) {
          res.status(400).json({ userauth: 'You can only update your own user information'})
        } else {
          User.findOneAndUpdate(query, update, options, (err, user) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.json(user);
            }
          })
        }
      })
      .catch(err => res.status(404).json({ nouserfound: 'No user found with that ID' }))
  }
)

// follow

router.get('/followed/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then(user => res.json(user.followed))
    .catch(err => res.status(404).json({ nouserfound: 'No user found with that userId'}))
})

router.get('/followers/:userId', (req, res) => {
  User.findOne({ _id: req.params.userId })
    .then(user => res.json(user.followers))
    .catch(err => res.status(404).json({ nouserfound: 'No user found with that userId'}))
})

router.post('/follow/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const queries = []

    var queryParams1 = { _id: req.params.userId },
        update1 = { $addToSet: { followers: req.user.id }},
        options = { new: true }
    queries.push(User.findOneAndUpdate(queryParams1, update1, options).exec())

    var queryParams2 = { _id: req.user.id },
        update2 = { $addToSet: { followed: req.params.userId }}
    queries.push(User.findOneAndUpdate(queryParams2, update2, options).exec())

    Promise.all(queries).then(results => res.json(results));
  }
)

router.delete('/follow/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const queries = []

    var queryParams1 = { _id: req.params.userId },
        update1 = { $pull: { followers: req.user.id }},
        options = { new: true }
    queries.push(User.findOneAndUpdate(queryParams1, update1, options).exec())

    var queryParams2 = { _id: req.user.id },
        update2 = { $pull: { followed: req.params.userId }}
    queries.push(User.findOneAndUpdate(queryParams2, update2, options).exec())

    Promise.all(queries).then(results => res.json(results));
  }
)

// uauth

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username
  });
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        errors.username = 'Username is taken';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                const payload = { id: user.id, username: user.username };

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username})
    .then(user => {
      if(!user) {
        errors.username = 'User not found';
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, username: user.username};

            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            errors.password = 'Incorrect password'
            return res.status(400).json(errors);
          }
    });
  });
});

module.exports = router; 