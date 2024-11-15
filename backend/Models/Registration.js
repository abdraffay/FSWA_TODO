const mongoose = require("mongoose");

const userRegistrationModel = mongoose.Schema(
    {
        userName:{
            type:String,
            require:[true,"User Name must be filled"]
        },
        userEmail:{
            type:String,
            require:[true,"User Email must be filled"]
        },
        userAge:{
            type:Number,
            require:[true,"User Age must be filled"]
        },
        userPassword:{
            type:String,
            require:[true,"User Password must be there and contains at least 8 characters"]
        },

    }
)

const UserRegistration = mongoose.model("UserRegistration", userRegistrationModel)

module.exports ={UserRegistration}