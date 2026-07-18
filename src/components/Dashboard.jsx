import React from 'react';
import { Package, Star, Users, Code2, GitCommit, PieChart, GitFork } from 'lucide-react';
import { useTelemetry } from '../hooks/useTelemetry';

export function Dashboard() {
  const { profile, repos, compiledAt, loading, error } = useTelemetry('Vaishnav0299');

  const totalStars = repos.reduce((acc, cr) => acc + (cr.stargazers_count || 0), 0);
  const formattedDate = compiledAt ? new Date(compiledAt * 1000).toLocaleString() : 'Syncing...';

  return (
    <section id="dashboard" class="dashboard-section">
      <div class="dashboard-container">
        <div class="section-header">
          <h2 class="section-title">📊 Live GitHub Telemetry</h2>
          <p class="section-subtitle">Real-time repository statistics synced via GitHub REST API & automated cache pipelines.</p>
        </div>

        {/* Metric Grid */}
        <div class="metrics-grid">
          <div class="metric-card" id="metric-repos">
            <div class="card-glow"></div>
            <div class="metric-header">
              <span class="metric-label">Public Repositories</span>
              <Package class="metric-icon" />
            </div>
            <div class="metric-value">{loading ? '--' : profile?.public_repos || repos.length}</div>
            <div class="metric-footer">Open source codebases</div>
          </div>

          <div class="metric-card" id="metric-stars">
            <div class="card-glow"></div>
            <div class="metric-header">
              <span class="metric-label">Total Stars</span>
              <Star class="metric-icon" />
            </div>
            <div class="metric-value">{loading ? '--' : totalStars}</div>
            <div class="metric-footer">Community bookmarks</div>
          </div>

          <div class="metric-card" id="metric-followers">
            <div class="card-glow"></div>
            <div class="metric-header">
              <span class="metric-label">Followers</span>
              <Users class="metric-icon" />
            </div>
            <div class="metric-value">{loading ? '--' : profile?.followers || 0}</div>
            <div class="metric-footer">GitHub connections</div>
          </div>

          <div class="metric-card" id="metric-gists">
            <div class="card-glow"></div>
            <div class="metric-header">
              <span class="metric-label">Public Gists</span>
              <Code2 class="metric-icon" />
            </div>
            <div class="metric-value">{loading ? '--' : profile?.public_gists || 0}</div>
            <div class="metric-footer">Snippets & utilities</div>
          </div>
        </div>

        {/* Telemetry Visualizations */}
        <div class="telemetry-visualizations">
          <div class="visualization-card">
            <h3><GitCommit /> Commit Contribution Activity</h3>
            <div class="viz-img-wrapper">
              <img src="https://github-readme-activity-graph.vercel.app/graph?username=Vaishnav0299&bg_color=00000000&color=a855f7&line=3b82f6&point=a855f7&area=true&hide_border=true&hide_title=true" alt="Commit Activity Graph" />
            </div>
          </div>
          <div class="visualization-card">
            <h3><PieChart /> Top Languages & Tech Stack</h3>
            <div class="viz-img-wrapper">
              <img src="https://github-stats-extended.vercel.app/api/top-langs/?username=Vaishnav0299&layout=compact&theme=transparent&hide_border=true&title_color=a855f7&text_color=a1a1aa&icon_color=3b82f6&hide_title=true" alt="Most Used Languages" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
