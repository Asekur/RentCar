const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(express.json({ extended: true }))
app.use(express.static("."));
app.use('/auth', require('./routes/auth'))
app.use('/create', require('./routes/create'))
app.use('/about', require('./routes/opinion'))

async function start() {
    try {
        await mongoose.connect(process.env.DB_MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (err) {
        console.log('Server error', err.message)
        process.exit(1)
    }
}

const PORT = process.env.REACT_APP_PORT || 8000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))

start()