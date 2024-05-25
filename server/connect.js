const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/book-store')
        .then(() => console.log('Connected to DB successfully..'))
        .catch((e) => console.log('Error connecting to DB...', e))
}

module.exports = connectDB