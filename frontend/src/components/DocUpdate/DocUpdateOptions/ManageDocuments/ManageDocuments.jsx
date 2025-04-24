import React from 'react'
import { useState,useEffect } from 'react';
import "./ManageDocuments.css"
import ExistingDocumentDisplay from './ExistingDocumentDisplay/ExistingDocumentDisplay';
export default function ManageDocuments() {


  const [documents,setDocuments] = useState(null);



  const queryDocumentsForDash = async() =>{


    const response = await fetch( import.meta.env.VITE_BACKEND_ORIGIN + "/queryDocumentsForDash",{
  
  
    method:'GET',
    headers: {'Content-Type': 'application/json'},
    credentials:'include'
    });


    const data = await response.json();

    setDocuments(data.docs);



    
  
  
  } 






useEffect(()=>{



  queryDocumentsForDash();



},[])


  return (
    <div className='page-wrapper-manage-docs'>

          <div className='first-column-manage-docs'>

          </div>
          <div className='main-column-manage-docs'>

            <h3>edit documents</h3>
            <h1>Document dashboard</h1>
              {documents && documents.map(item => <p> <ExistingDocumentDisplay file_name = {item.file_name} uploaded_at ={item.uploaded_at} id = {item.id}/></p>)}


            
          </div>
          
          <div className='last-column-manage-docs'>
          </div>















    </div>
  )
}

