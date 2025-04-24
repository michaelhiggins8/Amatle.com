import React from 'react'
import PaymentPlan from './PaymentPlan/PaymentPlan';
import "./Payment.css";
export default function Payment() {
  return (
    <div className='payment-page'>
        <div className='title-section'>
            <h1>Help your Residents</h1>
            <h1><span style={{ textDecoration: "underline" }}>Understand</span> your Community</h1>
            <p>Never have an "accidental" violation again, state of the the art AI will help members understand community rules</p>
        </div>
        
        <PaymentPlan/>

    </div>
  )
}
