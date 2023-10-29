const Product = require('../models/product')
const Category = require('../models/Category');
const mongoose = require("mongoose");


exports.clientgetallproducts = async (req, res) => {
    try {
        const { category } = req.body;
        if (!category || category.length === 0) {
            const productsForMen = await Product.find({ category: "men" });
            const productsForGirls = await Product.find({ category: "girls" });
            const allProducts = [...productsForMen, ...productsForGirls];
            return res.status(200).json(allProducts);
        }
        if (!Array.isArray(category)) {
            return res.status(400).json({ message: "Category should be an array." });
        }
        const categoryIds = await Promise.all(
            category.map(async (cat) => {
                const categoryDoc = await Category.findOne({ name: cat });
                return categoryDoc ? categoryDoc._id : null;
            })
        );
        const products = await Product.find({ category: { $in: categoryIds } });
        return res.status(200).json(products);
    } catch (e) {
        return res.status(400).json(e.message);
    }
}


exports.getallproducts = async(req,res)=>{
    try{
        const {productId} = req.body
        if(!productId){
            const products = await Product.find()
            return res.status(200).json(products)
        }
        const exactProduct = await  Product.findById(productId)
        return  res.status(200).json({ exactProduct: exactProduct})
    }catch(e){
        return res.status(400).json(e.message)
    }
}

exports.addproduct = async (req, res) => {
    const { name, price, description, photo, review,size } = req.body;
    try {
      const category = await Category.findOne({ name: req.body.category });
      if (!category) {
        return res.status(400).json({ message: "No category" });
      }
  
      newProduct = new Product({
        name: name,
        price: price,
        description: description,
        photo: photo,
        review: review,
        category: category,
          size:size
      });
      await newProduct.save();
      res.json({ message: "success" });
    } catch (e) {
      res.status(400).json({ message: e.message });
      console.log(e.message);
    }
  }

exports.deleteprod = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log(e.message);
      return res.status(400).json({ message: e.message });
    }
}

exports.put = async (req, res) => {
    try {
      const { name, price, description, photo, review, category,size } = req.body;
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          price: price,
          description: description,
          photo: photo,
          review: review,
          category: category,
            size: size
        },
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(500).json({ message: "Failed to update the product." });
      }
      return res
        .status(200)
        .json({ message: "success", updated: updatedProduct });
    } catch (e) {
      console.log(e.message);
      return res.status(400).json({ message: e.message });
    }
  }