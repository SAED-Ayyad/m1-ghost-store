import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: ''
    });
    const history = useHistory();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        alert('Product updated successfully');
        history.push('/');
    };

    return (
        <div>
            <h2>Update Product</h2>
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
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
