const mongoose = require('mongoose')
const { db } = require('./constants')

mongoose.connect(db.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
