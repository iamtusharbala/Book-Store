const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.generateToken = () => {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.SECRET_KEY)
    return token
}

const User = mongoose.model('User', userSchema)
module.exports = User