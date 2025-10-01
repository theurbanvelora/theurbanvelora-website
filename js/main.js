document.addEventListener('DOMContentLoaded', function() {
    // Sample product data - In a real app, this would come from an API
    const products = [
        {
            id: 1,
            name: 'Classic Urban Tee',
            price: 499,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
            category: 'T-Shirts',
            isNew: true,
            isOnSale: false
        },
        {
            id: 2,
            name: 'Graphic Print Hoodie',
            price: 799,
            originalPrice: 999,
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
            category: 'Hoodies',
            isNew: false,
            isOnSale: true
        },
        {
            id: 3,
            name: 'Vintage Graphic Tee',
            price: 599,
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop',
            category: 'T-Shirts',
            isNew: true,
            isOnSale: false
        },
        {
            id: 4,
            name: 'Casual Button-Down Shirt',
            price: 699,
            originalPrice: 899,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
            category: 'Shirts',
            isNew: false,
            isOnSale: true
        },
        {
            id: 5,
            name: 'Oversized Hoodie',
            price: 899,
            image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
            category: 'Hoodies',
            isNew: true,
            isOnSale: false
        },
        {
            id: 6,
            name: 'Denim Jacket',
            price: 999,
            originalPrice: 1299,
            image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
            category: 'Outerwear',
            isNew: false,
            isOnSale: true
        },
        {
            id: 7,
            name: 'Minimalist White Tee',
            price: 399,
            image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=500&fit=crop',
            category: 'T-Shirts',
            isNew: true,
            isOnSale: false
        },
        {
            id: 8,
            name: 'Stylish Sunglasses',
            price: 299,
            originalPrice: 399,
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop',
            category: 'Accessories',
            isNew: false,
            isOnSale: true
        },
        {
            id: 9,
            name: 'Striped Casual Shirt',
            price: 799,
            image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
            category: 'Shirts',
            isNew: true,
            isOnSale: false
        },
        {
            id: 10,
            name: 'Zip-Up Hoodie',
            price: 749,
            originalPrice: 999,
            image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=500&fit=crop',
            category: 'Hoodies',
            isNew: false,
            isOnSale: true
        },
        {
            id: 11,
            name: 'Premium Cotton Tee',
            price: 549,
            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop',
            category: 'T-Shirts',
            isNew: true,
            isOnSale: false
        },
        {
            id: 12,
            name: 'Leather Backpack',
            price: 999,
            originalPrice: 1499,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
            category: 'Accessories',
            isNew: false,
            isOnSale: true
        }
    ];

    // DOM Elements
    const productGrid = document.querySelector('.product-grid');
    const categoryLinks = document.querySelectorAll('.category-nav a');
    const searchInput = document.querySelector('.search-bar input');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    // Initialize the page
    function init() {
        displayProducts(products);
        setupEventListeners();
        loadCart();
        updateCartCount();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Category filter
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.textContent.trim();
                filterProductsByCategory(category);
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }

    // Display products in the grid
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<p class="no-results">No products found. Try a different search.</p>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Create a product card HTML element
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const saleBadge = product.isOnSale ? '<span class="sale-badge">SALE</span>' : '';
        const newBadge = product.isNew ? '<span class="new-badge">NEW</span>' : '';
        const originalPrice = product.originalPrice 
            ? `<span class="original-price">₹${product.originalPrice}</span>` 
            : '';
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                ${saleBadge}
                ${newBadge}
                <button class="quick-view-btn" data-id="${product.id}">Quick View</button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="price-container">
                    ${originalPrice}
                    <span class="product-price">₹${product.price}</span>
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        return card;
    }

    // Filter products by category
    function filterProductsByCategory(category) {
        if (category === 'ALL') {
            displayProducts(products);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
        );
        
        displayProducts(filteredProducts);
    }

    // Filter products by search term
    function filterProducts(searchTerm) {
        if (!searchTerm) {
            displayProducts(products);
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    }

    // Add product to cart
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        saveCart();
        updateCartCount();
        showNotification(`${product.name} added to cart!`);
    }

    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    }

    // Update cart count in the UI
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }

    // Show notification
    function showNotification(message) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            
            // Auto-remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
        
        notification.textContent = message;
        notification.style.opacity = '1';
    }

    // Initialize the application
    init();
});
