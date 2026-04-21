document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const orderConfirmModal = new bootstrap.Modal(document.getElementById('orderConfirmModal'));
    const cartButton = document.getElementById('cartButton');

    // Add to Cart with Animation
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            // Button bounce effect
            this.classList.add('animate__animated', 'animate__bounce');
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__bounce');
            }, 1000);

            // Cart icon bounce
            cartButton.classList.add('animate__animated', 'animate__bounce');
            setTimeout(() => {
                cartButton.classList.remove('animate__animated', 'animate__bounce');
            }, 1000);

            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                quantity: 1
            };

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }

            updateCart();
            cartModal.show();
        });
    });

    // Update Cart UI with Animations
    function updateCart() {
        const cartItemsEl = document.getElementById('cartItems');
        const checkoutItemsEl = document.getElementById('checkoutItems');
        const cartCounter = document.getElementById('cartCounter');

        // Update Cart Counter with animation
        cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => {
            cartCounter.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);

        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="text-center py-4 animate__animated animate__fadeIn">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Your cart is empty</p>
                </div>
            `;
            checkoutItemsEl.innerHTML = `<p class="text-muted animate__animated animate__fadeIn">No items in cart</p>`;
        } else {
            // Render Cart Items with slide-in animation
            let cartHtml = '';
            let checkoutHtml = '';
            let subtotal = 0;

            cart.forEach((item, index) => {
                subtotal += item.price * item.quantity;
                cartHtml += `
                    <div class="d-flex mb-3 cart-item added" style="animation-delay: ${index * 0.1}s">
                        <img src="${item.image}" width="80" height="80" class="rounded me-3" alt="${item.name}">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div>
                                    <span class="text-muted">Rs ${item.price} × </span>
                                    <select class="form-select form-select-sm d-inline-block quantity-selector" data-id="${item.id}" style="width: 70px;">
                                        ${Array.from({length: 10}, (_, i) => 
                                            `<option value="${i+1}" ${item.quantity === i+1 ? 'selected' : ''}>${i+1}</option>`
                                        ).join('')}
                                    </select>
                                </div>
                                <span class="fw-bold">Rs ${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <button class="btn btn-sm btn-outline-danger mt-2 remove-item" data-id="${item.id}">
                                <i class="fas fa-trash-alt"></i> Remove
                            </button>
                        </div>
                    </div>
                `;
                checkoutHtml += `
                    <div class="d-flex justify-content-between mb-2 animate__animated animate__fadeIn">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>Rs ${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
            });

            cartItemsEl.innerHTML = cartHtml;
            checkoutItemsEl.innerHTML = checkoutHtml;

            // Calculate Totals with animation
            const tax = subtotal * 0.05;
            const shipping = 200;
            const total = subtotal + tax + shipping;

            // Animate price updates
            const animatePriceUpdate = (element, newValue) => {
                element.classList.add('animate__animated', 'animate__flash');
                element.textContent = `Rs ${newValue.toFixed(2)}`;
                setTimeout(() => {
                    element.classList.remove('animate__animated', 'animate__flash');
                }, 500);
            };

            animatePriceUpdate(document.getElementById('cartSubtotal'), subtotal);
            animatePriceUpdate(document.getElementById('cartTax'), tax);
            animatePriceUpdate(document.getElementById('cartTotal'), total);
            animatePriceUpdate(document.getElementById('checkoutSubtotal'), subtotal);
            animatePriceUpdate(document.getElementById('checkoutTax'), tax);
            animatePriceUpdate(document.getElementById('checkoutTotal'), total);

            // Add event listeners for quantity changes
            document.querySelectorAll('.quantity-selector').forEach(select => {
                select.addEventListener('change', function() {
                    const id = this.dataset.id;
                    const newQty = parseInt(this.value);
                    const item = cart.find(item => item.id === id);
                    if (item) {
                        item.quantity = newQty;
                        updateCart();
                    }
                });
            });

            // Add event listeners for remove buttons with animation
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.dataset.id;
                    const itemElement = this.closest('.cart-item');
                    itemElement.classList.add('removing');
                    
                    setTimeout(() => {
                        const index = cart.findIndex(item => item.id === id);
                        if (index !== -1) {
                            cart.splice(index, 1);
                            updateCart();
                        }
                    }, 500);
                });
            });
        }
    }

    // Place Order Button with Animation
    document.getElementById('placeOrderBtn').addEventListener('click', function() {
        this.classList.add('animate__animated', 'animate__heartBeat');
        setTimeout(() => {
            checkoutModal.hide();
            orderConfirmModal.show();
            cart.length = 0; // Clear cart
            updateCart();
        }, 1000);
    });
});