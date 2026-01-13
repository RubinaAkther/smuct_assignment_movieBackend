require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const email = 'admin@gmail.com';
    const password = 'Admin@123';

    const adminExists = await User.findOne({ email });
    if (adminExists) {
      console.log('Admin already exists:', adminExists.email);
      process.exit(0);
    }

    const admin = await User.create({
      email,
      password, // auto hashed by pre-save hook
      username: 'admin',
      phone: '01234567893434',
      isAdmin: true,
    });

    console.log('Admin user created successfully:', admin.email);
    console.log('Use this email & password to login as admin');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
