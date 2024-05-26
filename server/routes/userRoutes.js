const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')
const isAuth = require('../middleware/isAuth')


// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body.data
        const existingUser = await User.findOne({ email })
        // console.log(existingUser);
        if (existingUser) {
            return res.status(500).json({ message: 'User already exists' })
        }
        const newUser = new User({
            name,
            email,
            password
        })
        // Password Hashing
        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(password, salt);

        await newUser.save()

        const token = newUser.generateToken();
        const data = {
            token: token,
            userId: newUser.id,
            isAdmin: newUser.isAdmin
        }

        res.status(201).json({ message: 'New user created successfully', user: newUser, data })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating new user' })
    }
})

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body.data
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.status(404).json({ message: 'Incorrect password' })
        }
        const token = user.generateToken();
        const data = {
            token: token,
            userId: user.id,
            isAdmin: user.isAdmin
        }
        return res.status(200).json({ message: 'Logged In successfully', data })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging user' })
    }

})

// Protected route
router.get('/protected', isAuth, (req, res) => {
    if (req.isAuth) {
        res.status(200).json({ message: 'You are authenticated', user: req.user });
    }
    res.status(403).json({ message: 'Access Denied' })
});

module.exports = router