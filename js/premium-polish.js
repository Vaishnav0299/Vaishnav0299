/**
 * GitHub Developer OS - Premium Polish Controller
 * Handles live event logs simulations and scroll-state section mappings.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Part 1: Automated Live Activity Log Terminal Simulator ---
    const terminalBody = document.getElementById('interactive-terminal-logs');
    
    const loggingSequences = [
        "🔄 sync task dispatched: fetching github-actions static dataset...",
        "💾 repository mapping compiled: local cached dependencies locked.",
        "📊 calculating global productivity vector... matrix parameters standard.",
        "🤖 processing artificial intelligence modules... agentic models active.",
        "⚡ checking thread runtime stability... 0 compilation warning anomalies discovered.",
        "🟢 dev-os terminal online. telemetry pipeline monitoring continues."
    ];

    let chronologicalIndex = 0;

    function streamSystemLog() {
        if (chronologicalIndex < loggingSequences.length) {
            const timestamp = new Date().toLocaleTimeString();
            const logBlockMarkup = `
                <div class="log-line">
                    <span style="color: var(--text-muted); font-size: 0.8rem;">[${timestamp}]</span> 
                    <span>${loggingSequences[chronologicalIndex]}</span>
                </div>
            `;
            terminalBody.insertAdjacentHTML('beforeend', logBlockMarkup);
            
            // Auto-scroll the terminal view to the latest entry
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            chronologicalIndex++;
            setTimeout(streamSystemLog, Math.random() * 2000 + 1000); // Fluid delivery interval
        }
    }

    // Fire up terminal stream simulation after a brief entrance pause
    setTimeout(streamSystemLog, 1500);

    // --- Part 2: High-Performance Active Section Nav Track Mapping ---
    const operationalSections = document.querySelectorAll('section[id]');
    const systemNavigationLinks = document.querySelectorAll('.nav-links a');

    const updateActiveNavTabState = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSectionID = entry.target.getAttribute('id');
                
                systemNavigationLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeSectionID}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const sectionLinkObserver = new IntersectionObserver(updateActiveNavTabState, {
        root: null,
        threshold: 0.35, // Trigger state swap when 35% of the section enters the frame
        rootMargin: "-10% 0px -40% 0px"
    });

    operationalSections.forEach(section => sectionLinkObserver.observe(section));
});
