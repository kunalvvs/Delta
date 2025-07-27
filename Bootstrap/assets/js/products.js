// ===== PRODUCTS PAGE JAVASCRIPT =====

let currentPage = 1;
const productsPerPage = 12;
let filteredProducts = [...ShopHub.products];
let activeFilters = {
    categories: [],
    priceRanges: [],
    brands: [],
    ratings: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
    setupEventListeners();
    applyInitialFilters();
    renderProducts();
    renderPagination();
});

function initializeProductsPage() {
    // Get URL parameters for initial filtering
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        activeFilters.categories = [category];
        // Check the corresponding filter checkbox
        const categoryCheckbox = document.getElementById(category);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Filter checkboxes
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleProductSearch, 300));
    }
}

// ===== FILTER FUNCTIONS =====
function handleFilterChange(event) {
    const checkbox = event.target;
    const filterType = getFilterType(checkbox);
    const filterValue = checkbox.value;
    
    if (checkbox.checked) {
        if (!activeFilters[filterType].includes(filterValue)) {
            activeFilters[filterType].push(filterValue);
        }
    } else {
        activeFilters[filterType] = activeFilters[filterType].filter(value => value !== filterValue);
    }
    
    applyFilters();
    renderProducts();
    renderPagination();
    updateProductCount();
}

function getFilterType(checkbox) {
    const filterGroup = checkbox.closest('.filter-group');
    const heading = filterGroup.querySelector('h6').textContent.toLowerCase();
    
    switch (heading) {
        case 'category':
            return 'categories';
        case 'price range':
            return 'priceRanges';
        case 'brand':
            return 'brands';
        case 'rating':
            return 'ratings';
        default:
            return 'categories';
    }
}

function applyInitialFilters() {
    applyFilters();
}

function applyFilters() {
    filteredProducts = ShopHub.products.filter(product => {
        // Category filter
        if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
            return false;
        }
        
        // Price range filter
        if (activeFilters.priceRanges.length > 0) {
            const inPriceRange = activeFilters.priceRanges.some(range => {
                switch (range) {
                    case '0-50':
                        return product.price >= 0 && product.price <= 50;
                    case '50-100':
                        return product.price > 50 && product.price <= 100;
                    case '100-200':
                        return product.price > 100 && product.price <= 200;
                    case '200+':
                        return product.price > 200;
                    default:
                        return true;
                }
            });
            if (!inPriceRange) return false;
        }
        
        // Brand filter
        if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) {
            return false;
        }
        
        // Rating filter
        if (activeFilters.ratings.length > 0) {
            const minRating = Math.min(...activeFilters.ratings.map(r => parseInt(r)));
            if (product.rating < minRating) return false;
        }
        
        return true;
    });
    
    currentPage = 1; // Reset to first page when filters change
}

function clearAllFilters() {
    activeFilters = {
        categories: [],
        priceRanges: [],
        brands: [],
        ratings: []
    };
    
    // Uncheck all filter checkboxes
    document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset sort dropdown
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.value = 'featured';
    }
    
    applyFilters();
    renderProducts();
    renderPagination();
    updateProductCount();
}

// ===== SORTING FUNCTIONS =====
function handleSortChange(event) {
    const sortValue = event.target.value;
    sortProducts(sortValue);
    renderProducts();
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'featured':
        default:
            filteredProducts.sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return b.rating - a.rating;
            });
            break;
    }
}

// ===== SEARCH FUNCTIONS =====
function handleProductSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        applyFilters();
    } else {
        filteredProducts = ShopHub.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query)
        );
    }
    
    currentPage = 1;
    renderProducts();
    renderPagination();
    updateProductCount();
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

// ===== RENDERING FUNCTIONS =====
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (pageProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <h4>No products found</h4>
                <p class="text-muted">Try adjusting your filters or search terms.</p>
                <button class="btn btn-primary" onclick="clearAllFilters()">Clear All Filters</button>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = pageProducts.map(product => createProductCard(product)).join('');
    
    // Add fade-in animation
    productsGrid.classList.add('fade-in');
    setTimeout(() => productsGrid.classList.remove('fade-in'), 600);
}

function createProductCard(product) {
    const discountBadge = product.discount ? 
        `<span class="badge bg-danger position-absolute top-0 start-0 m-2">${product.discount}% OFF</span>` : '';
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card product-card h-100 border-0 shadow-sm">
                <div class="position-relative overflow-hidden">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 250px; object-fit: cover;">
                    ${discountBadge}
                    <div class="product-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center opacity-0">
                        <div class="btn-group" role="group">
                            <button class="btn btn-light btn-sm" onclick="ShopHub.addToWishlist(${product.id})" title="Add to Wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn btn-light btn-sm" onclick="quickView(${product.id})" title="Quick View">
                                <i class="fas fa-eye"></i>
                            </button>
                            <a href="product-detail.html?id=${product.id}" class="btn btn-light btn-sm" title="View Details">
                                <i class="fas fa-info-circle"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h6 class="card-title mb-2">${product.name}</h6>
                    <div class="product-rating mb-2">
                        <div class="stars text-warning d-inline-block">
                            ${ShopHub.generateStars(product.rating)}
                        </div>
                        <small class="text-muted ms-2">(${product.reviews})</small>
                    </div>
                    <div class="mt-auto">
                        <div class="price mb-3">
                            <span class="h6 text-primary mb-0">${ShopHub.formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<small class="text-muted text-decoration-line-through ms-2">${ShopHub.formatPrice(product.originalPrice)}</small>` : ''}
                        </div>
                        <div class="d-grid">
                            <button class="btn btn-primary" onclick="ShopHub.addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                                <i class="fas fa-shopping-cart me-2"></i>
                                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===== PAGINATION FUNCTIONS =====
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
        </li>
    `;
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        paginationHTML += `
            <li class="page-item">
                <button class="page-link" onclick="changePage(1)">1</button>
            </li>
        `;
        if (startPage > 2) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <button class="page-link" onclick="changePage(${i})">${i}</button>
            </li>
        `;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        paginationHTML += `
            <li class="page-item">
                <button class="page-link" onclick="changePage(${totalPages})">${totalPages}</button>
            </li>
        `;
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <button class="page-link" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        </li>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderProducts();
    renderPagination();
    updateProductCount();
    
    // Scroll to top of products
    document.getElementById('productsGrid').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// ===== UTILITY FUNCTIONS =====
function updateProductCount() {
    const productCountElement = document.getElementById('productCount');
    if (!productCountElement) return;
    
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, filteredProducts.length);
    const totalProducts = filteredProducts.length;
    
    productCountElement.textContent = `Showing ${startIndex}-${endIndex} of ${totalProducts} products`;
}

function quickView(productId) {
    const product = ShopHub.products.find(p => p.id === productId);
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
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid rounded" alt="${product.name}">
                        </div>
                        <div class="col-md-6">
                            <div class="product-rating mb-3">
                                <div class="stars text-warning">
                                    ${ShopHub.generateStars(product.rating)}
                                </div>
                                <span class="ms-2">${product.rating} (${product.reviews} reviews)</span>
                            </div>
                            <div class="price mb-3">
                                <span class="h4 text-primary">${ShopHub.formatPrice(product.price)}</span>
                                ${product.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2">${ShopHub.formatPrice(product.originalPrice)}</span>` : ''}
                            </div>
                            <p class="text-muted mb-2"><strong>Category:</strong> ${product.category}</p>
                            <p class="text-muted mb-3"><strong>Brand:</strong> ${product.brand}</p>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" onclick="ShopHub.addToCart(${product.id}); bootstrap.Modal.getInstance(this.closest('.modal')).hide();">
                                    <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                </button>
                                <button class="btn btn-outline-danger" onclick="ShopHub.addToWishlist(${product.id});">
                                    <i class="far fa-heart me-2"></i>Add to Wishlist
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

// ===== CSS ANIMATION FOR PRODUCT HOVER =====
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .product-card {
            transition: all 0.3s ease;
        }
        
        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .product-overlay {
            background: rgba(0,0,0,0.7);
            transition: opacity 0.3s ease;
        }
        
        .product-card:hover .product-overlay {
            opacity: 1 !important;
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
