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
            title: "AI, Advanced Data Structures & Machine Learning",
            inst: "Independent Development",
            desc: "Focused on learning artificial intelligence, advanced data structures (ADS), and machine learning (ML) models. Immersed in agentic AI frameworks, LangChain, vector databases, and algorithmic optimization routines to build predictive telemetry systems."
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
