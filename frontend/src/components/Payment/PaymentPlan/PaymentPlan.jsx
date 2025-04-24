import React from 'react'
import "./PaymentPlan.css"

import { useNavigate } from 'react-router-dom'
export default function PaymentPlan() {
const paymentNav = useNavigate();


  const verifyLoggedIn = async()=>{

    console.log("one");
const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/verifyLoggedIn",{


  method:'GET',
  headers: {  "Content-Type": "application/json"},
   credentials: "include"
  
  
  
    });

    console.log("two");
const data = await response.json();
console.log("three");
if (data.message==true){

  paymentNav("/payment/standard");
}else if (data.message==false){

  paymentNav("/sign_up");


}
console.log("four");



  }
  return (



    
    
    
    
<div className='payment-card'>
<div>
<h1 style={{ margin: 0, display: "inline" }}>$9.99 </h1>
<h4 style={{ margin: 0, display: "inline" }}>/House/Month</h4>
</div>
<div className='payment-card-body'>
<p>✅One admin account to upload docs to teach model </p>

<p>✅Each House gets their own account</p>

<p>✅Unlimited questions</p>

<p>✅Access to the newest, most powerful AI models</p>

<p>✅Unlimited documents and rules upload</p>
<button onClick={()=>paymentNav("/payment/standard")}>Place Your Order</button>
</div>


    
</div>




  )
}
