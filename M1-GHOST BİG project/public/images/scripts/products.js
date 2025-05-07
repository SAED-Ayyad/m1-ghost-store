document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <p>Rating: ${product.rating} stars</p>
                    <a href="product.html?id=${product._id}">View Details</a>
                `;
                productList.appendChild(productCard);
            });
        });
});
