
const Product = require('../models/product');

exports.searchprod = async(req,res)=>{

    const keyword = req.query.keyword;

    const filters = { name: { $regex: keyword, $options: 'i' } };

    try {
        const products = await Product.find(filters);
        if(!products){ return  res.status(400).json({message:"product Not Found"});}
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


}