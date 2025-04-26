// Theme Management
const documentBody = document.body;
const themeToggle = document.getElementById('toggleTheme');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS theme setting
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    documentBody.classList.add('dark-theme');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
  documentBody.classList.toggle('dark-theme');
  const isDark = documentBody.classList.contains('dark-theme');
  
  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Navigation and UI Controls
const searchToggle = document.getElementById('toggleSearch');
const searchContainer = document.getElementById('searchContainer');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('toggleMenu');
const navLinks = document.getElementById('navLinks');
const cartToggle = document.getElementById('toggleCart');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');

// Toggle search panel
searchToggle.addEventListener('click', () => {
  searchContainer.style.display = 'block';
  searchInput.focus();
});

closeSearch.addEventListener('click', () => {
  searchContainer.style.display = 'none';
});

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Toggle cart
cartToggle.addEventListener('click', () => {
  cartSidebar.classList.add('active');
  overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Close modal and overlay
closeModal.addEventListener('click', () => {
  productModal.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  if (cartSidebar.classList.contains('active')) {
    cartSidebar.classList.remove('active');
  }
  if (productModal.classList.contains('active')) {
    productModal.classList.remove('active');
  }
  overlay.classList.remove('active');
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  filterProducts(query);
});

function filterProducts(query) {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    const productDesc = card.querySelector('.product-description').textContent.toLowerCase();
    const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
    
    if (productName.includes(query) || productDesc.includes(query) || productCategory.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
  
  updateEmptyStateVisibility();
}

// Product Management
// Sample product data for each category
const productData = {
  medicine: [
    {
      id: 'm1',
      name: 'Pain Relief Tablets',
      description: 'Fast-acting pain relief for headaches and mild pain',
      price: 8.99,
      image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'medicine'
    },
    {
      id: 'm2',
      name: 'Cold & Flu Relief',
      description: 'Multi-symptom relief for cold and flu symptoms',
      price: 12.99,
      image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'medicine'
    },
    {
      id: 'm3',
      name: 'Allergy Relief',
      description: '24-hour non-drowsy allergy symptom relief',
      price: 14.50,
      image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'medicine'
    },
    {
      id: 'm4',
      name: 'Digestive Health Tablets',
      description: 'Relief from indigestion and heartburn',
      price: 9.75,
      image: 'https://images.pexels.com/photos/6941884/pexels-photo-6941884.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'medicine'
    }
  ],
  firstaid: [
    {
      id: 'f1',
      name: 'First Aid Kit',
      description: 'Complete emergency kit with essential supplies',
      price: 24.99,
      image: 'https://uoflhealth.org/wp-content/uploads/2021/11/First-Aid-kit.jpg',
      category: 'firstaid'
    },
    {
      id: 'f2',
      name: 'Adhesive Bandages',
      description: 'Water-resistant bandages in various sizes',
      price: 5.99,
      image: 'https://cdn.shopify.com/s/files/1/0570/8572/2814/products/Fingerbandage_Beige_bearbeitet-neu.jpg?v=1665495556',
      category: 'firstaid'
    },
    {
      id: 'f3',
      name: 'Antiseptic Wipes',
      description: 'Individually wrapped antiseptic cleaning wipes',
      price: 6.50,
      image: 'https://pigeon.com.pk/wp-content/uploads/2020/10/P26351-600x600-1-1.jpg',
      category: 'firstaid'
    },
    {
      id: 'f4',
      name: 'Burn Relief Gel',
      description: 'Cooling gel for minor burns and sunburn',
      price: 7.99,
      image: 'https://m.media-amazon.com/images/I/419rEwOGdNL._BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg',
      category: 'firstaid'
    }
  ],
  personalcare: [
    {
      id: 'p1',
      name: 'Moisturizing Lotion',
      description: 'Hydrating body lotion for dry skin',
      price: 11.99,
      image: 'https://i5.walmartimages.com/asr/6c18b35f-071c-4158-b479-b532e559df05.65621f4fb5d964ccc8154dc8120c9b0a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
      category: 'personalcare'
    },
    {
      id: 'p2',
      name: 'Sunscreen SPF 50',
      description: 'Broad spectrum UV protection, water resistant',
      price: 15.99,
      image: 'https://www.orior.pk/cdn/shop/files/Sunscreen.jpg?v=1717937200',
      category: 'personalcare'
    },
    {
      id: 'p3',
      name: 'Dental Care Kit',
      description: 'Complete oral care set with toothbrush and floss',
      price: 8.99,
      image: 'https://www.shutterstock.com/image-photo/toothbrush-tongue-cleaner-floss-toothpaste-600nw-2161809433.jpg',
      category: 'personalcare'
    },
    {
      id: 'p4',
      name: 'Hand Sanitizer',
      description: 'Kills 99.9% of germs without water',
      price: 4.99,
      image: 'https://www.wbhemani.com/images/thumbs/0006671_hemani-hand-sanitizer-250ml_550.jpeg',
      category: 'personalcare'
    }
  ]
};

// Combine all products for the "All" category
const allProducts = [
  ...productData.medicine,
  ...productData.firstaid,
  ...productData.personalcare
];

// Initialize the product grid with all products
function initProductGrid() {
  renderProducts(allProducts);
}

// Render products in the grid
function renderProducts(products) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';
  
  if (products.length === 0) {
    showEmptyState(productGrid);
    return;
  }
  
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.dataset.category = product.category;
  
  card.innerHTML = `
    <div class="product-img">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <div class="product-category">${getCategoryLabel(product.category)}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-actions">
        <div class="quantity-control">
          <button class="quantity-btn minus-btn" data-id="${product.id}">-</button>
          <input type="number" class="quantity-input" value="1" min="1" max="99">
          <button class="quantity-btn plus-btn" data-id="${product.id}">+</button>
        </div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  card.querySelector('.add-to-cart').addEventListener('click', (e) => {
    const productId = e.target.dataset.id;
    const quantity = parseInt(card.querySelector('.quantity-input').value);
    addToCart(productId, quantity);
  });
  
  card.querySelector('.minus-btn').addEventListener('click', (e) => {
    const input = card.querySelector('.quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
      input.value = currentValue - 1;
    }
  });
  
  card.querySelector('.plus-btn').addEventListener('click', (e) => {
    const input = card.querySelector('.quantity-input');
    const currentValue = parseInt(input.value);
    if (currentValue < 99) {
      input.value = currentValue + 1;
    }
  });
  
  // View product details
  card.addEventListener('click', (e) => {
    // Ignore clicks on buttons and inputs
    if (!e.target.closest('.product-actions')) {
      showProductModal(product);
    }
  });
  
  return card;
}

// Show empty state
function showEmptyState(container) {
  const emptyState = document.createElement('div');
  emptyState.className = 'empty-state';
  emptyState.innerHTML = `
    <i class="fas fa-search"></i>
    <h3>No Products Found</h3>
    <p>We couldn't find any products matching your criteria.</p>
    <button class="btn secondary-btn reset-filters">Clear Filters</button>
  `;
  
  emptyState.querySelector('.reset-filters').addEventListener('click', () => {
    // Reset search and filters
    searchInput.value = '';
    const allFilterPill = document.querySelector('.filter-pill[data-filter="all"]');
    if (allFilterPill) {
      activateFilterPill(allFilterPill);
    }
    renderProducts(allProducts);
  });
  
  container.appendChild(emptyState);
}

// Update empty state visibility
function updateEmptyStateVisibility() {
  const productCards = document.querySelectorAll('.product-card');
  const visibleCards = Array.from(productCards).filter(card => card.style.display !== 'none');
  const productGrid = document.getElementById('productGrid');
  
  // Remove existing empty state if any
  const existingEmptyState = productGrid.querySelector('.empty-state');
  if (existingEmptyState) {
    existingEmptyState.remove();
  }
  
  if (visibleCards.length === 0) {
    showEmptyState(productGrid);
  }
}

// Get user-friendly category label
function getCategoryLabel(categorySlug) {
  const labels = {
    'medicine': 'Medicine',
    'firstaid': 'First Aid',
    'personalcare': 'Personal Care'
  };
  return labels[categorySlug] || categorySlug;
}

// Show product modal
function showProductModal(product) {
  const modalBody = document.getElementById('modalBody');
  
  modalBody.innerHTML = `
    <div class="modal-product">
      <div class="modal-product-img">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-product-info">
        <div class="modal-product-category">${getCategoryLabel(product.category)}</div>
        <h3>${product.name}</h3>
        <div class="modal-product-price">$${product.price.toFixed(2)}</div>
        <div class="modal-product-description">${product.description}</div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. In hac habitasse platea dictumst. Vivamus in turpis eu elit elementum efficitur non a tortor.</p>
        <div class="product-actions">
          <div class="quantity-control">
            <button class="quantity-btn minus-btn">-</button>
            <input type="number" class="quantity-input" value="1" min="1" max="99">
            <button class="quantity-btn plus-btn">+</button>
          </div>
          <button class="btn primary-btn modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  const minusBtn = modalBody.querySelector('.minus-btn');
  const plusBtn = modalBody.querySelector('.plus-btn');
  const quantityInput = modalBody.querySelector('.quantity-input');
  const addToCartBtn = modalBody.querySelector('.modal-add-to-cart');
  
  minusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  plusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 99) {
      quantityInput.value = currentValue + 1;
    }
  });
  
  addToCartBtn.addEventListener('click', () => {
    const productId = addToCartBtn.dataset.id;
    const quantity = parseInt(quantityInput.value);
    addToCart(productId, quantity);
    productModal.classList.remove('active');
    overlay.classList.remove('active');
  });
  
  productModal.classList.add('active');
  overlay.classList.add('active');
}

// Shopping Cart Management
const cartItems = [];
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

// Add item to cart
function addToCart(productId, quantity) {
  const selectedProduct = findProductById(productId);
  
  if (!selectedProduct) return;
  
  // Check if product already in cart
  const existingItem = cartItems.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      ...selectedProduct,
      quantity
    });
  }
  
  updateCart();
  showToast(`${selectedProduct.name} added to cart`, 'success');
}

// Find product by ID from all products
function findProductById(productId) {
  return allProducts.find(product => product.id === productId);
}

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = '';
  
  if (cartItems.length === 0) {
    showEmptyCart();
  } else {
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      
      cartItem.innerHTML = `
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
          <div class="cart-item-actions">
            <button class="cart-item-decrease" data-id="${item.id}">-</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="cart-item-increase" data-id="${item.id}">+</button>
            <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
      `;
      
      cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to cart items
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        removeFromCart(e.currentTarget.dataset.id);
      });
    });
    
    document.querySelectorAll('.cart-item-decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateCartItemQuantity(e.currentTarget.dataset.id, -1);
      });
    });
    
    document.querySelectorAll('.cart-item-increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateCartItemQuantity(e.currentTarget.dataset.id, 1);
      });
    });
  }
  
  // Update cart total and count
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  if (totalItems === 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'flex';
  }
}

// Show empty cart state
function showEmptyCart() {
  const emptyCart = document.createElement('div');
  emptyCart.className = 'empty-cart';
  
  emptyCart.innerHTML = `
    <i class="fas fa-shopping-cart"></i>
    <h3>Your cart is empty</h3>
    <p>Start adding items to your cart to see them here.</p>
    <button class="btn primary-btn continue-shopping" id="continueShopping">Continue Shopping</button>
  `;
  
  cartItemsContainer.appendChild(emptyCart);
  
  // Add event listener
  document.getElementById('continueShopping').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
  });
}

// Remove item from cart
function removeFromCart(productId) {
  const index = cartItems.findIndex(item => item.id === productId);
  
  if (index !== -1) {
    const removedItem = cartItems[index];
    cartItems.splice(index, 1);
    updateCart();
    showToast(`${removedItem.name} removed from cart`, 'success');
  }
}

// Update cart item quantity
function updateCartItemQuantity(productId, change) {
  const item = cartItems.find(item => item.id === productId);
  
  if (item) {
    item.quantity += change;
    
    if (item.quantity < 1) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
  if (cartItems.length > 0) {
    cartItems.length = 0;
    updateCart();
    showToast('Cart cleared', 'success');
  }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
  if (cartItems.length > 0) {
    alert(`Checkout complete! Total: ${cartTotal.textContent}`);
    cartItems.length = 0;
    updateCart();
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    showToast('Checkout complete! Thank you for your purchase.', 'success');
  }
});

// Toast notifications
function showToast(message, type = 'success') {
  // Create toast container if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  // Create toast
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
  
  toast.innerHTML = `
    <i class="fas ${icon}"></i>
    <div class="toast-content">${message}</div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Remove toast after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3300);
}

// Filter products by category
const filterPills = document.querySelectorAll('.filter-pill');

filterPills.forEach(pill => {
  pill.addEventListener('click', () => {
    activateFilterPill(pill);
    
    const filter = pill.dataset.filter;
    let filteredProducts;
    
    if (filter === 'all') {
      filteredProducts = allProducts;
      updateProductHeader('All Products', 'Browse our complete catalog of healthcare products');
    } else {
      filteredProducts = productData[filter] || [];
      updateProductHeader(
        `${getCategoryLabel(filter)}`,
        `Browse our selection of ${getCategoryLabel(filter).toLowerCase()} products`
      );
    }
    
    renderProducts(filteredProducts);
  });
});

function activateFilterPill(pill) {
  // Remove active class from all pills
  filterPills.forEach(p => p.classList.remove('active'));
  // Add active class to the clicked pill
  pill.classList.add('active');
}

// Update product section header
function updateProductHeader(title, description) {
  document.getElementById('productTitle').textContent = title;
  document.getElementById('productDescription').textContent = description;
}

// Sort products
const sortSelect = document.getElementById('sortSelect');

sortSelect.addEventListener('change', () => {
  const sortValue = sortSelect.value;
  const productCards = Array.from(document.querySelectorAll('.product-card'));
  const productGrid = document.getElementById('productGrid');
  
  // Sort the product cards
  productCards.sort((a, b) => {
    const aName = a.querySelector('.product-name').textContent;
    const bName = b.querySelector('.product-name').textContent;
    const aPrice = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
    const bPrice = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
    
    if (sortValue === 'name') {
      return aName.localeCompare(bName);
    } else if (sortValue === 'price-low') {
      return aPrice - bPrice;
    } else if (sortValue === 'price-high') {
      return bPrice - aPrice;
    }
    return 0;
  });
  
  // Clear and re-append sorted cards
  productGrid.innerHTML = '';
  productCards.forEach(card => {
    productGrid.appendChild(card);
  });
});

// Category card clicks
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    const filterPill = document.querySelector(`.filter-pill[data-filter="${category}"]`);
    
    if (filterPill) {
      // Smooth scroll to products section
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      
      // Add a small delay to activate the filter pill after scrolling
      setTimeout(() => {
        activateFilterPill(filterPill);
        
        const filteredProducts = productData[category] || [];
        updateProductHeader(
          `${getCategoryLabel(category)}`,
          `Browse our selection of ${getCategoryLabel(category).toLowerCase()} products`
        );
        
        renderProducts(filteredProducts);
      }, 500);
    }
  });
});

// Category links in footer
const footerCategoryLinks = document.querySelectorAll('.footer-section a[data-category]');

footerCategoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const category = link.dataset.category;
    const filterPill = document.querySelector(`.filter-pill[data-filter="${category}"]`);
    
    if (filterPill) {
      // Smooth scroll to products section
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
      
      // Add a small delay to activate the filter pill after scrolling
      setTimeout(() => {
        activateFilterPill(filterPill);
        
        const filteredProducts = productData[category] || [];
        updateProductHeader(
          `${getCategoryLabel(category)}`,
          `Browse our selection of ${getCategoryLabel(category).toLowerCase()} products`
        );
        
        renderProducts(filteredProducts);
      }, 500);
    }
  });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    showToast('Your message has been sent successfully. We will get back to you soon!', 'success');
    
    // Reset form
    contactForm.reset();
  });
}

// Initialize the application
function init() {
  initTheme();
  initProductGrid();
  updateCart();
  
  // Apply the "all" filter initially
  const allFilterPill = document.querySelector('.filter-pill[data-filter="all"]');
  if (allFilterPill) {
    activateFilterPill(allFilterPill);
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);