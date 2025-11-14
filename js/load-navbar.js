// Navbar HTML - Update this file to modify navbar on all pages
const navbarHTML = `
<nav class="navbar">
    <div class="container">
        <div class="nav-wrapper">
                <div class="logo">
                    <a href="home.html">
                    <img src="https://cdn.prod.website-files.com/68d1fdebc03c489c12937e6e/690913e2436a7d0a318501d3_logo-black.png" alt="TechBrother Logo" class="logo-image">
                </a>
            </div>
            <button class="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul class="nav-menu">
                <li><a href="home.html">Home</a></li>
                <li class="dropdown">
                    <a href="#" onclick="return false;">Services</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-menu-columns">
                            <div class="dropdown-column">
                                <div class="dropdown-category">
                                    <a href="home.html#services">Core Services</a>
                                </div>
                                <div class="dropdown-divider"></div>
                                <div class="dropdown-service-item">
                                    <a href="managed-it-support.html">Managed IT Support</a>
                                </div>
                                <div class="dropdown-service-item">
                                    <a href="one-time-it-projects.html">One Time IT Projects</a>
                                </div>
                                <div class="dropdown-service-item">
                                    <a href="it-consulting.html">IT Consulting</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </div>
</nav>
`;

// Load navbar into all pages
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;
        
        // Re-initialize mobile menu toggle after navbar is loaded
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
            
            // Handle dropdown menu - prevent navigation on click
            const dropdown = document.querySelector('.dropdown');
            if (dropdown) {
                const dropdownLink = dropdown.querySelector('a');
                
                if (dropdownLink) {
                    dropdownLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // On mobile, toggle the dropdown without closing the menu
                        if (window.innerWidth <= 768) {
                            dropdown.classList.toggle('active');
                        }
                        // On desktop, the dropdown shows on hover, so we just prevent navigation
                    });
                }
            }
            
            // Close mobile menu when clicking on a link (except dropdown parent link)
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Don't close menu if clicking dropdown parent link
                    if (link === dropdown?.querySelector('a')) {
                        return;
                    }
                    // Close menu for all other links
                    if (window.innerWidth <= 768) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                });
            });
            
            // Close menu when clicking outside of it
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        navMenu.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            });
        }
        
    }
});

