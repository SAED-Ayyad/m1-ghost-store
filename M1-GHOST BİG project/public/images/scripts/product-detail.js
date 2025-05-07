const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productInfo = document.getElementById('product-info');
            productInfo.innerHTML = `
                <h1>${product.name}</h1>
                <img src="${product.image}" alt="${product.name}">
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <p>Rating: ${product.rating} stars</p>
            `;
        });
});
