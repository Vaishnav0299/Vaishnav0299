document.addEventListener('DOMContentLoaded', async () => {
    const GITHUB_TARGET_ID = "Vaishnav0299"; 
    
    const engine = new GitHubAPIEngine(GITHUB_TARGET_ID);
    
    const repoContainer = document.getElementById('repo-showcase-container');
    const syncLabel = document.getElementById('sync-time');
    
    const repoCountNode = document.querySelector('#metric-repos .metric-value');
    const starCountNode = document.querySelector('#metric-stars .metric-value');
    const followerCountNode = document.querySelector('#metric-followers .metric-value');
    const gistCountNode = document.querySelector('#metric-gists .metric-value');

    // Request ingestion data from our hybrid model provider
    const dataset = await engine.getTelemetryPayload();

    if (dataset && dataset.profile && dataset.repos) {
        const profile = dataset.profile;
        const repos = dataset.repos;

        // Map user profile elements
        repoCountNode.textContent = profile.public_repos || 0;
        followerCountNode.textContent = profile.followers || 0;
        gistCountNode.textContent = profile.public_gists || 0;

        // Calculate aggregate community stars
        const totalCalculatedStars = repos.reduce((acc, cr) => acc + (cr.stargazers_count || 0), 0);
        starCountNode.textContent = totalCalculatedStars;

        // Process Synchronization Date Label
        const formattedDate = new Date(dataset.compiledAt * 1000).toLocaleString();
        syncLabel.textContent = `Sync: ${formattedDate}`;

        // Clear layout skeletons and build repo cards
        repoContainer.innerHTML = '';
        const eliteSelection = repos.filter(r => r.name !== 'Vaishnav0299').slice(0, 6);

        eliteSelection.forEach(repo => {
            const projectCardMarkup = `
                <div class="repo-card">
                    <div>
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                        <p class="repo-description">${repo.description || "Open source repository developed by Vaishnav Gaware."}</p>
                    </div>
                    <div class="repo-meta-footer">
                        <div class="repo-lang">
                            <span class="lang-dot"></span>
                            <span>${repo.language || "Code"}</span>
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

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } else {
        syncLabel.textContent = "Pipeline Error Detected";
        repoContainer.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">Failed to load repositories. Please try again later.</p>`;
    }
});
