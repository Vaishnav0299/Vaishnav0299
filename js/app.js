document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons for Client-Side DOM Nodes
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Theme Engine Configurations
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

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

    // Intercept navigation tracking active scroll regions
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});
