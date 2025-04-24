import React from 'react'
import "./BulkUploadStepTwoCenterCard.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function BulkUploadStepTwoCenterCard() {

  const navigate = useNavigate()
  
      const [file,setFile] = useState(null);
  
  
    const handleSubmit = async () => {
      
      const formData = new FormData();
      formData.append('file', file);
      
  
  
      console.log("Selected file:", file);  // Log the file to confirm it's set correctly
  if (!file) {
    console.error("No file selected");
    return;  // Exit if no file is selected
  }
      const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN +'/uploadTemplate', {
        method: 'POST',
        body: formData,
        credentials:'include'
                                                                                          });
                                                                                          console.log("3");
     
     if (!response.ok) {
      throw new Error('Failed to upload file');
    }
      const data = await response.json();
      navigate("/members_dashboard")
      console.log(data);
      
    }
   

   
  return (



<div className='bulk-upload-step-two-center-card'>
      

  <h1>Step 2: Upload completed template</h1>
  <p>Upload the completed csv template from step 1. Add many new members at a time. Each new member requires email. Cell number is optional.</p>
  <div className='upload-row'>
      <input name="file" type="file" accept='.csv, .xlsx' onChange={(e)=>setFile(e.target.files[0])}></input>
  </div>
  <div className='submit-row'>
      <button onClick={()=>handleSubmit()}>Upload</button>
  </div>
  <div className='back-forward-row-wrapper-two'>
    <Link to ="/bulk_upload/step_1" className='bulk-two-l1'>Previous step</Link>
    <Link to ="/members_dashboard" className='bulk-two-l2'>Next step</Link>
  </div>


</div>
  )
}
