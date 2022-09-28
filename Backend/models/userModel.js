const mongoose = require('mongoose')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const UserSchema =new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please provide a username"]
    },
    email:{
        type:String,
        required:[true,"please provide a email"],
        unique: true,
        match:[/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,"please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"please add a password"],
        minlength:6,
        select:true
    },
},
{
    timestamps: true,
  }
)
const User = mongoose.model("User",UserSchema);
module.exports = User;