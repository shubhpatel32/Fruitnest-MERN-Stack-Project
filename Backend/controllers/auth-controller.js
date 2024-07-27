const User = require("../models/user-models");
const bcrypt = require("bcryptjs");
// const { use } = require("../router/auth-router");

const home = async (req, res) => {
  try {
    res.send("Hello Chikky");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hashing
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
    });

    res.status(200).json({
      msg: `Hello ${userCreated.username}, your account is registered successfully`,
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }
    const passValid = await bcrypt.compare(password, userExist.password);
    if (passValid) {
      res.status(200).json({
        msg: `Hello ${userExist.username}, you are logged in`,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { home, register, login };
