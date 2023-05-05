const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const mongoURI = 'mongodb://127.0.0.1:27017/Users'
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api', routes)

mongoose.connect(mongoURI)
.then(() => app.listen (5000, () => {
    console.log("connected to the database and listening in port 5000")
}))
