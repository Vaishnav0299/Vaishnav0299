document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.getElementById('skills-matrix-grid');

    const skillsData = [
        {
            category: "Frontend Architectures",
            items: [{ name: "React / Next.js", val: "95%" }, { name: "Tailwind CSS", val: "90%" }, { name: "HTML5 / CSS3", val: "95%" }]
        },
        {
            category: "Backend & Systems",
            items: [{ name: "Node.js / Express", val: "90%" }, { name: "MongoDB / Postgres", val: "85%" }, { name: "REST / GraphQL APIs", val: "90%" }]
        },
        {
            category: "AI & Automation Infrastructure",
            items: [{ name: "Python / TensorFlow", val: "92%" }, { name: "LangChain / Ollama", val: "88%" }, { name: "Docker / CI/CD Actions", val: "80%" }]
        },
        {
            category: "Data Science & Analytics",
            items: [{ name: "Pandas / NumPy", val: "90%" }, { name: "Scikit-Learn / ML", val: "88%" }, { name: "Data Visualization & Jupyter", val: "85%" }]
        }
    ];

    skillsGrid.innerHTML = skillsData.map(cat => `
        <div class="skill-category-card">
            <h3>${cat.category}</h3>
            ${cat.items.map(s => `
                <div class="skill-bar-container">
                    <div class="skill-info">
                        <span>${s.name}</span>
                        <span>${s.val}</span>
                    </div>
                    <div class="skill-track">
                        <div class="skill-fill" data-percentage="${s.val}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `).join('');

    // Progressive Intersection Animation Controller
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
