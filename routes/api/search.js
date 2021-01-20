const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose');

// search

router.get('/:searchParam', (req, res) => {
  const queries = [];

  queries.push(Tag.find({ 
    name: { $regex: new RegExp(req.params.searchParam) } })
      .sort({ lastUsed: -1 })
      .exec()
  )

  queries.push(User.find(
    { $and: [
      { username: { $regex: new RegExp(req.params.searchParam) } },
      {username: { $ne: 'superuser' }}
    ]}
  ))

  queries.push(Dream.find({ 
    text: { $regex: new RegExp(req.params.searchParam) } })
      .sort({ date: -1 })
      .exec()
  )
  
  Promise.all(queries).then(results => res.json(results));
})

module.exports = router;