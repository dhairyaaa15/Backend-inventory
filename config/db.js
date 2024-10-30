// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dhairyaitm123:SSguVtPdwd15ba2N@cluster0.fnnj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); // No options needed
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;