const express = require('express');
const app = express()
const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes');
const connectDB = require('./connect');


const PORT = 3000;
app.use(express.json())


// Connect to Database
connectDB()

app.get('/', (req, res) => {
    res.send('Hello from server...')
})




app.use('/api/auth', userRoutes)
app.use('/api/books', bookRoutes)


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
})