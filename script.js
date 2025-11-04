document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalItems = document.getElementById('cart-total-items');
    const emptyMessage = document.querySelector('.empty-cart-message');
    const buyForm = document.getElementById('buy-form');
    const popupBox = document.querySelector('.popup-box');
    const closePopupBtn = document.querySelector('.close-popup');
    
    // Simple in-memory cart
    let cart = [];

    /**
     * Updates the Cart UI based on the cart array.
     */
    function updateCartUI() {
        cartItemsList.innerHTML = ''; // Clear existing items

        if (cart.length === 0) {
            emptyMessage.style.display = 'list-item';
        } else {
            emptyMessage.style.display = 'none';
            cart.forEach((item, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span>${item.name}</span>
                    <button class="remove-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Remove</button>
                `;
                cartItemsList.appendChild(listItem);
            });
        }

        cartTotalItems.textContent = cart.length;
    }

    /**
     * Handles adding a product to the cart.
     */
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-product');
            cart.push({ name: productName });
            updateCartUI();
            
            // Add a temporary 'pop' visual feedback
            e.target.style.transform = 'scale(0.9)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1)';
            }, 100);

            // Scroll to cart to show the result
            document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
        });
    });

    /**
     * Handles removing an item from the cart. (Delegation)
     */
    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') || e.target.parentElement.classList.contains('remove-btn')) {
            // Get the button element
            const removeButton = e.target.classList.contains('remove-btn') ? e.target : e.target.parentElement;
            const indexToRemove = parseInt(removeButton.getAttribute('data-index'));
            
            // Remove 1 item at the specified index
            cart.splice(indexToRemove, 1);
            updateCartUI();
        }
    });

    /**
     * Handles the Buy Form submission.
     */
    buyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty! Please add products before checking out.");
        } else {
            // Simulate successful purchase
            alert(`Order placed successfully for ${cart.length} item(s)! A confirmation email has been sent.`);
            cart = []; // Empty the cart after successful purchase
            updateCartUI();
            buyForm.reset();
        }
    });

    /**
     * Handles closing the floating pop-up box.
     */
    closePopupBtn.addEventListener('click', () => {
        popupBox.style.display = 'none';
    });

    // Initial load
    updateCartUI();
});