import React from 'react'
import "./DocUpdateCenterCard.css"
import DocUpdateSubCard from './DocUpdateSubCard/DocUpdateSubCard'
export default function DocUpdateCenterCard() {
  return (
    <div className='doc-update-center-card'>
        <div className='first-doc-update-row'>
                <h1>Update rules</h1>
        </div>
        <div className='main-doc-update-row'>
           
            <DocUpdateSubCard hedr=  "Bulk upload documents" linnkTxt = "Upload documents" linnkUrl ="/upload_docs" pic = "🚀"/>

            <DocUpdateSubCard hedr=  "Documents dashboard" linnkTxt = "Manage documents" linnkUrl ="/documents_dashboard" pic = "🎛️"/>
        </div>



    </div>
  )
}
