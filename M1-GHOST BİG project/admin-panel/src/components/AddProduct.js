import React, { useState } from 'react';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        alert('Product added successfully');
        setProduct({
            name: '',
            description: '',
            price: '',
            image: '',
            category: ''
        });
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={product.description} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={product.image} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={product.category} onChange={handleChange} required />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
