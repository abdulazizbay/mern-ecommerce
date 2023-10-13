const express = require("express");
const { 
    getallproducts, 
    addproduct, 
    deleteprod, 
    put,
    clientgetallproducts,
} = require("../controllers/productController");
const router = express.Router();
const  authMiddleware = require("../middlewares/authMiddleware")


router.get("/getallproducts",authMiddleware, getallproducts);

router.post("/addproduct", addproduct);

router.delete("/delete/:id", deleteprod);

router.put("/put/:id", put);

router.post("/client/getallproducts"  ,clientgetallproducts)
module.exports = router;
