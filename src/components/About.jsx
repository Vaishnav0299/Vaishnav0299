import React from 'react';
import { User, GraduationCap, MapPin, Target, CheckCircle2, Download, Mail } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export function About() {
  return (
    <section id="about" class="about-section">
      <div class="section-header">
        <h2 class="section-title">👨‍💻 About Me</h2>
        <p class="section-subtitle">Background, education, core technical interests, and career objectives.</p>
      </div>

      <div class="about-grid">
        {/* Left Column: Avatar & Profile Overview Card */}
        <div class="about-card profile-card">
          <div class="about-avatar-wrapper">
            <img src={aboutData.avatarUrl} alt={aboutData.name} class="about-avatar-img" />
            <div class="avatar-glow-ring"></div>
          </div>
          <h3 class="about-name">{aboutData.name}</h3>
          <p class="about-role">{aboutData.title}</p>
          
          <div class="about-meta-list">
            <div class="about-meta-item">
              <GraduationCap style={{ width: 18, height: 18, color: 'var(--accent-primary)' }} />
              <span>{aboutData.education}</span>
            </div>
            <div class="about-meta-item">
              <MapPin style={{ width: 18, height: 18, color: 'var(--accent-secondary)' }} />
              <span>{aboutData.location}</span>
            </div>
            <div class="about-meta-item">
              <Mail style={{ width: 18, height: 18, color: 'var(--accent-tertiary)' }} />
              <a href={`mailto:${aboutData.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{aboutData.email}</a>
            </div>
          </div>

          <div style={{ marginTop: '1.75rem', width: '100%' }}>
            <a href={aboutData.github} target="_blank" rel="noreferrer" class="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              <Download style={{ width: 16, height: 16 }} /> Download Resume
            </a>
          </div>
        </div>

        {/* Right Column: Bio, Core Focus & What I'm Looking For */}
        <div class="about-content-column">
          <div class="about-card bio-card">
            <h3><User style={{ width: 20, height: 20, color: 'var(--accent-primary)' }} /> Short Bio</h3>
            <p>{aboutData.bio}</p>
          </div>

          <div class="about-card interests-card">
            <h3><CheckCircle2 style={{ width: 20, height: 20, color: 'var(--accent-emerald)' }} /> Core Technical Interests</h3>
            <ul class="interests-list">
              {aboutData.interests.map((item, idx) => (
                <li key={idx}>
                  <span class="interest-bullet"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div class="about-card seeking-card">
            <h3><Target style={{ width: 20, height: 20, color: 'var(--accent-secondary)' }} /> What I'm Looking For</h3>
            <p>{aboutData.seeking}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
