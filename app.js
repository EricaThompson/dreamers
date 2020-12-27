const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI; 
const users = require('./routes/api/users');
const goals = require('./routes/api/goals');
const dreams = require('./routes/api/dreams');
const path = require('path');

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

app.use('/api/users', users);
app.use('/api/goals', goals);
app.use('/api/dreams', dreams);

const port = process.env.PORT || 5000; 

app.listen(port, () => {console.log(`Listening on port ${port}`)});