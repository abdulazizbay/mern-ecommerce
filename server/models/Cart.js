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
        },
      ],
    });

module.exports = mongoose.model('Cart', CartSchema);
