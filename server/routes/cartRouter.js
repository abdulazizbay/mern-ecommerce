const express = require('express');
const router = express.Router();
const { addtocart, getCart} = require('../controllers/cardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addtocart',authMiddleware,addtocart)
router.get("/getcart",authMiddleware,getCart)
router.post('/delete', );





module.exports = router
