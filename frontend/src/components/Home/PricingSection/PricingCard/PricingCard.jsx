import React from 'react';
import "./PricingCard.css";
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom'

export default function PricingCard({myAnimation, price, plan, features, popular}) {
    const navigate = useNavigate();
  return (
    <div className={`pricing-card ${popular ? 'popular' : ''}`}>
      {popular && <div className="popular-badge">Most Popular</div>}
      <div className="card-header">
        <Lottie animationData={myAnimation} loop={true} className="lottie-animation"/>
        <h2>{plan}</h2>
        <div className="price-container">
          <span className="price">{price}</span>
          <span className="period">per house / month</span>
        </div>
      </div>
      
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <svg className="check-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#20b2aa" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
            {feature}
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/sign_up")} className="get-started-btn">
        Get Started
      </button>
    </div>
  )
}
