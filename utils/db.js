const mongoose = require('mongoose');

const URI =
  'mongodb+srv://rubinaakther3454_db_user:p1c0mbegessmgv4P@cluster0.tptrdu4.mongodb.net/?appName=Cluster0';

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
