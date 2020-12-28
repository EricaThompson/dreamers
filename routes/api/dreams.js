const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Dream = require('../../models/Dream');
const validateDreamInput = require('../../validation/dreams');

// create

router.post('/',
    passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const { errors, isValid } = validateDreamInput(req.body);

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

// update

// delete

module.exports = router; 