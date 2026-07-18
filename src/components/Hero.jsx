import React from 'react';
import { ArrowRight, Github, Linkedin, Globe, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" class="hero-section">
      <div class="hero-container">
        <div class="badge-container">
          <span class="status-badge">
            <span class="pulse-dot"></span> Available for Opportunities
          </span>
        </div>
        
        <h1 class="hero-title">
          Hi, I'm <span class="text-gradient">Vaishnav Gaware</span>
        </h1>
        <p class="hero-subtitle">
          Full-Stack Developer and AI & Data Science Student
        </p>
        <p class="hero-description">
          Building high-performance web applications, scalable architectural backends, and data science pipelines. Focused on clean code, modern engineering, and intuitive user experiences.
        </p>

        <div class="hero-cta-group">
          <a href="#projects" class="btn btn-primary">
            <span>Explore Projects</span>
            <ArrowRight style={{ width: 18, height: 18 }} />
          </a>
          <a href="#dashboard" class="btn btn-secondary">
            <span>Live Dashboard</span>
          </a>
        </div>

        <div class="social-quick-links">
          <a href="https://github.com/Vaishnav0299" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub Profile">
            <Github style={{ width: 20, height: 20 }} />
          </a>
          <a href="https://www.linkedin.com/in/vaishnav-gaware-107799315/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn Profile">
            <Linkedin style={{ width: 20, height: 20 }} />
          </a>
          <a href="https://Vaishnav0299.github.io/Vaishnav0299/" target="_blank" rel="noreferrer" aria-label="Portfolio" title="Live Website">
            <Globe style={{ width: 20, height: 20 }} />
          </a>
          <a href="mailto:vaishnavgaware1@gmail.com" aria-label="Mail" title="Send Email">
            <Mail style={{ width: 20, height: 20 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
