import React from 'react'
import "./SignUp.css"
import { useState } from 'react'
import CityInput from './CityInput/CityInput'
export default function SignUp() {


  const [signUpData,setSignUpData] = useState({
    
    "city_name": "blank",
    "city_id": 0,
    "email":"blank",
    "association_name":"blank",
    "number_of_units":0,
    "password":"blank"



  })



  const handleInputChange = (column,newValue) =>{
    let holder = { ...signUpData };
    holder[column] = newValue;
    setSignUpData(holder);

  }




  const logIn = async () =>{
    const reponz = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/logIn",{
      method:'POST',
      headers: {  "Content-Type": "application/json"},
      body: JSON.stringify({email: signUpData.email,password:signUpData.password}),
      credentials: "include"
    })

    const result = await reponz.json();
    console.log("Login result:", result);
    
    // Force reload
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  }












const makeAccount = async() =>{
  const respoz = await fetch( import.meta.env.VITE_BACKEND_ORIGIN + "/makeAccount",{
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ signUpData })
  })

  if (respoz.ok) {
    await logIn();
  } else {
    const errorText = await respoz.text();
    console.error("Server responded with:", errorText);
    alert("Signup failed: " + errorText);  // Add user feedback
  }
} 


  return (
    <div className='sign_up_page'>

<div className='sign_up_card'>
<h1>Association Sign Up</h1>
<input placeholder='Association name' onChange={(e)=>handleInputChange("association_name",e.target.value)}></input>
<input placeholder='Email' onChange={(e)=>handleInputChange("email",e.target.value)}></input>
<input placeholder='Password' onChange={(e)=>handleInputChange("password",e.target.value)}></input>
<input placeholder='Number of Units' type = "number" step="1" onChange={(e)=>handleInputChange("number_of_units",e.target.value)}></input>

<CityInput setSignUpData = {setSignUpData} signUpData = {signUpData} />
<button onClick={()=>{makeAccount()} } className="join-button">Join</button>

</div>
    </div>
  )
  
}