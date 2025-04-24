import React from 'react'
import "./EditMembersCenterCard.css"
import EditMembersChildCard from './EditMembersChildCard/EditMembersChildCard'
export default function EditMembersCenterCard() {
  return (


    <div className='edit-members-parent-card'>
        <div className='first-row'>
          <h1>Edit members</h1>
        </div>
        <div className='main-row'>
            <EditMembersChildCard hedr="Upload your members" lnk = "/bulk_upload/step_1"url = "./images/edit-member-images/corks.jpg" btnTxt = "Bulk upload"/>
            <EditMembersChildCard hedr="Edit your members individually" lnk = "/members_dashboard"url = "./images/edit-member-images/paper.jpg" btnTxt = "Dashboard"/>
        </div>



    </div>


  )
}
