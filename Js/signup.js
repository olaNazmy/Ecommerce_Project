document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarNav');


    navbarToggler.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'block' ? 'none' : 'block';
    });


    function setValidity(inputElement, isValid) {
        inputElement.style.borderColor = isValid ? 'green' : 'red';
    }


    function validateName() {
        var nameInput = document.getElementById('name');
        var isValid = nameInput.value.length > 0;
        setValidity(nameInput, isValid);
        document.getElementById('validname').style.display = isValid ? 'none' : 'block';
    }


    function validateEmail() {
        var emailInput = document.getElementById('email');
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        var isValid = emailRegex.test(emailInput.value);
        setValidity(emailInput, isValid);
        document.getElementById('validemail').style.display = isValid ? 'none' : 'block';
    }


    function validatePassword() {
        var passwordInput = document.getElementById('password');
        var isValid = passwordInput.value.length >= 8;
        setValidity(passwordInput, isValid);
        document.getElementById('validpassword').style.display = isValid ? 'none' : 'block';
    }


    function validateConfirmPassword() {
        var confirmPasswordInput = document.getElementById('confirm');
        var isMatch = confirmPasswordInput.value === document.getElementById('password').value;
        setValidity(confirmPasswordInput, isMatch);
        document.getElementById('validconfirmpassword').style.display = isMatch ? 'none' : 'block';
    }


    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('confirm').addEventListener('input', validateConfirmPassword);


    document.getElementById('signup-form').addEventListener('submit', function (e) {
        validateName();
        validateEmail();
        validatePassword();
        validateConfirmPassword();


        var isNameValid = document.getElementById('validname').style.display === 'none';
        var isEmailValid = document.getElementById('validemail').style.display === 'none';
        var isPasswordValid = document.getElementById('validpassword').style.display === 'none';
        var isConfirmPasswordValid = document.getElementById('validconfirmpassword').style.display === 'none';

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            e.preventDefault();
        } else {

            alert('Your account has been successfully created!');

        }
    });
    // Function to scroll to top smoothly
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event listener to the Back to Top button
    document.getElementById('backToTop').addEventListener('click', scrollToTop);

});