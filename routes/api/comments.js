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

        var query = {_id: req.params.dreamId}

        Dream.findOne(query)
          .then(dream => {
            const newComment = new Comment({
              userId: req.user.id,
              username: req.user.username,
              dreamId: req.params.dreamId,
              comment: req.body.comment
            })

            newComment.save().then(comment => {
              var update = { $push: { comments: comment._id } },
                  options = { new: true }
              Dream.findOneAndUpdate(query, update, options, (err, dream) => {
                if (err) {
                  res.status(400).json(err)
                } else {
                  res.json({
                    comment,
                    dream
                  })
                }
              })
            })
          })
          .catch(err => 
            res.status(404).json({err})
          )
    }
);

// read

router.get('/:commentId', (req, res) => {
  Comment.findOne({_id: req.params.commentId})
    .sort({date: -1})
    .then(comment => res.json(comment))
    .catch(err => res.status(404).json({ nocommentfound: 'No comment found with the specified id'}))
});

router.get('/dream/:dreamId', (req, res) => {
  Comment.find({dreamId: req.params.dreamId})
    .sort({date: -1})
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentsfound: 'This dream has no comments'}))
});

router.get('/user/:userId', (req, res) => {
  Comment.find({userId: req.params.userId})
    .sort({date: -1})
    .then(comments => res.json(comments))
    .catch(err => res.status(404).json({ nocommentsfound: 'This user has no comments'}))
});

// update

router.patch('/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    var query = { _id: req.params.commentId },
        update = { comment: req.body.comment },
        options = { new: true }

    Comment.findOne(query)
      .then(comment => {
        
        if (comment.userId != req.user.id ) {
          res.status(400).json({ userauth: 'You can only edit your own comments'})
        } else {
          Comment.findOneAndUpdate(query, update, options, (err, comment) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.json(comment);
            }
          })
        }

      })
      .catch(err => res.status(400).json(err))
  }
)

// delete

router.delete('/:commentId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findOne({ _id: req.params.commentId })
      .then(comment => {
        
        if (comment.userId != req.user.id) {
          res.status(400).json({ userauth: 'You can only delete your own comments'})
        } else {

          Comment.deleteOne({ _id: req.params.commentId }, (err) => {
            if (err) {
              res.status(404).json({err}) 
            }
          })
          .then(() => {
            var query = { _id: comment.dreamId },
              update = { $pull: { comments: mongoose.Types.ObjectId(req.params.commentId) } },
              options = { new: true }

            Dream.findOneAndUpdate(query, update, options, (err, dream) => {
              
              if (err) {
                res.status(404).json({err});
              } else {
                res.json({
                  commentId: req.params.commentId,
                  dream: dream
                })
              }

            })

          })

        }
      })
      .catch(err => res.status(400).json(err))
  }
)

module.exports = router; 