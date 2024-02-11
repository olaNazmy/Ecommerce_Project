document.addEventListener('DOMContentLoaded', function () 
{
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartCountDisplay() {
        let cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        const cartCountElement = document.getElementById('idnum');
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }

    window.addToCart = function (event) 
    {
        event.preventDefault();
        const clickedElement = event.target;
        const productId = clickedElement.getAttribute('data-product-id');
        const productElement = clickedElement.closest('.cart');
        var productName = productElement.querySelector('.productName').innerText;
        var productPrice = productElement.querySelector('.productPrice').innerText;

        var product = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('$', '')),
            quantity: 1
        };

        // Check if product already exists in cart, if so, increase quantity
        const existingProductIndex = cartItems.findIndex(item => item.id === productId);
        if (existingProductIndex > -1) {
            cartItems[existingProductIndex].quantity += 1;
        } else {
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCountDisplay();
        updateCartDisplay();
    };
    //view details
    window.viewDetails = function (productId) {
        console.log(productId);
        var product = document.getElementById(productId);
        if (!product) {
            console.error("Product not found:", productId);
            return;
        }
    
        var productName = product.querySelector('.productName').textContent;
        var productPrice = product.querySelector('.productPrice').textContent;
        var productImgSrc = product.querySelector('.product-img img').src;
    
        document.getElementById('overlay-productName').textContent = productName;
        document.getElementById('overlay-productPrice').textContent = productPrice;
        document.getElementById('overlay-img').src = productImgSrc;
    
        document.getElementById('overlay').style.display = 'flex';
    };
    
    window.closeOverlay = function () {
        document.getElementById('overlay').style.display = 'none';
    };

  
    //end details
    function updateCartDisplay() 
    {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = ''; // Clear the cart container

        cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            const emptyMessageElement = document.createElement('div');
            emptyMessageElement.textContent = 'Your cart is empty';
            emptyMessageElement.className = 'empty-cart-message';
            cartContainer.appendChild(emptyMessageElement);
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';

                const productDetails = document.createElement('span');
                productDetails.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
                productDetails.className = 'cart-item-details';

                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.className = 'increase-button';
                increaseButton.onclick = () => {
                    item.quantity += 1;
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartDisplay();
                    updateCartCountDisplay();
                };

                const removeButton = document.createElement('button');
                removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
                removeButton.className = 'remove-button';
                removeButton.onclick = () => {
                    cartItems.splice(index, 1);
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    updateCartDisplay();
                    updateCartCountDisplay();
                };

                itemElement.appendChild(productDetails);
                itemElement.appendChild(increaseButton);
                itemElement.appendChild(removeButton);
                cartContainer.appendChild(itemElement);
            });
        }

        // Append the total display and checkout button
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.textContent = `Total: $${calculateTotal().toFixed(2)}`;
        cartContainer.appendChild(totalElement);

        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Checkout';
        checkoutButton.className = 'checkout-button';
        checkoutButton.onclick = () => {
            // Implement your checkout functionality here
            console.log('Proceeding to checkout...');
        };
        cartContainer.appendChild(checkoutButton);
    }
    function calculateTotal() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function updateTotalDisplay() {
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = `Total: $${calculateTotal().toFixed(2)}`;
        }
    }

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', function (event) {
        event.preventDefault();
        const cartContainer = document.getElementById('cart-container');
        cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
    });

    let currentImage = 1;
    const updateImage = () => 
    {
        document.getElementById("currentimg").style.backgroundImage = `url("/images/slider/${currentImage}.jpg")`;
    };
    setInterval(() => {
        currentImage = currentImage === 3 ? 1 : currentImage + 1;
        updateImage();
    }, 5000);
    document.getElementById("next").addEventListener("click", () => {
        currentImage = currentImage === 3 ? 1 : currentImage + 1;
        updateImage();
    });
    document.getElementById("prev").addEventListener("click", () => {
        currentImage = currentImage === 1 ? 3 : currentImage - 1;
        updateImage();
    });

    const animateText = (text, elementId, interval, pause) => {
        let index = 0;
        const targetElement = document.getElementById(elementId);
        const type = () => {
            if (index < text.length) {
                targetElement.innerHTML += text.charAt(index++);
                setTimeout(type, interval);
            } else {
                setTimeout(() => {
                    targetElement.innerHTML = '';
                    index = 0;
                    type();
                }, pause);
            }
        };
        type();
    };
    animateText("NEW COLLECTION.", 'animatedText', 400, 3000);

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarNav');
    navbarToggler.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'block' ? 'none' : 'block';
    });

    function showCategory(category) {
        const categories = ['watches', 'clothes', 'perfumes', 'bags'];
        categories.forEach(cat => {
            const div = document.getElementById(`all-${cat}`);
            if (div) div.style.display = cat === category ? 'block' : 'none';
        });
    }
    window.showClothes = (event) => { showCategory('clothes'); event.preventDefault(); };
    window.showWatches = (event) => { showCategory('watches'); event.preventDefault(); };
    window.showPerfumes = (event) => { showCategory('perfumes'); event.preventDefault(); };
    window.showBags = (event) => { showCategory('bags'); event.preventDefault(); };

    updateCartDisplay();
    //Attach event listeners to "View Details" buttons
    document.querySelectorAll('.view-details button').forEach(button => {
        button.addEventListener('click', function () {
            var productId = this.closest('.cart').id;
            viewDetails(productId);
        });
    });
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    function scrollToTop() 
    {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
