const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Dream = require('../../models/Dream');
const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

// create
router.post('/:dreamId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Dream.find({_id: req.params.id})
          .then(dream => {
            const newComment = new Comment({
              userId: req.user.id,
              dreamId: req.params.dreamId,
              comment: req.body.comment
            })

            newComment.save().then(comment => res.json(comment));
          })
          .catch(err => 
            res.status(404).json({err})
          )
    }
)

// read

route.get('/:dreamId', (req, res) => {
  Comment.find({dreamId: dreamId})
    .sort({date: -1})
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentsfound: 'This dream has no comments'}))
})
// by id
// by user

// update


// delete

module.exports = router; 