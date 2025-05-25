import React from 'react'
import "./PricingSection.css"
import PricingCard from './PricingCard/PricingCard';
import month from "../../../animations/month.json";
import year from "../../../animations/year.json";

export default function PricingSection() {
  return (
    <div className='pricing-section'>
      <div className='pricing-header-section'>
        <span className='pricing-eyebrow'>Pricing Plans</span>
        <h1>Choose the right plan for your HOA</h1>
        <p>Save 20% with annual commitment and unlock all features</p>
      </div>
      <div className='price-card-section'>
        <PricingCard 
          myAnimation={month} 
          price="$6.25" 
          plan="Monthly Plan"
          features={[
            "24/7 Access",
            "Unlimited documents",
            "Priority support",
            "Regular updates"
          ]}
        />
        <PricingCard 
          myAnimation={year} 
          price="$4.99" 
          plan="Annual Plan"
          popular={true}
          features={[
            "24/7 Access",
            "Unlimited documents",
            "Priority support",
            "Regular updates",
            "20% savings"
          ]}
        />
      </div>
    </div>
  )
}
