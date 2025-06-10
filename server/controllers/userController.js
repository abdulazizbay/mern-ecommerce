const express   = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const jwt = require('jsonwebtoken')


exports.register = async(req, res)=>{
    try{
        const {name,email,password} = req.body;
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).send({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const user = new User({email:email,name:name,password:hashedPassword})
        await user.save()
        res.status(200).send({message:"User created successfully"})
    }catch(err){
        res.status(400).send({message: err})
        console.log(err, ':error');
    }
}

exports.login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: 'User not found, please create an account first.' });
        }
        const checkedUser = await bcrypt.compare(password, userExist.password);
        if (!checkedUser) {
            return res.status(404).json({ message: 'Password mismatch' });
        }
        const token = jwt.sign(
            { userId: userExist.id },
            process.env.jwtSecret,
            { expiresIn: '1d' }
        );
        res.cookie("accessToken", token, {
            httpOnly: true
        });
        res.status(200).json({ token, userID: userExist.id });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'An error occurred during login.' });
    }
};

exports.profileGet = async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findById(userId)
        res.status(200).json({name:user.name, email:user.email})
    }catch (err) {
        console.log(err.message)
        res.status(500).json({ message:"went wrong getting profile"})
    }
}