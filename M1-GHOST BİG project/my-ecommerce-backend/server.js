const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const paypalRoutes = require('./routes/paypal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/paypal', paypalRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-ecommerce-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
