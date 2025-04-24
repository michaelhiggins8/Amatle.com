import React from 'react';
import "./PricingCard.css";
import Lottie from "lottie-react";
import { useNavigate } from 'react-router-dom'

export default function PricingCard({myAnimation,price,plan}) {
    const navigate = useNavigate();
  return (
    <div className='pricing-card'>
        


        <Lottie animationData={myAnimation} loop={true} className="lottie-animation"/>
        <h1>{plan}</h1>
        <p><span style={{boxShadow:'0px 0px 5px', color:'black'}}>{price}</span> per house per month</p>
        <button onClick={()=>navigate("/sign_up")}>Get started</button>

    </div>
  )
}
