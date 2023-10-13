const express = require('express');
const router = express.Router();
const { addtocart } = require('../controllers/cardController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/addtocart',authMiddleware,addtocart)

router.post('/delete', );





module.exports = router
