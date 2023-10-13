const express   = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const {
    register,
    login
} = require("../controllers/userController")


router.post('/register',register)


router.post('/login',login)
module.exports = router;