const express = require('express')
const router = express.Router()
const User = require('../model/user')


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const newUser = new User({
            name,
            email,
            password
        })
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
        if (password !== user.password) {
            return res.status(404).json({ message: 'Incorrect password' })
        }
        return res.status(200).json({ message: 'Logged In successfully' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging user' })
    }

})

module.exports = router