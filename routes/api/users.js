const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

router.get('/test', (req, res) => {
    res.json({ msg: 'This is the user route'})
});

router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        return res.status(400).json({username: "A user has already registered with this username"})
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
                const payload = { id: user.id, handle: user.handle };

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
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username})
    .then(user => {
      if(!user) {
        return res.state(404).json({username: 'This user does not exist'});
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {id: user.id, handle: user.handle};

            jwt.sign(
              payload,
              keys.secretOrKey,
              // Tell the key to expire in one hour
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
          } else {
            return res.status(400).json({password: 'Incorrect password'});
          }
    });
  });
});

module.exports = router; 