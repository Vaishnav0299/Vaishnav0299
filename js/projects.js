document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('portfolio-project-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Real, authentic public projects from GitHub user Vaishnav0299
    const curatedProjects = [
        {
            id: 1,
            category: "fullstack",
            name: "Productivity-Pro",
            type: "Full Stack",
            badgeClass: "",
            desc: "Enterprise-ready collaborative real-time workspace application integrating workspaces, kanban boards, collaborative documents, presence indicators, and administrative audit panels.",
            stack: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"],
            github: "https://github.com/Vaishnav0299/Productivity-Pro",
            live: "https://productivity-pro-bay.vercel.app"
        },
        {
            id: 2,
            category: "ai",
            name: "My Study Assistant",
            type: "AI & Automation",
            badgeClass: "ai",
            desc: "An intelligent study platform designed for note organization, automated flashcards generation, topic summaries, and interactive learning workflows.",
            stack: ["JavaScript", "React", "Node.js", "AI API", "Tailwind CSS"],
            github: "https://github.com/Vaishnav0299/my-study-assistant",
            live: "https://my-study-assistant-ten.vercel.app"
        },
        {
            id: 3,
            category: "fullstack",
            name: "Deskify",
            type: "Web Utility",
            badgeClass: "",
            desc: "A lightweight, 100% client-side web utility to instantly convert vertical mobile wallpapers into widescreen desktop backgrounds. Zero backend, zero tracking, pure JavaScript.",
            stack: ["TypeScript", "HTML5", "Canvas API", "CSS3"],
            github: "https://github.com/Vaishnav0299/Deskify",
            live: null
        },
        {
            id: 4,
            category: "fullstack",
            name: "Form-Builder",
            type: "Full Stack",
            badgeClass: "",
            desc: "Dynamic drag-and-drop form creation engine featuring customizable field validation, interactive preview controls, and JSON schema export.",
            stack: ["TypeScript", "React", "Tailwind CSS", "JSON Schema"],
            github: "https://github.com/Vaishnav0299/Form-Builder",
            live: null
        },
        {
            id: 5,
            category: "fullstack",
            name: "Mentor Backend Service",
            type: "Backend API",
            badgeClass: "",
            desc: "Scalable Node.js REST API service providing mentorship matching workflows, session scheduling, authentication, and database persistence.",
            stack: ["JavaScript", "Node.js", "Express", "REST API"],
            github: "https://github.com/Vaishnav0299/mentor-backend",
            live: null
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
                    ${proj.live ? `
                    <a href="${proj.live}" target="_blank" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem; border-radius: 6px;">
                        <i data-lucide="external-link" style="width: 14px; height: 14px;"></i> Live Demo
                    </a>
                    ` : ''}
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
