const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose'); 
const passport = require('passport'); 

const Dream = require('../../models/Dream');
const Like = require('../../models/Like');
const validateCreateDreamInput = require('../../validation/create_dream'); 
const validateUpdateDreamInput = require('../../validation/update_dream')

//create 
router.post('/:dreamId',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const {errors, isValid} = validateCreateDreamInput(req.body); 

        if (!isValid) {
            return res.status(400).json(errors); 
        }

        var query = {_id: req.params.dreamId}

        Dream.findOne(query)
            .then(dream => {

            const newLike = new Like ({
                userId: req.user.id,
                username: req.user.username, 
                dreamId: req.params.dreamId, //
                like: req.user.id
        })

        newLike.save().then(like => {
            var update = { $push: { likes: req.user._id }},
                options = { new: true }
            Dream.findOneAndUpdate(query, update, options, (err, dream) => {
                if (err) {
                    res.status(400).json(err)
                } else {
                    res.json({ 
                        dream,
                        like 
                    })
                    }
                })
            })
        })
        .catch(err => 
            res.status(400).json({err})
            )
    }
);

router.get('/:like', (req, res) => {
  Comment.findOne({_id: req.params.like})
    .sort({date: -1})
    .then(like => res.json(like))
    .catch(err => res.status(404).json({ nolikesfound: 'No like found with the specified id'}))
});

router.get('/dream/:dreamId', (req, res) => {
  Comment.find({dreamId: req.params.dreamId})
    .sort({date: -1})
    .then(likes => res.json(likes))
    .catch(err => res.status(404).json({ nolikesfound: 'This dream has no likes'}))
});

router.get('/user/:userId', (req, res) => {
  Comment.find({userId: req.params.userId})
    .sort({date: -1})
    .then(likes => res.json(likes))
    .catch(err => res.status(404).json({ nolikesfound: 'This user has no likes'}))
});

router.delete('/:like',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Like.findOne({_id: req.params.like})
            .then(like => {
                if (like.userId != req.user.id) {
                    res.status(400).json({ userauth: 'You can only edit your own likes'})
                } else {
                    Like.deleteOne({_id: req.params.like}, (err) => {
                        if (err) {
                            res.status(404).json({err})
                        }
                    })
                    .then(() => {
                        var query = {_id: like.dreamId},
                            update = {$pull: {likes: req.user._id}},
                            options = { new: true }
                        Dream.findOneAndUpdate(query, update, options, (err, dream) => {
                            if (err) {
                                res.status(404).json({err})
                            } else {
                                res.json ({
                                 
                                    like: like
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