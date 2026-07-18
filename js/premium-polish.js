/**
 * GitHub Developer OS - Interactive Terminal Engine & UI Polish
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Interactive Terminal Shell Engine ---
    const terminalBody = document.getElementById('interactive-terminal-logs');
    const terminalInput = document.getElementById('terminal-input');
    const clearBtn = document.getElementById('term-clear-btn');
    const quickChips = document.querySelectorAll('.term-chip');

    const commandRegistry = {
        'help': () => [
            "Available Commands:",
            "  <span class='cmd-highlight'>skills</span>    - List core technical stack & frameworks",
            "  <span class='cmd-highlight'>projects</span>  - Display featured production repositories",
            "  <span class='cmd-highlight'>contact</span>   - Show email and social profiles",
            "  <span class='cmd-highlight'>bio</span>       - Brief developer summary",
            "  <span class='cmd-highlight'>github</span>    - Open GitHub profile",
            "  <span class='cmd-highlight'>linkedin</span>  - Open LinkedIn profile",
            "  <span class='cmd-highlight'>theme</span>     - Toggle dark/light theme",
            "  <span class='cmd-highlight'>date</span>      - Print current UTC time",
            "  <span class='cmd-highlight'>clear</span>     - Clear terminal logs"
        ],
        'skills': () => [
            "⚡ Technical Expertise Stack:",
            "  • Frontend : React, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3",
            "  • Backend  : Node.js, Express, Hono, Python, FastAPI, REST/GraphQL",
            "  • DB & Cloud: PostgreSQL, MongoDB, ChromaDB, Redis, Docker, AWS",
            "  • AI & ML  : LangChain, Ollama, TensorFlow, Scikit-Learn, Pandas"
        ],
        'projects': () => [
            "🚀 Featured Public Repositories:",
            "  1. Productivity-Pro [Full-Stack Workspace App]",
            "  2. My Study Assistant [AI Study Platform]",
            "  3. Deskify [Web Utility]",
            "  4. Form-Builder [Drag & Drop Form Engine]",
            "  5. Mentor Backend [REST API Service]"
        ],
        'contact': () => [
            "📫 Contact Channels:",
            "  • Email    : vaishnavgaware1@gmail.com",
            "  • GitHub   : https://github.com/Vaishnav0299",
            "  • LinkedIn : https://linkedin.com/in/vaishnav-gaware-107799315/",
            "  • Portfolio: https://Vaishnav0299.github.io/Vaishnav0299/"
        ],
        'bio': () => [
            "👨‍💻 Developer Bio:",
            "  Vaishnav Gaware is an AI & Data Science Undergraduate ('27)",
            "  building enterprise full-stack applications and multi-agent AI tools."
        ],
        'github': () => {
            window.open("https://github.com/Vaishnav0299", "_blank");
            return ["Opening GitHub profile in new tab..."];
        },
        'linkedin': () => {
            window.open("https://www.linkedin.com/in/vaishnav-gaware-107799315/", "_blank");
            return ["Opening LinkedIn profile in new tab..."];
        },
        'theme': () => {
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.click();
            return ["Theme toggled successfully."];
        },
        'date': () => [
            `Current Time: ${new Date().toUTCString()}`
        ],
        'whoami': () => [
            "vaishnav@dev-os (Guest User)"
        ],
        'sudo': () => [
            "Permission denied: User is not in the sudoers file. This incident will be reported."
        ]
    };

    function appendOutputLines(lines, commandText = "") {
        if (commandText) {
            const cmdLine = document.createElement('div');
            cmdLine.className = 'log-line';
            cmdLine.innerHTML = `<span style="color: var(--accent-emerald); font-weight:700;">vaishnav@dev-os:~$</span> <span style="color: var(--text-primary);">${commandText}</span>`;
            terminalBody.appendChild(cmdLine);
        }

        lines.forEach(line => {
            const l = document.createElement('div');
            l.className = 'log-line';
            l.innerHTML = line;
            terminalBody.appendChild(l);
        });

        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function processCommand(rawInput) {
        const cmd = rawInput.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear') {
            terminalBody.innerHTML = `<div class="log-line text-accent">> Terminal session cleared. Type 'help' for commands.</div>`;
            return;
        }

        if (commandRegistry[cmd]) {
            const output = commandRegistry[cmd]();
            appendOutputLines(output, cmd);
        } else {
            appendOutputLines([
                `<span style="color: #ef4444;">zsh: command not found: ${cmd}</span>. Type <span class='cmd-highlight'>'help'</span> for available commands.`
            ], cmd);
        }
    }

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const text = terminalInput.value;
                terminalInput.value = '';
                processCommand(text);
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            terminalBody.innerHTML = `<div class="log-line text-accent">> Terminal cleared.</div>`;
        });
    }

    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            if (cmd) processCommand(cmd);
        });
    });

    // --- Active Section Scroll Observer ---
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
        threshold: 0.25,
        rootMargin: "-10% 0px -40% 0px"
    });

    operationalSections.forEach(section => sectionLinkObserver.observe(section));
});
