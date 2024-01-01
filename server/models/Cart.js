const mongoose = require("mongoose");


//////////////////////////////    
const CartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      qty: {
        type: Number,
        default: 0
      },
      bill: {
        type: Number,
        default:0
      },
        color:{
            type: String,
            enum: ["black", "white","blue","green","red","green","yellow",],
            default:"black"
        },
        size:{
            type: String,
            enum: ["xs", "s","m","l","xl"],
            default:"xs"
        },
        },
      ],
    });

module.exports = mongoose.model('Cart', CartSchema);
