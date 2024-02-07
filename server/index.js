// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const RegisterModel = require('./models/Cart')
//
// const app = express()
// app.use(cors(
//     {
//         origin: ["https://deploy-mern-frontend.vercel.app"],
//         methods: ["POST", "GET"],
//         credentials: true
//     }
// ));
// app.use(express.json())
//
// mongoose.connect('mongodb+srv://abdulazizxalilov30:mohlaroyim@cluster0.ltxifzp.mongodb.net/?retryWrites=true&w=majority');
//
//
// app.get("/", (req, res) => {
//     res.json("Hello");
// })
// app.post('/register', (req, res) => {
//     const {name, email, password} = req.body;
//     RegisterModel.findOne({email: email})
//         .then(user => {
//             if(user) {
//                 res.json("Already have an account")
//             } else {
//                 RegisterModel.create({name: name, email: email, password: password})
//                     .then(result => res.json(result))
//                     .catch(err => res.json(err))
//             }
//         }).catch(err => res.json(err))
// })
//
//
// app.listen(3001, () => {
//     console.log("Server is Running")
// })
const express = require('express')
const app = express();
const session = require('express-session');
const config = require('config');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authMiddleware = require("./middlewares/authMiddleware")

app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        method: ["GET", "POST"],
        credentials:true
    }
))

// const errorHandler = (err, req, res, next) => {
//     res.status(500).json({ message: 'Internal server error' });
// };
// app.use(authMiddleware);
app.use(express.json({extended: true}));
app.use(cors())
app.use(cookieParser())
//
// app.use('/api/auth',require('./routes/userRouter'))
app.use('/api/product',require('./routes/productRouter'))
app.use('/api/category',require('./routes/categoryRouter'))
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/search',require('./routes/searchProduct'))
// app.use(errorHandler);

app.get("/", (req, res) => {
    res.json("Hello1");
})



app.get('api/protected-route', authMiddleware,(req, res) => {
    res.send('Welcome to the protected route!');
});

async function start() {
    try {
        await mongoose.connect("mongodb+srv://abdulazizxalilov30:mohlaroyim@cluster0.ltxifzp.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })


        app.listen(3001, () => {
            console.log(`Successfully running`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();
