const mongoose = require('mongoose')
const { db } = require('./constants')



mongoose.connect(db.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}, function(err, db) {
        if (err) {
            console.log('Unable to connect to the server. Please start the server. Error:', err);
            process.exit(0)
        } else {
            console.log('Connected to Server successfully!');
        }
    });