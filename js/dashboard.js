/**
 * Developer OS - Core Controller Interface
 * Maps out ingested structured pipelines right into standard interface components.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // Replace with your GitHub username profile identifier
    const GITHUB_TARGET_ID = "vaishnavgaware"; 
    
    const engine = new GitHubAPIEngine(GITHUB_TARGET_ID);
    
    // Core Layout Hook Elements
    const repoContainer = document.getElementById('repo-showcase-container');
    const syncLabel = document.getElementById('sync-time');
    
    // UI Metric Dynamic Nodes
    const repoCountNode = document.querySelector('#metric-repos .metric-value');
    const starCountNode = document.querySelector('#metric-stars .metric-value');
    const followerCountNode = document.querySelector('#metric-followers .metric-value');
    const gistCountNode = document.querySelector('#metric-gists .metric-value');

    // Trigger explicit async processing threads
    const [profileData, repoData] = await Promise.all([
        engine.fetchProfileMetrics(),
        engine.fetchRepositoryTelemetry()
    ]);

    // Bind Ingested User Profile Telemetry Elements
    if (profileData) {
        repoCountNode.textContent = profileData.public_repos || 0;
        followerCountNode.textContent = profileData.followers || 0;
        gistCountNode.textContent = profileData.public_gists || 0;
        syncLabel.textContent = "Live Stream Synced Status Verified";
    } else {
        syncLabel.textContent = "Offline Fallback Cache Initialized";
    }

    // Process and Calculate Aggregated Star Metrics
    if (repoData && repoData.length > 0) {
        const totalCalculatedStars = repoData.reduce((acc, currentRepo) => {
            return acc + (currentRepo.stargazers_count || 0);
        }, 0);
        
        starCountNode.textContent = totalCalculatedStars;

        // Strip skeletons out and populate workspace cards
        repoContainer.innerHTML = '';

        // Slice array down to top 6 prominent codebases
        const displaySelection = repoData.slice(0, 6);

        displaySelection.forEach(repo => {
            const projectCardMarkup = `
                <div class="repo-card">
                    <div>
                        <a href="${repo.html_url}" target="_blank" class="repo-name">
                            ${repo.name}
                        </a>
                        <p class="repo-description">
                            ${repo.description || "System engineering parameters specified. Code module development remains open source."}
                        </p>
                    </div>
                    <div class="repo-meta-footer">
                        <div class="repo-lang">
                            <span class="lang-dot"></span>
                            <span>${repo.language || "Compiled"}</span>
                        </div>
                        <div class="repo-stats-aside">
                            <span><i data-lucide="star" style="width:12px;height:12px;"></i> ${repo.stargazers_count}</span>
                            <span><i data-lucide="git-fork" style="width:12px;height:12px;"></i> ${repo.forks_count}</span>
                        </div>
                    </div>
                </div>
            `;
            repoContainer.insertAdjacentHTML('beforeend', projectCardMarkup);
        });

        // Force rebuild Lucide instance node allocations to catch new dynamic elements
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else {
        repoContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">Failed to pull real-time repositories. Check network configuration connectivity parameters.</p>`;
    }
});
