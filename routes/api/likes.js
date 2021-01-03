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
        // const {errors, isValid} = validateCreateDreamInput(req.body); 

        // if (!isValid) {
        //     return res.status(400).json(errors); 
        // }

        var query = {_id: req.params.dreamId}

        Dream.findOne(query)
            .then(dream => {
            if (dream) {
                if (dream.likes.find(like => like.username === req.user.username)) {
                    
                    res.status(400).json({like: 'You have already liked this dream'})
                    return 
                }

                const newLike = new Like ({
                    userId: req.user.id,
                    username: req.user.username, 
                    dreamId: req.params.dreamId, //
                    // like: req.user.id
            })
            newLike.save().then(like => {
                var update = { $push: { likes: {id: like._id, username: newLike.username}}},
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
        } else {
            res.status(404).json({ nodreamfound: 'No dream found'})
        }
        }) 
        .catch(err => 
            res.status(400).json({err})
        )
    }
);

router.get('/:likeId', (req, res) => {
  Like.findOne({_id: req.params.likeId})
    .sort({date: -1})
    .then(like => res.json(like))
    .catch(err => res.status(404).json({ nolikesfound: 'No like found with the specified id'}))
});

router.get('/dream/:dreamId', (req, res) => {
  Like.find({dreamId: req.params.dreamId})
    .sort({date: -1})
    .then(likes => res.json(likes))
    .catch(err => res.status(404).json({ nolikesfound: 'This dream has no likes'}))
});

router.get('/user/:userId', (req, res) => {
  Like.find({userId: req.params.userId})
    .sort({date: -1})
    .then(likes => res.json(likes))
    .catch(err => res.status(404).json({ nolikesfound: 'This user has no likes'}))
});

router.delete('/:likeId',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
       
        Like.findOne({_id: req.params.likeId})
            .then(like => {
                if (like.userId != req.user.id) {
                    res.status(400).json({ userauth: 'You can only edit your own likes'})
                } else {
                    Like.deleteOne({_id: req.params.likeId}, (err) => {
                        if (err) {
                            res.status(404).json({like: 'This like cannot be removed'})
                        }
                    })
                    .then(() => {
                        var query = {_id: like.dreamId}
                            update = { $pull: { likes: {id: mongoose.Types.ObjectId(req.params.likeId)} } },
                            options = { new: true }
                        Dream.findOneAndUpdate(query, update, options, (err, dream) => {
                            if (err) {
                                res.status(404).json({like: 'Cannot edit this like'})
                            } else {
                                res.json ({
                                    likeId: req.params.likeId,
                                    dream: dream
                                })
                            }
                        })
                    })
                }
            })
            .catch(err => res.status(400).json({like: 'cannot find the like'}))
    }
)

module.exports = router;