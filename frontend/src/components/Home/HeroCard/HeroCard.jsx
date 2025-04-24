import React from 'react'
import "./HeroCard.css"
import HeroLeftSection from './HeroLeftSection/HeroLeftSection'
import Lottie from "lottie-react"; 
import house from "../../../animations/house.json";
import { Link } from "react-router-dom";

export default function HeroCard() {
  return (



    <div className='hero-card'>
        
        <HeroLeftSection/>
        <Lottie animationData={house} loop autoplay style={{ width: 500 }} />


    </div>
  )
}
