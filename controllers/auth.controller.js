const User = require('../models/user.model.js');
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
  try {
    res.status(200).send('This is a home page from controller file');
  } catch (error) {
    console.log(error);
  }
};

/*
 * User registration Logic
 */

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'user already exits' });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(201).json({
      msg: 'Registration Successful',
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};

/*
 * User Login Logic
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const user = await bcrypt.compare(password, userExist.password);

    if (user) {
      res.status(200).json({
        msg: 'Login Successful',
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};

module.exports = { home, register, login };
