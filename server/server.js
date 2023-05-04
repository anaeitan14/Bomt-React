const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const mongoose = require('mongoose')
const User = require("./models/userSchema")
const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/Users')
.then(() => app.listen (5000, () => {
    console.log("connected to the database and listening to the port")
}))
app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const salting_word = crypto.randomBytes(32).toString('base64');
        const hash = crypto.createHash('sha256').update(password + salting_word).digest('hex')
    
        // Create a new user with the hashed password
        const newUser = new User({
          email: email,
          password: hash,
          salting_word: salting_word
        });
    
        await newUser.save();
    
        res.status(200).json({ message: 'User created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});
const email = "test4@test.com"
const password = "123456"
console.log(salting_word)

console.log(hash)

User.insertMany([{email:email, password:hash, salting_word: salting_word}])

