const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Cart')

const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://abdulazizxalilov30:mohlaroyim@cluster0.ltxifzp.mongodb.net/?retryWrites=true&w=majority');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
        .then(user => {
            if(user) {
                res.json("Already have an account")
            } else {
                RegisterModel.create({name: name, email: email, password: password})
                    .then(result => res.json(result))
                    .catch(err => res.json(err))
            }
        }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})