document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const navIndicator = document.getElementById('nav-indicator');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Offset for navbar height
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    function updateActiveLink() {
        let current = '';
        const navbarHeight = document.querySelector('nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        let activeLinkFound = false;

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                activeLinkFound = true;
                
                // Update indicator position
                if (navIndicator) {
                    navIndicator.style.width = `${link.offsetWidth}px`;
                    navIndicator.style.left = `${link.offsetLeft}px`;
                    navIndicator.style.opacity = '1';
                }
            }
        });

        // Hide indicator if no section is active (e.g. at the very top before any section)
        if (!activeLinkFound && navIndicator) {
            navIndicator.style.opacity = '0';
        }
    }

    // Initialize and listen to scroll events
    // Add a small delay for initialization to ensure fonts/layout are loaded so offsetWidth is accurate
    setTimeout(updateActiveLink, 100);
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('resize', updateActiveLink);
});
