const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = new User({
            name,
            email,
            password
        })
        // Password Hashing
        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save()
        res.status(201).json({ message: 'New user created successfully', user: newUser })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating new user' })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ message: 'Incorrect password' })
        }
        return res.status(200).json({ message: 'Logged In successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging user' })
    }

})

module.exports = router