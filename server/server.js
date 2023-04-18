const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/hotel');

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.get("/eranAPI", (req, res) => {
    res.json({"Eran":["Hi","Do","Not","Delete","me",":)"], "Eitan":["No","I","Will","Delete","this",":RAGE:"]})
})

app.listen(5000, () => {console.log("Server is listening on port 5000")})   