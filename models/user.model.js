const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  console.log('pre method', this);
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;
