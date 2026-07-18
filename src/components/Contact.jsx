import React from 'react';
import { Mail, Linkedin, Github, Download, Globe, Send, Copy, Check } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export function Contact({ onShowToast }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(aboutData.email);
    setCopied(true);
    if (onShowToast) onShowToast('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" class="contact-section">
      <div class="section-header">
        <h2 class="section-title">Get In Touch</h2>
        <p class="section-subtitle">Have a project, opportunity, or question? Feel free to reach out directly.</p>
      </div>

      <div class="contact-container">
        <div class="contact-card main-contact-card">
          <div class="contact-header-content">
            <h3>Let's build something great together.</h3>
            <p>Always open to collaborating on open-source projects, discussing systems architecture, DevOps pipelines, or full-stack development.</p>
          </div>

          <div class="contact-actions-grid">
            {/* Direct Email Action Button */}
            <a href={`mailto:${aboutData.email}`} class="btn btn-primary btn-contact">
              <Mail style={{ width: 18, height: 18 }} />
              <span>Send Email</span>
            </a>

            {/* Copy Email Button */}
            <button onClick={handleCopyEmail} class="btn btn-secondary btn-contact">
              {copied ? <Check style={{ width: 18, height: 18, color: 'var(--accent-emerald)' }} /> : <Copy style={{ width: 18, height: 18 }} />}
              <span>{copied ? 'Copied!' : 'Copy Email Address'}</span>
            </button>

            {/* Download Resume Button */}
            <a href={aboutData.github} target="_blank" rel="noreferrer" class="btn btn-secondary btn-contact">
              <Download style={{ width: 18, height: 18 }} />
              <span>Download Resume</span>
            </a>
          </div>

          <div class="contact-social-bar">
            <span>Connect on socials:</span>
            <div class="social-quick-links" style={{ justifyContent: 'center' }}>
              <a href={aboutData.github} target="_blank" rel="noreferrer" title="GitHub">
                <Github style={{ width: 20, height: 20 }} />
              </a>
              <a href={aboutData.linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                <Linkedin style={{ width: 20, height: 20 }} />
              </a>
              <a href="https://Vaishnav0299.github.io/Vaishnav0299/" target="_blank" rel="noreferrer" title="Portfolio">
                <Globe style={{ width: 20, height: 20 }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
