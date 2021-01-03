const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI; 
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const goals = require('./routes/api/goals');
const dreams = require('./routes/api/dreams');
const comments = require('./routes/api/comments');
<<<<<<< HEAD
const tags = require('./routes/api/tags')
const likes = require('./routes/api/likes')
=======
const tags = require('./routes/api/tags');
const search = require('./routes/api/search');
>>>>>>> 6a9c9e24b91c583f86c54b708e2845472d882f09

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { 
      useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/goals', goals);
app.use('/api/dreams', dreams);
app.use('/api/comments', comments);
app.use('/api/tags', tags);
<<<<<<< HEAD
app.use('/api/likes', likes)
=======
app.use('/api/search', search);
>>>>>>> 6a9c9e24b91c583f86c54b708e2845472d882f09

const port = process.env.PORT || 5000; 

app.listen(port, () => {console.log(`Listening on port ${port}`)});