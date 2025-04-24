import React from 'react'
import "./HeroLeftSection.css"
import { useNavigate } from "react-router-dom";

export default function HeroLeftSection() {
    const navigate = useNavigate();

  return (
    <div className='hero-left-section'>
        <h1> An A.I. agent to help your members understand your rules</h1>
        <p>Amatle makes HOA rules easy for everyone. Simply create an admin account, upload your documents, and let members ask questions anytime. Never get a 2 A.M. 'Can I paint my house purple?' message again! </p>
        <button onClick={() => navigate("/sign_up")}>Get started</button>

    </div>
  )
}
