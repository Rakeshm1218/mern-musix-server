const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new Users({ username: username, email: email, password: password });
    await newUser.save();
    res.send("User Created Successfully!!!!");
  } catch (err) {
    res.status(500).json("Error Creating user " + err.message);
  } 
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ user_id: user._id ,email:user.email, username:user.username}, "secret_token", {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.error("Error generating Token ",err);
  }
};

//generate  JWT - .sign()
//verify JWT - .verfy()
