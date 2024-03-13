const User = require("./model");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const signupUser = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const plainTextPassword = req.body.password;
    const hashPass = async () => {
      let hashPassword = await bcrypt.hash(plainTextPassword, saltRounds);
      console.log(hashPassword);
    };
    hashPass();
    res.status(201).json({ message: "user added", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Here are all the users", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  signupUser: signupUser,
  getAllUsers,
};
