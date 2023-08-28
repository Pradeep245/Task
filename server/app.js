const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin:"*"
}))
app.use(morgan('dev'));

app.use('/api/v1', require('./routes'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  
  res.status(err.statusCode || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});



async function startServer() {
  try {
      await connectDB();
      app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
  } catch (err) {
      console.error('Database connection error:', err);
      console.log('Server cannot start due to database connection error.');
  }
}

startServer();

