import React from 'react'
import "./CheckOutCard.css"
import { CardNumberElement, CardExpiryElement, CardCvcElement,useElements,useStripe } from '@stripe/react-stripe-js'
export default function CheckOutCard() {


  const stripe = useStripe();
  const elements = useElements();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
    });
  
    console.log("Stripe Response:", paymentMethod);
    console.log("Stripe Error (if any):", error);
  
    if (error) {
      alert("Stripe Error: " + error.message);
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/makePayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      credentials: "include",
    });
  
    const data = await response.json();
    console.log("Backend Response:", data);
  };
  


  return (
   
   
   <div>


    <form className='form' onSubmit={handleSubmit}>



        <CardNumberElement className='Card-Number'/>
        <div className='small-inputs'>
            <CardExpiryElement className='Card-Expiry'/>
            <CardCvcElement className='Card-Cvc'/>
        </div>
        <button type = "submit">Pay</button>

    </form>
        





    </div>
  )
}
