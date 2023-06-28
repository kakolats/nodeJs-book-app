require('dotenv').config();
const mongoose = require('mongoose');

connectDb().catch (err => console.log(err));


async function connectDb() {
    await mongoose.connect(process.env.MONGO_URL,{
        dbName:'books-app'
    });
    console.log('Db connectée');
}

module.exports = {
    connectDb
}
