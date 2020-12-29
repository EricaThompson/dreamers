const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Dream = require('../../models/Dream');
const validateCreateDreamInput = require('../../validation/create_dream');
const validateUpdateDreamInput = require('../../validation/update_dream');

// create

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCreateDreamInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newDream = new Dream({
            userId: req.user.id,
            text: req.body.text,
            tags: req.body.tags,
            type: req.body.type
        })

        newDream.save().then(dream => res.json(dream));
    }
)

// read

router.get('/', (req, res) => {
    Dream.find()
        .sort({ date: -1})
        .then(dreams => res.json(dreams))
        .catch(err => res.status(400).json({ nodreamsfound: 'No dreams found'}));
})

router.get('/user/:userId', (req, res) => {
    Dream.find({userId: req.params.userId})
        .then(dreams => res.json(dreams))
        .catch(err =>
            res.status(404).json({ nodreamsfound: 'No dreams found from that user' }
        )
    );
});

router.get('/:id', (req, res) => {
    Dream.find({userId: req.params.id})
        .then(dreams => res.json(dreams))
        .catch(err =>
            res.status(404).json({ nodreamsfound: 'No dreams with that ID' }
        )
    );
});

// update

router.post('/update/:dreamId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateUpdateDreamInput(req.body);

        if (!isValid) {
            return res.json.status(400).json(errors);
        }

        var query = { _id: req.params.dreamId }
        Dream.findOne(query)
            .then(dream => {
                if (dream.userId != req.user.id) {
                    res.status(400).json({ userauth: 'You can only edit your own dreams'})
                } else {
                    if (req.body.text.length === 0) {
                        delete req.body.text;
                    }
                    Dream.update(query, { $set: req.body }, function(err) {
                        if(err) {
                            res.status(400).json(err);
                        } else {
                            res.json(req.params.dreamId);
                        }
                    })
                }
            })
            .catch(err => res.status(404).json({ nodreamfound: 'No dream found with that ID' }))

    }
)

// delete

router.delete('/:dreamId',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        var query = { _id: req.params.dreamId }
        Dream.findOne(query)
            .then(dream => {
                if (dream.userId != req.user.id) {
                    res.status(400).json({ userauth: 'You can only delete your own dreams'})
                } else {
                    Dream.deleteOne(query, function (err) {
                        if(err) {
                            res.status(400).json(err);
                        } else {
                            res.json(req.params.dreamId);
                        }
                    })
                }
            })
    }
)

module.exports = router; 