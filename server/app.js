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
        methods: ["POST", "GET"],
        credentials: true
    }
));

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: 'Internal server error' });
};
// app.use(authMiddleware);
app.use(express.json({extended: true}));
app.use(cors())
app.use(cookieParser())
//
app.use('/api/auth',require('./routes/userRouter'))
app.use('/api/product',require('./routes/productRouter'))
app.use('/api/category',require('./routes/categoryRouter'))
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/search',require('./routes/searchProduct'))
app.use(errorHandler);




app.get('api/protected-route', authMiddleware,(req, res) => {
    res.send('Welcome to the protected route!');
});
app.get("/", (req, res) => {
    res.json("Hello");
})


async function start() {
    try {
        await mongoose.connect(config.get("mongoURI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })


        app.listen(config.get("port"), () => {
            console.log(`Successfully running`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

start();

