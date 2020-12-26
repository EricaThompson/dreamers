const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI; 
const users = require('./routes/api/users');
const goals = require('./routes/api/goals');
const dreams = require('./routes/api/dreams');
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