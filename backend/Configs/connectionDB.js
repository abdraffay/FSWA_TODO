const mongoose = require('mongoose');

function connectDB(){
    try{
        const connection = mongoose.connect(process.env.DB);
        if (connection){
            console.log('Connected to MongoDB')
        }
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {connectDB}