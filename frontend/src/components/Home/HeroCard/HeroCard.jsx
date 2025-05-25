import React from 'react'
import "./HeroCard.css"
import HeroLeftSection from './HeroLeftSection/HeroLeftSection'
import Lottie from "lottie-react"; 
import house from "../../../animations/house.json";

export default function HeroCard() {
  return (
    <div className='hero-card'>
      <div className='hero-container container'>
        <HeroLeftSection />
        <div className='hero-animation'>
          <Lottie 
            animationData={house} 
            loop 
            autoplay 
            className='hero-lottie'
          />
        </div>
      </div>
    </div>
  )
}
