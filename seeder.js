const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Menu = require('./models/Menu');
const Restaurant = require('./models/Restaurant');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

// Read JSON files
const menu = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/menu.json`, 'utf-8')
);

const restaurant = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/restaurant.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Menu.create(menu);
    await Restaurant.create(restaurant);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Menu.deleteMany();
    await Restaurant.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}