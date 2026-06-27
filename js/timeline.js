document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.getElementById('vertical-timeline');

    const roadmapData = [
        {
            time: "2026 - Present",
            title: "AI Engineer & Technical Builder",
            inst: "LiftUpLabs",
            desc: "Architecting microservices pipelines, setting up specialized workflow routines for startup deployment structures, and implementing predictive semantic caching configurations."
        },
        {
            time: "2025",
            title: "AI Engineer & Technical Builder",
            inst: "Autonomous Operations & Open Source Ecosystems",
            desc: "Designed specialized workflow routines and microservices pipelines for startup deployment structures."
        },
        {
            time: "2024",
            title: "Full-Stack System Developer",
            inst: "LiftUpLabs",
            desc: "Designed and engineered corporate internal resource systems, integrating secure attendance validation parameters and dynamic analytics processing suites."
        },
        {
            time: "2023",
            title: "Core Programming Foundations",
            inst: "Academic Track Integration",
            desc: "Mastering core algorithmic computational systems, database optimization routines, and engineering standard design patterns."
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
