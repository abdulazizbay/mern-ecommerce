const express = require('express');
const router = express.Router();
const { 
    getall, 
    add, 
    put, 
    deletecat,
} = require('../controllers/categoryController');


router.get('/getall', getall)


router.post('/add', add)


router.put('/put/:id', put)

router.delete('/delete/:id', deletecat);

module.exports = router