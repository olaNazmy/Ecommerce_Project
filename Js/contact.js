document.addEventListener('DOMContentLoaded', function ()
{

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarNav');


    navbarToggler.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'block' ? 'none' : 'block';
    });

    const form = document.getElementById('contact-form');

    function validateFullName() {
        const nameInput = document.getElementById('fullname');
        const isValid = nameInput.value.trim().length > 0;
        document.getElementById('validfullname').style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailInput.value);
        document.getElementById('validemail').style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phone');
        const phoneRegex = /^\+?[0-9]{7,}$/;
        const isValid = phoneRegex.test(phoneInput.value.replace(/[\s\-()]/g, ''));
        document.getElementById('validphone').style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();


        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();


        if (isNameValid && isEmailValid && isPhoneValid) {
            alert('Thank you for contacting us!');
            form.reset();
        }
    });

    // Real-time validation
    document.getElementById('fullname').addEventListener('input', validateFullName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('phone').addEventListener('input', validatePhone);

    //

    // Initialize cart count and items array
    let cartCount = 0;
    let cartItems = [];

    // Update the cart count display
    function updateCartCountDisplay() {
        cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

        const cartCountElement = document.getElementById('idnum');
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }


    window.addToCart = function (event) {
        event.preventDefault();

        // Get the clicked link or button
        const clickedElement = event.target;
        // Use the data-product-id attribute to identify the product
        const productId = clickedElement.getAttribute('data-product-id');

        // Navigate up to the .cart element that contains all product details
        const productElement = clickedElement.closest('.cart');

        // Find product name and price within the product element
        var productName = productElement.querySelector('.productName').innerText;
        var productPrice = productElement.querySelector('.productPrice').innerText;

        // Prepare product details object
        var product = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('$', ''))
        };

        // Always add new item to the cart
        cartItems.push(product);

        // Update cart count to total number of items
        cartCount = cartItems.length;
        updateCartCountDisplay(); // Update cart count display
        updateCartDisplay(); // Update cart items display
    };

    function updateCartDisplay() {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = '';

        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';

            // Create a single span element to display product details (name, price, quantity)
            const productDetails = document.createElement('span');
            productDetails.textContent = `${item.name} - $${item.price} x ${item.quantity || 1}`;
            productDetails.className = 'cart-item-details';

            // Create Increase Quantity Button
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.className = 'increase-button';
            increaseButton.onclick = () => {
                item.quantity = (item.quantity || 1) + 1;
                updateCartDisplay(); // Update the display of cart items
                updateCartCountDisplay();
            };

            // Create Remove Button with Icon
            const removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            removeButton.className = 'remove-button';
            removeButton.onclick = () => {
                cartItems.splice(index, 1);
                cartCount = cartItems.length;
                updateCartCountDisplay();
                updateCartDisplay();
            };

            itemElement.appendChild(productDetails);
            itemElement.appendChild(increaseButton);
            itemElement.appendChild(removeButton);
            cartContainer.appendChild(itemElement);
        });

        // Create "Total" element
        const totalElement = document.createElement('div');
        totalElement.className = 'total';
        totalElement.textContent = `Total: $${calculateTotal().toFixed(2)}`;

        // Create "Checkout" button
        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Checkout';
        checkoutButton.className = 'checkout-button';
        checkoutButton.onclick = () => {
            // Implement your checkout logic here
        };

        cartContainer.appendChild(totalElement);
        cartContainer.appendChild(checkoutButton);
    }

    // Function to calculate the total based on cart items
    function calculateTotal() {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    }

    // Initialize cart items array and reference DOM elements
    const cartIcon = document.getElementById('cart-icon');
    const cartContainer = document.getElementById('cart-container');

    // Toggle cart container display
    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    });



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
    // Function to scroll to top smoothly
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event listener to the Back to Top button
    document.getElementById('backToTop').addEventListener('click', scrollToTop);
});