document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('vertical-timeline');

    const roadmapData = [
        {
            time: "2026",
            title: "AI Engineer & Technical Builder",
            inst: "LiftUpLabs",
            desc: "Architecting microservices pipelines, setting up specialized workflow routines for startup deployment structures, and implementing predictive semantic caching configurations."
        },
        {
            time: "2025",
            title: "Open Source & AI Orchestration",
            inst: "Independent Development",
            desc: "Immersed in agentic AI frameworks, LangChain, and vector databases. Contributed to open-source repos, built custom local desktop modules, and developed end-to-end automation pipelines as part of self-directed technical growth."
        },
        {
            time: "2024",
            title: "Full-Stack Foundations & Engineering",
            inst: "Personal Growth & Self-Learning",
            desc: "Mastered full-stack development patterns (React, Node.js, databases). Created initial web interfaces, studied system design fundamentals, and built independent tools to solidify software engineering basics."
        },
        {
            time: "2023",
            title: "Algorithmic & Coding Basics",
            inst: "Academic & Personal Growth",
            desc: "Focused on core data structures, algorithms, and object-oriented design. Built small utility scripts and focused on writing clean, structured code as a foundation."
        }
    ];

    timelineContainer.innerHTML = roadmapData.map(node => `
        <div class="timeline-node">
            <span class="timeline-time">${node.time}</span>
            <div class="timeline-body">
                <h3>${node.title}</h3>
                <div class="timeline-institution">${node.inst}</div>
                <p class="timeline-desc">${node.desc}</p>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide Icons across all combined modules
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
