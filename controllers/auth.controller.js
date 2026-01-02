const User = require('../models/user.model.js');

const home = async (req, res) => {
  try {
    res.status(200).send('This is a home page from controller file');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: 'user already exits' });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(200).send({ userCreated });
  } catch (error) {
    res.status(404).send({ message: 'page not found' });
  }
};

module.exports = { home, register };
