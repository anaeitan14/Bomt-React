const crypto = require('crypto')
const User = require('../models/userSchema')

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: 'User already exists'});
        }
    
        const salting_word = crypto.randomBytes(32).toString('base64');
        const hash = crypto.pbkdf2Sync(password, salting_word, 1000, 64, 'sha512').toString('hex');    
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
};

exports.login = async (req, res) => {
  try{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({auth:false ,message: 'Incorrect information'})
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

    if(hash === user.password){
      return res.status(200).json({auth:true, message:'Login succesfull'})
   }
   return res.status(400).json({auth:false, message: 'Incorrect information'})
  }catch(error){
    console.error(error)
    res.status(500).json({message: 'Internal server error'})
  }
}