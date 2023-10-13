const express = require('express')
const router = express.Router()

const {  searchprod } = require('../controllers/searchProduct');

router.post('/',searchprod)

module.exports = router