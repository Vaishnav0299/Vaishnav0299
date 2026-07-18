document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.getElementById('skills-matrix-grid');

    const skillsData = [
        {
            category: "Frontend Architecture",
            icon: "layout",
            items: [
                { name: "React.js / Next.js", val: "95%" },
                { name: "TypeScript / JavaScript", val: "92%" },
                { name: "Tailwind CSS / HTML5 / CSS3", val: "95%" }
            ]
        },
        {
            category: "Backend & Cloud APIs",
            icon: "server",
            items: [
                { name: "Node.js / Express / Hono", val: "90%" },
                { name: "Python / FastAPI", val: "92%" },
                { name: "RESTful & GraphQL APIs", val: "88%" }
            ]
        },
        {
            category: "Databases & Infrastructure",
            icon: "database",
            items: [
                { name: "PostgreSQL / MongoDB", val: "88%" },
                { name: "Vector DBs (ChromaDB / Redis)", val: "85%" },
                { name: "Docker / CI/CD Actions / AWS", val: "82%" }
            ]
        },
        {
            category: "AI, ML & Data Science",
            icon: "cpu",
            items: [
                { name: "LangChain / Ollama Multi-Agent", val: "90%" },
                { name: "Scikit-Learn / TensorFlow", val: "86%" },
                { name: "Pandas / NumPy / Jupyter EDA", val: "92%" }
            ]
        }
    ];

    skillsGrid.innerHTML = skillsData.map(cat => `
        <div class="skill-category-card">
            <h3>
                <i data-lucide="${cat.icon}" style="width: 18px; height: 18px; color: var(--accent-primary);"></i>
                ${cat.category}
            </h3>
            ${cat.items.map(s => `
                <div class="skill-bar-container">
                    <div class="skill-info">
                        <span>${s.name}</span>
                        <span style="font-family: var(--font-mono); color: var(--text-muted);">${s.val}</span>
                    </div>
                    <div class="skill-track">
                        <div class="skill-fill" data-percentage="${s.val}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Progressive Fill Animation on Scroll
    const triggerFillAnimations = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(f => f.style.width = f.getAttribute('data-percentage'));
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(triggerFillAnimations, { threshold: 0.15 });
    skillObserver.observe(skillsGrid);
});
