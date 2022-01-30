const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//Load env vars
dotenv.config({path: './config/config.env'})

//connect to database
connectDB()

//Route files
const menu = require('./routes/menu')
const restaurant = require('./routes/restaurant')
const auth = require('./routes/auth')
const cart = require('./routes/cart')

const app = express()

//Body parser
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/menu', menu)
app.use('/api/v1/restaurant', restaurant)
app.use('/api/v1/auth', auth)
app.use('/api/v1/cart', cart)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server= app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
