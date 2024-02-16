const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected successfully');
    } catch {
        console.log(error);
        throw new Error('Error when starting the database')
    }
};

module.exports = {
    dbConnection
}