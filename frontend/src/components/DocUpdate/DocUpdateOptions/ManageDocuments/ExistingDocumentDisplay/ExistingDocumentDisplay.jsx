import React from 'react'
import "./ExistingDocumentDisplay.css"
import DeleteExistingDocument from './DeleteExistingDocument/DeleteExistingDocument';
export default function ExistingDocumentDisplay({file_name,uploaded_at,id}) {


  const date = new Date(uploaded_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className='existing-document-display'>
      


     <h2>{file_name}</h2>
     <h4>{date}</h4>
     
     <DeleteExistingDocument id = {id}/>



    </div>
  )
}
