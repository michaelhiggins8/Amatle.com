import React from 'react'
import { useState } from 'react'
import "./BulkUploadReference.css"
import SelectedPdfsDisplay from './SelectedPdfsDisplay/SelectedPdfsDisplay';
import Lottie from "lottie-react";
import myAnimation from "../../../../animations/loading.json";
import { useNavigate } from 'react-router-dom';

export default function BulkUploadReference() {
const [pdf,setPdf] = useState([]);
    
const[loading,setLoading] = useState(false);
const navigate = useNavigate();
const sendPdf = async()=>{

    const formData = new FormData();

    for (let i = 0; i<pdf.length;i++){

        formData.append("pdf",pdf[i])

    }



    setLoading(true)
    console.log("ONE")
    const response = await fetch(import.meta.env.VITE_BACKEND_ORIGIN + "/sendPdf",{

        method: "POST",
        body:formData,
         credentials: "include"


    })
        console.log("TWO")
    navigate("/documents_dashboard");
    const data = await response.json();
    console.log("THREE")
    console.log(data);
    console.log("FOUR")
    navigate("/documents_dashboard");
    console.log("FIVE")






}











  return (
    <div className='upload-docs-page'>
        

        <div className='upload-docs-center-card'>

            <h1>Upload community documents</h1>
            {loading && <Lottie animationData={myAnimation} loop={true} />}
            

            <div className='file-upload-input-wrapper'>
                <input type = 'file' multiple onChange={(event)=>setPdf( [...pdf,...Array.from(event.target.files)]) } accept='application/pdf'></input>
            
            </div>
            <div className='upload-doc-pdf-display'>
                  {pdf.map(item => <><SelectedPdfsDisplay name = {item.name} size = {item.size}/></>)}
            </div>
            <div className='bottom-section-doc-upload'>
                <button onClick={()=>sendPdf()}>Send PDF</button>
            </div>
        </div>
  
    
    
    </div>
    
  )
}
