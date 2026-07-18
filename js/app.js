/**
 * Developer OS - Core Application Runner & Interactivity Layer
 */
document.addEventListener('DOMContentLoaded', () => {

    // Lucide Icons Initialization
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- 1. Toast Notification System ---
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, iconName = 'check-circle') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i data-lucide="${iconName}" style="width: 18px; height: 18px; color: var(--accent-primary);"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- 2. Copy Email Button Handler ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email') || "vaishnavgaware1@gmail.com";
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`, 'copy');
            }).catch(() => {
                showToast(`Email: ${email}`, 'mail');
            });
        });
    }

    // --- 3. Theme Engine Configurations ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const savedTheme = localStorage.getItem('os-theme') || getSystemTheme();
        
        htmlElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('os-theme', nextTheme);
            showToast(`Theme switched to ${nextTheme} mode`, nextTheme === 'dark' ? 'moon' : 'sun');
        });
    }

    // --- 4. Smooth Anchor Link Offsets ---
    const navigationActionAnchors = document.querySelectorAll('a[href^="#"]');
    
    navigationActionAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const targetID = this.getAttribute('href');
            if (targetID && targetID.startsWith('#') && targetID.length > 1) {
                event.preventDefault();
                const actualTargetNode = document.querySelector(targetID);
                
                if (actualTargetNode) {
                    const navHeaderHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    const targetPosition = actualTargetNode.offsetTop - navHeaderHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 5. Command Palette (⌘K) Modal Engine ---
    const cmdModal = document.getElementById('cmd-palette-modal');
    const cmdTrigger = document.getElementById('cmd-k-trigger');
    const cmdInput = document.getElementById('cmd-search-input');
    const cmdList = document.getElementById('cmd-options-list');
    const cmdItems = document.querySelectorAll('.cmd-item');

    function openCmdModal() {
        if (cmdModal) {
            cmdModal.classList.add('active');
            if (cmdInput) {
                cmdInput.value = '';
                filterCmdItems('');
                cmdInput.focus();
            }
        }
    }

    function closeCmdModal() {
        if (cmdModal) {
            cmdModal.classList.remove('active');
        }
    }

    function filterCmdItems(query) {
        const q = query.toLowerCase().trim();
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(q)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (cmdTrigger) {
        cmdTrigger.addEventListener('click', openCmdModal);
    }

    if (cmdModal) {
        cmdModal.addEventListener('click', (e) => {
            if (e.target === cmdModal) closeCmdModal();
        });
    }

    if (cmdInput) {
        cmdInput.addEventListener('input', (e) => {
            filterCmdItems(e.target.value);
        });
    }

    // Hotkey Listener for Ctrl+K or Cmd+K / ESC
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (cmdModal.classList.contains('active')) {
                closeCmdModal();
            } else {
                openCmdModal();
            }
        }
        if (e.key === 'Escape' && cmdModal && cmdModal.classList.contains('active')) {
            closeCmdModal();
        }
    });

    // Handle Item Selection inside Command Palette
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');
            closeCmdModal();

            if (action === 'nav' && target) {
                const targetNode = document.querySelector(target);
                if (targetNode) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                    window.scrollTo({
                        top: targetNode.offsetTop - navHeight,
                        behavior: 'smooth'
                    });
                }
            } else if (action === 'external' && target) {
                window.open(target, '_blank');
            }
        });
    });

    // --- 6. Interactive 3D Card Tilt Mouse Parallax ---
    function init3DTiltEffect() {
        const tiltCards = document.querySelectorAll('.portfolio-card, .metric-card, .skill-category-card, .visualization-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg) scale(1)`;
            });
        });
    }

    // Initialize Tilt on DOM Ready & observe dynamic insertions
    setTimeout(init3DTiltEffect, 300);
    const gridObserver = new MutationObserver(() => init3DTiltEffect());
    const mainContentNode = document.querySelector('.main-content');
    if (mainContentNode) {
        gridObserver.observe(mainContentNode, { childList: true, subtree: true });
    }
});
