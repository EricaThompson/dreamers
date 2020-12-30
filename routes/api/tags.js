const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Tag = require('../../models/Tag');
const validateTagInput = require('../../validation/tags');

// create

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTagInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    var query = {name: req.body.name},
        update = { lastUsed: new Date() },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }
    Tag.findOneAndUpdate(query, update, options, (err, tag) => {
      if (err) {
        res.status(404).json({err})
      } else {
        res.json(tag)
      }
    })
  }
);

// read

router.get('/', (req, res) => {
  Tag.find()
    .sort({lastUsed: -1})
    .then(tags => res.json(tags))
    .catch(err => res.status(404).json({ notagsfound: 'No tags found'}))
})

router.get('/:tag', (req, res) => {
  const regex = new RegExp(req.params.tag);
  Tag.find({ name: { $regex: regex }})
    .sort({lastUsed: -1})
    .then(tags => res.json(tags))
    .catch(err => res.status(404).json({ notagsfound: 'No matching tags found'}))
});

router.get('/exact/:tag', (req, res) => {
  Tag.findOne({name: req.params.tag})
    .then(tag => res.json(tag))
    .catch(err => res.status(404).json({ notagfound: 'No matching tag found'}))
})

// delete

router.delete('/:tag',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Tag.findOneAndDelete({ name: req.params.tag })
      .then(payload => res.json('Success'))
      .catch(err => res.json('Failure'))
  }
)

module.exports = router;