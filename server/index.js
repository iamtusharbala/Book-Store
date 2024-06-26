const express = require('express');
const app = express()
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require('./connect');
const cors = require('cors');
const isAuth = require('./middleware/isAuth');


const PORT = 3000;
app.use(express.json())

// Cross orgin resource sharing
app.use(cors())

// Connect to Database
connectDB()

app.get('/', (req, res) => {
    res.send('Hello from server...')
})


app.use(isAuth)

app.use('/api/auth', userRoutes)
app.use('/api/books', bookRoutes)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
})