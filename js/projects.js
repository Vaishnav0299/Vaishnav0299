document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('portfolio-project-grid');
    
    const curatedProjects = [
        {
            name: "Enterprise ERP Management System",
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
        }
    ];

    projectGrid.innerHTML = curatedProjects.map(proj => `
        <div class="portfolio-card">
            <div>
                <span class="proj-badge ${proj.badgeClass}">${proj.type}</span>
                <h3>${proj.name}</h3>
                <p>${proj.desc}</p>
                <div class="tech-tag-wrap">
                    ${proj.stack.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="proj-links">
                <a href="${proj.github}" target="_blank"><i data-lucide="github" style="width:16px;"></i> Codebase</a>
                <a href="${proj.live}"><i data-lucide="external-link" style="width:16px;"></i> Live Build</a>
            </div>
        </div>
    `).join('');
});
