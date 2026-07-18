document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('portfolio-project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    const curatedProjects = [
        {
            id: 1,
            category: "fullstack",
            name: "Enterprise Management & Payroll Platform",
            type: "Full Stack",
            badgeClass: "",
            desc: "A production-grade enterprise operational architecture featuring automated internal attendance verification pipelines, dynamic payload mechanics for payroll processing, and cross-modular analytics dashboards.",
            stack: ["React", "Node.js", "PostgreSQL", "Hono", "TypeScript"],
            github: "https://github.com/Vaishnav0299",
            live: "https://Vaishnav0299.github.io/Vaishnav0299/"
        },
        {
            id: 2,
            category: "ai",
            name: "Autonomous RAG Multi-Agent Assistant",
            type: "Agentic AI",
            badgeClass: "ai",
            desc: "An enterprise intelligence engine mapping localized text corpuses to relational spatial data matrices using vector embeddings for low-latency contextual semantic lookup and multi-agent reasoning.",
            stack: ["LangChain", "Ollama", "Python", "ChromaDB", "FastAPI"],
            github: "https://github.com/Vaishnav0299",
            live: "https://Vaishnav0299.github.io/Vaishnav0299/"
        },
        {
            id: 3,
            category: "ai",
            name: "AI Generative Image Orchestrator",
            type: "Artificial Intelligence",
            badgeClass: "ai",
            desc: "Designed and engineered an orchestrator that pulls text prompt tokens and maps them directly to high-density vector-generative imagery algorithms for automated asset compilation.",
            stack: ["Python", "TensorFlow", "OpenAI API", "Docker", "Flask"],
            github: "https://github.com/Vaishnav0299",
            live: "https://Vaishnav0299.github.io/Vaishnav0299/"
        },
        {
            id: 4,
            category: "datascience",
            name: "Predictive Churn Analytics Pipeline",
            type: "Data Science",
            badgeClass: "",
            desc: "Designed and implemented an end-to-end data intelligence and modeling pipeline that ingests customer telemetry, performs statistical EDA, and deploys a classification model for churn prediction.",
            stack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter"],
            github: "https://github.com/Vaishnav0299",
            live: "https://Vaishnav0299.github.io/Vaishnav0299/"
        }
    ];

    function renderProjects(filter = 'all') {
        const filtered = filter === 'all' 
            ? curatedProjects 
            : curatedProjects.filter(p => p.category === filter);

        if (filtered.length === 0) {
            projectGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No projects found in this category.</p>`;
            return;
        }

        projectGrid.innerHTML = filtered.map(proj => `
            <div class="portfolio-card" data-category="${proj.category}">
                <div>
                    <span class="proj-badge ${proj.badgeClass}">${proj.type}</span>
                    <h3>${proj.name}</h3>
                    <p>${proj.desc}</p>
                    <div class="tech-tag-wrap">
                        ${proj.stack.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="project-actions" style="margin-top: 1rem; display: flex; gap: 0.75rem;">
                    <a href="${proj.github}" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 6px;">
                        <i data-lucide="github" style="width: 14px; height: 14px;"></i> Code
                    </a>
                    <a href="${proj.live}" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 6px;">
                        <i data-lucide="external-link" style="width: 14px; height: 14px;"></i> Demo
                    </a>
                </div>
            </div>
        `).join('');

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Initialize Render
    renderProjects('all');

    // Filter Buttons Event Delegation
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });
});
