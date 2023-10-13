const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    description:{
        type: String,
        
    },
    price: {
        type: Number,
        required: true,
        min: 0,

    },
    photo:{
        type: String,
    },
    review:{
        type: Number,
        default: 0,
        enum:[1,2,3,4,5]
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
    },
    sold: {
        type: Number,
        default: 0,
    },
},);
const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;