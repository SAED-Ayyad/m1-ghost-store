#!/bin/bash

# Exit script on error
set -e

# Define directories
FRONTEND_DIR="admin-panel"
BACKEND_DIR="my-ecommerce-backend"
PUBLIC_DIR="public"

# Create and setup frontend project
echo "Setting up frontend project..."

# Create frontend directory
mkdir -p $FRONTEND_DIR
cd $FRONTEND_DIR

# Initialize a React app
npx create-react-app .

# Install additional dependencies
npm install react-router-dom

# Create basic React components
cat <<EOF > src/components/AddProduct.js
import React from 'react';

function AddProduct() {
    return (
        <div>
            <h2>Add Product</h2>
            {/* Add your form or component logic here */}
        </div>
    );
}

export default AddProduct;
EOF

cat <<EOF > src/components/ProductList.js
import React from 'react';

function ProductList() {
    return (
        <div>
            <h2>Product List</h2>
            {/* Add your list logic here */}
        </div>
    );
}

export default ProductList;
EOF

cat <<EOF > src/components/Login.js
import React from 'react';

function Login() {
    return (
        <div>
            <h2>Login</h2>
            {/* Add your login form here */}
        </div>
    );
}

export default Login;
EOF

cat <<EOF > src/components/UpdateProduct.js
import React from 'react';

function UpdateProduct() {
    return (
        <div>
            <h2>Update Product</h2>
            {/* Add your update form or component logic here */}
        </div>
    );
}

export default UpdateProduct;
EOF

cat <<EOF > src/components/UpdateUser.js
import React from 'react';

function UpdateUser() {
    return (
        <div>
            <h2>Update User</h2>
            {/* Add your user update form or component logic here */}
        </div>
    );
}

export default UpdateUser;
EOF

cat <<EOF > src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Login from './components/Login';
import UpdateProduct from './components/UpdateProduct';
import UpdateUser from './components/UpdateUser';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/update-product" element={<UpdateProduct />} />
                <Route path="/update-user" element={<UpdateUser />} />
            </Routes>
        </Router>
    );
}

export default App;
EOF

cat <<EOF > src/styles.css
/* Add your CSS styles here */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

h1 {
    margin: 0;
}

form {
    margin: 20px;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 10px;
}

input {
    width: 100%;
    padding: 8px;
    margin: 5px 0 20px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #0056b3;
}
EOF

# Navigate back to the root directory
cd ..

# Create and setup backend project
echo "Setting up backend project..."

# Create backend directory
mkdir -p $BACKEND_DIR
cd $BACKEND_DIR

# Initialize a Node.js project
npm init -y

# Install necessary packages
npm install express mongoose body-parser cors paypal-rest-sdk

# Create basic backend files
cat <<EOF > server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const paypalRoutes = require('./routes/paypal');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/paypal', paypalRoutes);

mongoose.connect('mongodb://localhost:27017/my-ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOF

cat <<EOF > models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);
EOF

cat <<EOF > models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', UserSchema);
EOF

cat <<EOF > routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add your routes here
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

module.exports = router;
EOF

cat <<EOF > routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Add your routes here
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');
    res.send('Login successful');
});

module.exports = router;
EOF

cat <<EOF > routes/paypal.js
const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');

// Configure PayPal
paypal.configure({
    'mode': 'sandbox', // Sandbox or live
    'client_id': 'YOUR_CLIENT_ID',
    'client_secret': 'YOUR_CLIENT_SECRET'
});

// Add your routes here
router.post('/payment', (req, res) => {
    // Payment logic here
});

module.exports = router;
EOF

# Navigate back to the root directory
cd ..

# Create the public directory and add assets
echo "Setting up public assets..."

mkdir -p $PUBLIC_DIR/images
mkdir -p $PUBLIC_DIR/styles
mkdir -p $PUBLIC_DIR/scripts

# Create index.html
cat <<EOF > $PUBLIC_DIR/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Store</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<body>
    <header>
        <h1>Product Store</h1>
    </header>
    <main>
        <div id="product-list"></div>
        <script src="scripts/products.js"></script>
    </main>
</body>
</html>
EOF

# Create styles.css
cat <<EOF > $PUBLIC_DIR/styles/styles.css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #333;
    color: white;
    padding: 10px;
    text-align: center;
}

h1 {
    margin: 0;
}
EOF

# Create products.js
cat <<EOF > $PUBLIC_DIR/scripts/products.js
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display products here
});
EOF

echo "Project setup complete!"
