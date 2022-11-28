DATABASE = 'mongodb+srv://anhad96:hardeep96@cluster0.cwgy8ab.mongodb.net/flightsTI?retryWrites=true&w=majority'
const mongoose = require('mongoose');

mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on('connected', function () {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
