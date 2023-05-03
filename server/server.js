const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = require('./models/userSchema')
const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/Users')
/*.then(() => app.listen (5000, () => {
    console.log("connected to the database and listening to the port")
}))
app.post*/

const email = "test2@test.com"
const password = "123456"
const salting_word = crypto.randomBytes(128).toString('base64');
console.log(salting_word)
const hash = crypto.createHash('sha256').update(password + salting_word).digest('hex')
console.log(hash)

User.insertMany([{email:email, password:hash, salting_word: salting_word}])

