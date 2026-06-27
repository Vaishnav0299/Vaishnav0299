/**
 * GitHub Developer OS - Data Ingestion Layer (Hybrid Version)
 * Prioritizes low-latency file caches compiled via GitHub Actions pipelines.
 */
class GitHubAPIEngine {
    constructor(username) {
        this.username = username;
        this.baseUrl = 'https://api.github.com';
        this.localCachePath = 'data/telemetry.json';
    }

    /**
     * Resolves complete structural metrics from the localized file tree or API fallback
     */
    async getTelemetryPayload() {
        try {
            // Attempt to pull the pre-compiled automation pipeline payload
            const response = await fetch(this.localCachePath);
            if (!response.ok) throw new Error("Local pipeline cache asset unavailable.");
            
            const compiledPayload = await response.json();
            console.log("Telemetry Engine: Secure local cache loaded.");
            return compiledPayload;
        } catch (error) {
            console.warn("Telemetry Engine: Local cache missed. Falling back to live API pooling...", error);
            return await this._fetchLiveAPIBackup();
        }
    }

    /**
     * Runtime API backup pool that activates if local cache files are missing
     */
    async _fetchLiveAPIBackup() {
        try {
            const [profileRes, reposRes] = await Promise.all([
                fetch(`${this.baseUrl}/users/${this.username}`),
                fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=30`)
            ]);

            if (!profileRes.ok || !reposRes.ok) throw new Error("Network pool degradation.");

            const profile = await profileRes.json();
            const repos = await reposRes.json();

            return {
                profile: profile,
                repos: repos,
                compiledAt: Math.floor(Date.now() / 1000)
            };
        } catch (err) {
            console.error("Telemetry Engine Critical System Fault:", err);
            return null;
        }
    }
}
