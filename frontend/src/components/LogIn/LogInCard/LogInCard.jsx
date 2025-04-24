import React from 'react'
import "./LogInCard.css"
import { useState } from 'react'
export default function LogInCard() {
 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
 
  const logIn = async () =>{





  const reponz = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/logIn",{


method:'POST',
headers: {  "Content-Type": "application/json"},
body: JSON.stringify({email,password}),
credentials: "include"



  })

  const result = await reponz.json();
  window.location.reload();
  console.log(result);


 }
 
 
  return (
    <div className='login-card'>
        
        <h1>Sign in to Amatle</h1>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='email'></input>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder='password'></input>
        <button onClick={()=>logIn()}>Log In</button>

    </div>
  )
}
