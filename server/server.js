const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/Users')
//.then(() => app.listen (5000).then(() => console.log("connected to the database and listening to the port"))).catch((err) => console.log(err));
app.post

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const users = mongoose.model('users', userSchema);

const email = "test@test.com"
const password = "123456"
const hash = crypto.createHash('sha256').update(password).digest('hex')
console.log(hash)

users.insertMany([{email:email, password:hash}])

