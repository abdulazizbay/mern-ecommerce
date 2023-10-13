const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        required : true,
        type: String,
    },
    role:{
        type: Number,
        default: 0
    },
    products: [],
},
    {timestamps: true},);
const User = mongoose.model("User", UserSchema)
module.exports = User;