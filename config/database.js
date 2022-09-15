const mongoose = require('mongoose');

const {MONGODB_URI, MONGODB_URI_TEST, NODE_ENV} = process.env;

async function connectDB() {
  const URI = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;
  try {
    await mongoose.connect(URI)
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.error('Error connecting to MongoDB')
    process.exit(1)
  }
}
module.exports = connectDB;