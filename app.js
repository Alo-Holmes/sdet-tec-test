document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://fakestoreapi.com';

    const mainElement = document.querySelector('main');

    // Simple router based on the page's main element ID
    if (mainElement.id === 'product-list') {
        fetchAndDisplayProducts();
    } else if (mainElement.id === 'product-detail') {
        fetchAndDisplayProductDetails();
    }

    async function fetchAndDisplayProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();

            mainElement.innerHTML = ''; // Clear existing content

            if (products.length === 0) {
                mainElement.innerHTML = '<p>No products found.</p>';
                return;
            }

            products.forEach(product => {
                const productCard = document.createElement('a');
                productCard.href = `product.html?id=${product.id}`;
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>$${product.price.toFixed(2)}</p>
                `;
                mainElement.appendChild(productCard);
            });
        } catch (error) {
            mainElement.innerHTML = '<p>Failed to load products. Please try again later.</p>';
            console.error('Error fetching products:', error);
        }
    }

    async function fetchAndDisplayProductDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            mainElement.innerHTML = '<p>No product ID specified.</p>';
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const product = await response.json();

            mainElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="info">
                    <h1>${product.title}</h1>
                    <div class="price">$${product.price.toFixed(2)}</div>
                    <div class="category">${product.category}</div>
                    <p class="description">${product.description}</p>
                </div>
            `;
        } catch (error) {
            mainElement.innerHTML = '<p>Failed to load product details. Please try again later.</p>';
            console.error('Error fetching product details:', error);
        }
    }
});
