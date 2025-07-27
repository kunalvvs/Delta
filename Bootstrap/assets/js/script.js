// ===== MAIN JAVASCRIPT FOR SHOPHUB E-COMMERCE =====

// ===== GLOBAL VARIABLES =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ===== SAMPLE PRODUCT DATA =====
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 89.99,
        originalPrice: 129.99,
        category: "electronics",
        brand: "apple",
        rating: 4.5,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        inStock: true,
        featured: true,
        discount: 31
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: 249.99,
        category: "electronics",
        brand: "samsung",
        rating: 4.3,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        inStock: true,
        featured: true,
        discount: 20
    },
    {
        id: 3,
        name: "Premium Laptop Bag",
        price: 79.99,
        originalPrice: 99.99,
        category: "fashion",
        brand: "nike",
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
        inStock: true,
        featured: false,
        discount: 20
    },
    {
        id: 4,
        name: "Wireless Bluetooth Speaker",
        price: 59.99,
        originalPrice: 79.99,
        category: "electronics",
        brand: "samsung",
        rating: 4.2,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop",
        inStock: true,
        featured: true,
        discount: 25
    },
    {
        id: 5,
        name: "Running Shoes",
        price: 129.99,
        originalPrice: 159.99,
        category: "sports",
        brand: "nike",
        rating: 4.6,
        reviews: 203,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
        inStock: true,
        featured: true,
        discount: 19
    },
    {
        id: 6,
        name: "Coffee Maker",
        price: 89.99,
        originalPrice: 119.99,
        category: "home",
        brand: "other",
        rating: 4.4,
        reviews: 145,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
        inStock: true,
        featured: false,
        discount: 25
    },
    {
        id: 7,
        name: "Smartphone Case",
        price: 24.99,
        originalPrice: 34.99,
        category: "electronics",
        brand: "apple",
        rating: 4.1,
        reviews: 78,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        inStock: true,
        featured: false,
        discount: 29
    },
    {
        id: 8,
        name: "Yoga Mat",
        price: 34.99,
        originalPrice: 49.99,
        category: "sports",
        brand: "adidas",
        rating: 4.5,
        reviews: 92,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
        inStock: true,
        featured: false,
        discount: 30
    }
];

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// ===== CART FUNCTIONS =====
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    updateCartStorage();
    updateCartCount();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartStorage();
    updateCartCount();
    showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        updateCartStorage();
        updateCartCount();
    }
}

function clearCart() {
    cart = [];
    updateCartStorage();
    updateCartCount();
    showToast('Cart cleared', 'info');
}

function updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// ===== WISHLIST FUNCTIONS =====
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        updateWishlistStorage();
        showToast(`${product.name} added to wishlist!`);
    } else {
        showToast('Item already in wishlist', 'warning');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistStorage();
    showToast('Item removed from wishlist', 'info');
}

function updateWishlistStorage() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// ===== PRODUCT RENDERING FUNCTIONS =====
function createProductCard(product) {
    const discountBadge = product.discount ? 
        `<span class="badge bg-danger">${product.discount}% OFF</span>` : '';
    
    return `
        <div class="col">
            <div class="card product-card h-100">
                <div class="product-image position-relative">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="product-badge">
                        ${discountBadge}
                        ${product.inStock ? '<span class="badge bg-success">In Stock</span>' : '<span class="badge bg-secondary">Out of Stock</span>'}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-outline-light btn-sm mb-2" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn btn-outline-light btn-sm" onclick="quickView(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title">${product.name}</h6>
                    <div class="product-rating mb-2">
                        <div class="stars text-warning">
                            ${generateStars(product.rating)}
                        </div>
                        <small class="text-muted">(${product.reviews} reviews)</small>
                    </div>
                    <div class="price mb-3 mt-auto">
                        <span class="price-current fw-bold">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="price-original ms-2">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(product => product.featured).slice(0, 8);
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(handleSearch, 300));
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    if (query.length < 2) return;
    
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    );
    
    // This could redirect to products page with search results
    console.log('Search results:', results);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== QUICK VIEW FUNCTIONALITY =====
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create and show quick view modal
    const modal = createQuickViewModal(product);
    document.body.appendChild(modal);
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function createQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${product.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                        </div>
                        <div class="col-md-6">
                            <div class="product-rating mb-3">
                                <div class="stars text-warning">
                                    ${generateStars(product.rating)}
                                </div>
                                <span class="ms-2">${product.rating} (${product.reviews} reviews)</span>
                            </div>
                            <div class="price mb-3">
                                <span class="h4 text-primary">${formatPrice(product.price)}</span>
                                ${product.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2">${formatPrice(product.originalPrice)}</span>` : ''}
                            </div>
                            <p class="text-muted mb-3">Category: ${product.category}</p>
                            <p class="text-muted mb-3">Brand: ${product.brand}</p>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" onclick="addToCart(${product.id}); bootstrap.Modal.getInstance(this.closest('.modal')).hide();">
                                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                </button>
                                <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">
                                    View Full Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return modal;
}

// ===== FORM VALIDATION =====
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    updateCartCount();
    
    // Initialize search functionality
    initializeSearch();
    
    // Render featured products on homepage
    renderFeaturedProducts();
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('form');
    if (newsletterForm && newsletterForm.querySelector('input[type="email"]')) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                showToast('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                showToast('Please enter a valid email address', 'danger');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Back to top button
    createBackToTopButton();
});

// ===== BACK TO TOP BUTTON =====
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'btn btn-primary btn-sm position-fixed';
    backToTopBtn.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
    `;
    backToTopBtn.title = 'Back to Top';
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== LAZY LOADING FOR IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Export for use in other files
window.ShopHub = {
    products,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    formatPrice,
    generateStars,
    showToast,
    validateEmail,
    validatePhone
};
