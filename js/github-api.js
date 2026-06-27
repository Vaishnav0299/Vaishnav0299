/**
 * GitHub Developer OS - Core Data Ingestion Layer
 * Handles asynchronous API pooling with a local storage caching fallback engine.
 */
class GitHubAPIEngine {
    constructor(username) {
        this.username = username;
        this.baseUrl = 'https://api.github.com';
        this.cacheExpiryWindow = 30 * 60 * 1000; // 30 Minute Validation Frame
    }

    // Safely reads from LocalStorage cache
    _getCache(key) {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const data = JSON.parse(cached);
        const age = Date.now() - data.timestamp;

        if (age > this.cacheExpiryWindow) {
            localStorage.removeItem(key);
            return null;
        }
        return data.payload;
    }

    // Safely writes payload records to local operational disk
    _setCache(key, payload) {
        const cacheObj = {
            timestamp: Date.now(),
            payload: payload
        };
        localStorage.setItem(key, JSON.stringify(cacheObj));
    }

    /**
     * Aggregates primary profile details across active repositories
     */
    async fetchProfileMetrics() {
        const cacheKey = `gh_profile_${this.username}`;
        const cachedData = this._getCache(cacheKey);
        if (cachedData) return cachedData;

        try {
            const response = await fetch(`${this.baseUrl}/users/${this.username}`);
            if (!response.ok) throw new Error(`HTTP network degradation code: ${response.status}`);
            
            const rawPayload = await response.json();
            this._setCache(cacheKey, rawPayload);
            return rawPayload;
        } catch (error) {
            console.error("Critical failure during profile telemetry download:", error);
            return null;
        }
    }

    /**
     * Resolves complete list of public code repositories
     */
    async fetchRepositoryTelemetry() {
        const cacheKey = `gh_repos_${this.username}`;
        const cachedData = this._getCache(cacheKey);
        if (cachedData) return cachedData;

        try {
            // Extracts top 30 active public repositories sorted via update patterns
            const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=30`);
            if (!response.ok) throw new Error(`HTTP network degradation code: ${response.status}`);
            
            const rawPayload = await response.json();
            this._setCache(cacheKey, rawPayload);
            return rawPayload;
        } catch (error) {
            console.error("Critical failure during repository index parsing:", error);
            return [];
        }
    }
}
