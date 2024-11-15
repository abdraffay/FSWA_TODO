const mongoose = require("mongoose");

const todoCatModel = mongoose.Schema(
    {
        todoCat:{
            type:String,
            require:true
        }
    }
)

const Category = mongoose.model("Category", todoCatModel);
module.exports ={Category}