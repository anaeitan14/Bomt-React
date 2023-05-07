const Item = require("../models/itemSchema");

exports.addItem = async (req, res) => {
    try {
      const { item } = req.body;
  
      const user = await User.findOne({ item });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const salting_word = crypto.randomBytes(32).toString("base64");
      const hash = crypto
        .pbkdf2Sync(password, salting_word, 950, 64, "sha512")
        .toString("hex");
      const newUser = new User({
        email: email,
        password: hash,
        salting_word: salting_word,
      });
  
      await newUser.save();
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };