const mongoose = require('mongoose');
require("dotenv").config();

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (err) {
        throw new Error('Error connecting to MongoDB');
    }
};

module.exports = connectDB;
