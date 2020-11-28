const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(cors())

// Connect to the mongodb db
mongoose.connect('mongodb+srv://data:1234@cluster0.qvhok.mongodb.net/twitter?retryWrites=true&w=majority')
const db = mongoose.connection

// Listeners 

// Listen for any errors, if any errors occur, we will console log it
db.on('error', console.error.bind(console, 'connection error:'));

// Once the database connection is open, we will just console log to confirm for ourseleves everything is up and running 
db.once('open', function callback () {
  console.log("database is up and running");
});



 //route handler
app.get('/', async (req,res) => {
    // specifically use .find to GET the tweets from our collection
    const tweets = await db.collection('tweets').find({}).toArray();
    res.json(tweets)
    // async/await / promises
})

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}...`));