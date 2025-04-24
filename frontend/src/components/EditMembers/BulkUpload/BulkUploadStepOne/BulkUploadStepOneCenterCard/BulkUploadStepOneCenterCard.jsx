import React from 'react'
import "./BulkUploadStepOneCenterCard.css"
import { Link } from 'react-router-dom'

export default function BulkUploadStepOneCenterCard() {

  const generateTemplate = async() =>{

    window.location.href =  import.meta.env.VITE_BACKEND_ORIGIN +  `/generateTemplate`;


  }


  return (
  <div className='step-one-bulk-card'>
        

    <h1>Step 1: Download template</h1>
    <p>Download the csv file template. You will fill this in with every member you wish to add. You have the option to add an email and cell number. Email is requried for a member to be created and cell is optional</p>
    
    <div className='download-button-step-one'>
      <h1>📂</h1>
      <button onClick={()=>generateTemplate()}>⬇️ Download template</button>
    </div>
    <div className='direction-choice-row'>
      <Link to ="/edit_members" className='l1'>Previous step</Link>
      <Link to ="/bulk_upload/step_2"className='l2'>Next step</Link>
    </div>
      
  
  
  </div>
  )
}
