// Define the Associate Tag here for easy modification
const ASSOCIATE_TAG = 'mmacfadden07c'; // Replace with your own Amazon Associate Tag

// Product Array
const products = [
    {
        id: 1,
        name: "Blue Light Glasses",
        description: "This is the description for product 1.",
        image: "img/blue_light_glasses.jpg",
        price: "$15.99",
        url: "https://www.amazon.com/Blue-Light-Blocking-Glasses-Anti-Fatigue/dp/B07JPF4TKK",
        asin: "B07JPF4TKK"
    },
    {
        id: 2,
        name: "Carhartt Men's Knit Cuffed Beanie",
        description: "This is the description for product 2.",
        image: "img/carharrt_hat.jpg",
        price: "$19.99",
        url: "https://www.amazon.com/Carhartt-Acrylic-Watch-Black-Size/dp/B002G9UDYG",
        asin: "B002G9UDYG"
    },
    {
        id: 3,
        name: "Canvas Lunch Bag",
        description: "This is the description for product 3.",
        image: "img/lunch_bag.jpg",
        price: "$60.00",
        url: "https://a.co/d/9uZGOwd",
        asin: "B07FVGMY99"
    }



];

// Cart Array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const productList = document.getElementById('product-list');

// Display Products
function displayProducts() {
    products.forEach(product => {
        productList.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card product_card">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="text-success">${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    displayCartItems();
    displayGrandTotal();
}

// Display Grand Total
function displayGrandTotal() {
    let grandTotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return total + (price * item.quantity);
    }, 0);

    document.getElementById('grand-total').textContent = `Total: $${grandTotal.toFixed(2)}`;
}

// Display Cart Items in Modal
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const priceNum = parseFloat(item.price.replace('$', ''));
        const subtotal = (priceNum * item.quantity).toFixed(2);

        cartItems.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.name} (x${item.quantity})
                <div>
                    <span class="me-1">$${subtotal}</span>
                    <span class="text-danger remove" onclick="removeFromCart(${item.id})"><i class="bi bi-x-circle"></i></span>
                </div>
            </li>`;
    });
}

// Checkout
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length > 0) {
        let url = 'https://www.amazon.com/gp/aws/cart/add.html?';
        cart.forEach((item, index) => {
            url += `ASIN.${index + 1}=${item.asin}&Quantity.${index + 1}=${item.quantity}&`;
        });
        url += `AssociateTag=${ASSOCIATE_TAG}`;

        window.open(url, '_blank'); // Opens the URL in a new tab
    } else {
        alert("Your cart is empty!");
    }
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Initialize 
displayProducts();
updateCart();