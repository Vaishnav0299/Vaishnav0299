document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('vertical-timeline');

    const roadmapData = [
        {
            time: "2026",
            title: "Full-Stack Developer & AI Systems Engineer",
            inst: "LiftUpLabs & Open Source",
            desc: "Architecting full-stack web applications, microservices pipelines, specialized workflow routines for startup deployment, and implementing predictive semantic caching configurations."
        },
        {
            time: "2025",
            title: "AI, Machine Learning & Advanced Data Structures",
            inst: "Independent Engineering & Projects",
            desc: "Focused on agentic AI frameworks (LangChain, Ollama), vector databases (ChromaDB), and algorithmic optimization to build intelligent assistants and predictive analytics applications."
        },
        {
            time: "2024",
            title: "Full-Stack Web Foundations",
            inst: "Undergraduate Engineering ('27)",
            desc: "Mastered core full-stack engineering principles with React, Node.js, Express, PostgreSQL, and MongoDB. Built responsive interfaces and REST APIs."
        },
        {
            time: "2023",
            title: "Programming & Data Science Foundations",
            inst: "Academic Journey",
            desc: "Started deep dive into Python, C/C++, core algorithms, data structures, and statistical data analysis."
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

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
