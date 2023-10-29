
const  jwt =  require('jsonwebtoken')
const config  = require('config')
const User = require('../models/User')
const Cart = require('../models/Cart')
const Product = require('../models/product')

exports.addtocart = async (req, res) => {
    try {
        const productList = req.body;

        const userId = req.user.userId;
        console.log(productList)
        console.log(userId)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not Found' });
        }
        console.log("000")
        const productObj = {};
        let bill = 0;
        for (const productId of productList) {
            console.log("1111")
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({ message: 'Product not Found' });
            }

            if (productObj[productId]) {
                productObj[productId]++;
            } else {
                productObj[productId] = 1;
            }
            console.log("333")
            bill += product.price * productObj[productId];
        }

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            console.log(444)
            const newCart = new Cart({ user: userId, product: productList, bill: bill });
            await newCart.save();
            console.log("ke;do")
            return res.status(200).json({ message: 'success', cart: newCart });
        } else {
            console.log(555)
            for (const productId of productList) {
                const existingProduct = cart.products.find((item) => item.product.equals(productId));
                const product = await Product.findById(productId);
                if (existingProduct) {
                    console.log(666)
                    existingProduct.qty += productObj[productId];
                    existingProduct.bill += product.price * productObj[productId];
                } else {
                    console.log(777)
                    cart.products.push({ product: productId, qty: productObj[productId], bill: product.price * productObj[productId] });
                }
            }
            console.log(888)
            await cart.save();
            return res.status(200).json({ message: 'success', cart: cart });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};






exports.delete = async (req, res) => {
    try {
      const { userID, products } = req.body;
      const user = await User.findOne({ _id: userID });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      for (const { productID, qty, bill } of products) {
        const deleteProduct = await Cart.findOne({
          user: userID,
          'products.product': productID,
          'products.qty': qty,
          'products.bill': bill
        });
  
        if (!deleteProduct) {
          return res.status(404).json({ message: 'Product not found in the cart' });
        }
  
        const productIndex = deleteProduct.products.findIndex(
          (item) =>
            item.product.toString() === productID &&
            item.qty === qty &&
            item.bill === bill
        );
        if (productIndex !== -1) {
          deleteProduct.products.splice(productIndex, 1);
          await deleteProduct.save();
  
        }
      }
  
      res.status(200).json({ message: 'success' });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }