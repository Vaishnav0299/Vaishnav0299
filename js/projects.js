document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('portfolio-project-grid');
    
    const curatedProjects = [
        {
            name: "Enterprise Management System",
            type: "Full Stack",
            badgeClass: "",
            desc: "A production-grade enterprise operational architecture featuring automated internal attendance verification pipelines, dynamic payload mechanics for payroll processing, and cross-modular analytics pipelines.",
            stack: ["Node.js", "React", "PostgreSQL", "Hono"],
            github: "https://github.com/Vaishnav0299",
            live: "#"
        },
        {
            name: "AI Generative Wallpaper Engine",
            type: "Artificial Intelligence",
            badgeClass: "ai",
            desc: "Designed and engineered an orchestrator that pulls text prompt tokens and maps them directly to high-density vector-generative imagery algorithms for asset compilation.",
            stack: ["Python", "TensorFlow", "OpenAI API", "Docker"],
            github: "https://github.com/Vaishnav0299",
            live: "#"
        },
        {
            name: "Autonomous RAG Assistant Pipeline",
            type: "Agentic AI",
            badgeClass: "ai",
            desc: "An enterprise intelligence tool mapping localized text corpuses to relational spatial data matrices using vector embeddings for low-latency contextual semantic lookup.",
            stack: ["LangChain", "Ollama", "Python", "ChromaDB"],
            github: "https://github.com/Vaishnav0299",
            live: "#"
        },
        {
            name: "Predictive Churn Analytics Pipeline",
            type: "Data Science",
            badgeClass: "ai",
            desc: "Designed and implemented an end-to-end data intelligence and modeling pipeline that ingests customer telemetry, performs statistical EDA, and deploys a classification model for churn prediction.",
            stack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter"],
            github: "https://github.com/Vaishnav0299",
            live: "#"
        }
    ];

    projectGrid.innerHTML = curatedProjects.map(proj => `
        <div class="portfolio-card">
            <div>
                <span class="proj-badge ${proj.badgeClass}">${proj.type}</span>
                <h3>${proj.name}</h3>
                <p>${proj.desc}</p>
                <div class="tech-tag-wrap" style="margin-bottom: 1.25rem;">
                    ${proj.stack.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="project-actions" style="margin-top: 0.5rem; display: flex; gap: 0.75rem;">
                <a href="${proj.github}" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; font-size: 0.85rem; border-radius: 6px; text-decoration: none;">
                    <i data-lucide="github" style="width: 14px; height: 14px;"></i> GitHub
                </a>
            </div>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

