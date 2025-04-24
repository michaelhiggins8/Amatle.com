import React from 'react'
import "./CheckOut.css";
import CheckOutCard from '../CheckOutCard/CheckOutCard';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QtO52BfYC9JRgFHUNNY7UtbAr0RIoogaWoYWxkIVPlSlKixvPZzTNBdvaTcbL9TvEAwHSH8F9KKGa1KXbXG07gy00s5jprmBv')
export default function CheckOut() {


  return (
    <div className='check-out-page'>

      <div className='left-side'>
        <h1>$9.99/month/house</h1>
        <img src = "\images\check-out-images\community.jpg"></img>
      </div>
      <div className = 'elements'>
      <Elements stripe={stripePromise} >
        <CheckOutCard/>
      </Elements>
      </div>


    </div>
  )
}
