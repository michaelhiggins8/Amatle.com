import React from 'react'
import "./PricingSection.css"
import PricingCard from './PricingCard/PricingCard';
import month from "../../../animations/month.json";
import year from "../../../animations/year.json";
export default function PricingSection() {
  return (
    <div className='pricing-section'>
        <div className='pricing-headr-section'>
        <h1>Pricing</h1>
        <p>Commit to a full year and get pay only <span style={{boxShadow:'0px 0px 5px', color:'black'}}>80%</span> the price</p>
        </div>
        <div className='price-card-section'>
        <PricingCard myAnimation = {month} price = "$9.99" plan ="Month to Month"/>
        <PricingCard  myAnimation = {year}  price = "$12.49" plan ="Year commitment "/>
        </div>




    </div>
  )
}
