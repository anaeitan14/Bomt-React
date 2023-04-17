const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/hotel');






app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(5000, () => {console.log("Server is listening on port 5000")})