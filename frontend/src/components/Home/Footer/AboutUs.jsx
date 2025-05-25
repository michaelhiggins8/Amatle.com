import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>About HOA Management</h1>
          <p className="subtitle">Transforming HOA Management with AI-Powered Solutions</p>
        </div>

        <div className="about-us-content">
          <section className="mission-section">
            <h2>Our Mission</h2>
            <p>
              We're on a mission to revolutionize HOA management through innovative technology. 
              By combining artificial intelligence with human expertise, we're making community 
              management more efficient, transparent, and accessible for everyone.
            </p>
          </section>

          <section className="values-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Innovation</h3>
                <p>Leveraging cutting-edge AI technology to solve complex HOA challenges</p>
              </div>
              <div className="value-card">
                <h3>Transparency</h3>
                <p>Building trust through clear communication and open processes</p>
              </div>
              <div className="value-card">
                <h3>Community</h3>
                <p>Fostering stronger neighborhoods through better management tools</p>
              </div>
              <div className="value-card">
                <h3>Efficiency</h3>
                <p>Streamlining operations to save time and resources</p>
              </div>
            </div>
          </section>

          <section className="features-section">
            <h2>What Sets Us Apart</h2>
            <div className="features-list">
              <div className="feature">
                <h3>AI-Powered Solutions</h3>
                <p>Smart automation and decision support for complex HOA management tasks</p>
              </div>
              <div className="feature">
                <h3>24/7 Accessibility</h3>
                <p>Access your HOA management tools anytime, anywhere</p>
              </div>
              <div className="feature">
                <h3>Seamless Integration</h3>
                <p>Works with your existing systems and processes</p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <h2>Ready to Transform Your HOA Management?</h2>
            <p>Join the growing number of communities using our AI-powered solutions</p>
            <a href="/sign_up" className="cta-button">Get Started Today</a>
          </section>
        </div>
      </div>
    </div>
  );
} 