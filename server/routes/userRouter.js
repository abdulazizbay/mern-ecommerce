const express   = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")
const {
    register,
    login,
    profileGet
} = require("../controllers/userController")


router.post('/register',register)
router.get("/getprofile",authMiddleware, profileGet)

router.post('/login',login)
module.exports = router;