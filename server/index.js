const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/authMiddleware');

// Middleware
app.use(express.json({ extended: true }));
app.use(cors());

app.use(cookieParser());

// Routes
app.use('/api/auth', require('./routes/userRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/category', require('./routes/categoryRouter'));
app.use('/api/cart', require('./routes/cartRouter'));
app.use('/api/search', require('./routes/searchProduct'));

// Protected route example
app.get('/api/protected-route', authMiddleware, (req, res) => {
    res.send('Welcome to the protected route!');
});

// Error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.error('MongoDB connection failed:', e);
        process.exit(1);
    }
}

start();
