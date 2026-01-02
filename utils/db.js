const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;


const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Conected Successfully');
  } catch (error) {
    console.error('Connection failed');
    process.exit();
  }
};

module.exports = connectDB;
