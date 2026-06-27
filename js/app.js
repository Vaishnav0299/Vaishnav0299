/**
 * Developer OS - Core Application Runner
 * Synchronizes layout setups, theme adjustments, and runtime controls.
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("Developer OS Framework: Core initialized successfully.");

    // Validate and trigger global lucide vector icon structures
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Theme Engine Configurations
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const savedTheme = localStorage.getItem('os-theme') || getSystemTheme();
        
        // Set Initial Architectural State
        htmlElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('os-theme', nextTheme);
        });
    }

    // Intercept navbar link click actions for smooth scrolling offsets
    const navigationActionAnchors = document.querySelectorAll('.nav-links a, .nav-actions .btn, .hero-cta-group .btn');
    
    navigationActionAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const URLTargetID = this.getAttribute('href');
            
            // Confirm target parameter is an ID scroll reference vector
            if (URLTargetID && URLTargetID.startsWith('#')) {
                event.preventDefault();
                const actualTargetNode = document.querySelector(URLTargetID);
                
                if (actualTargetNode) {
                    const navigationHeaderHeight = document.querySelector('.navbar').offsetHeight;
                    const calculatedTargetPosition = actualTargetNode.offsetTop - navigationHeaderHeight;

                    window.scrollTo({
                        top: calculatedTargetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
