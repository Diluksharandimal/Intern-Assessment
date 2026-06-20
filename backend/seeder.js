const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const fs = require('fs');

dotenv.config();

const importData = async () => {
  try {
    // 1. Force the script to wait for the database connection FIRST
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected!');

    // 2. Read the JSON file
    const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));

    // 3. Clear existing data
    console.log('Clearing old data...');
    await Product.deleteMany();
    
    // 4. Insert new data
    console.log('Importing new data...');
    await Product.insertMany(productsData);
    
    console.log('Data successfully imported! ✅');
    process.exit();
    
  } catch (error) {
    console.error('Error importing data:', error.message);
    process.exit(1);
  }
};

importData();