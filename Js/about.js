document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.getElementById('navbarNav');


    navbarToggler.addEventListener('click', () => {
        navbarMenu.style.display = navbarMenu.style.display === 'block' ? 'none' : 'block';
    });


    
    // Function to scroll to top smoothly
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event listener to the Back to Top button
    document.getElementById('backToTop').addEventListener('click', scrollToTop);

});