const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const expresssession = require('express-session')
const passport = require('passport')
const mongoURI = 'mongodb://127.0.0.1:27017/BOMT'
const app = express()


const sessionConfig = {
    secret: 'mysadjiaid34$@#$#V@#432g4g234g#@$@V#$V#@432g4432g4v#@V@$#$@##H$32h432g@$B%RTERTY%%$6456gb456b4%B^#$%V#%VdsadasWQEQWEASDQWEASDqweasdAWWEDQWDASDQWDASDQWDwdqwdecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600000 // 1 hour
    }
  };
app.use(express.json())
app.use(expresssession(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(cors())
app.use('/api', routes)
mongoose.connect(mongoURI)
.then(() => app.listen (5000, () => {
    console.log("connected to the database and listening in port 5000")
}))
