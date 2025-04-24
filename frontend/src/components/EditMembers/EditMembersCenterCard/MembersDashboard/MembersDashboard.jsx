import React from 'react'
import "./MembersDashboard.css"
import DashboardMainSection from './DashboardMainSection/DashboardMainSection'
export default function MembersDashboard() {
  return (
    <div className='dashboard-wrapper'>
        
        <div className='first-dashboard-column'>

        </div>
        <div className='main-dashboard-column'>
            <DashboardMainSection/>
        </div>
        <div className='last-dashboard-column'>
            <h1>
              Manage Your members with Ease
            </h1>
            <p>This page allows the community admin to efficiently manage user accounts within your organization. As an admin, you can:
                View and update member details to ensure accurate information.
                Add or remove users to maintain proper access control.
                Adjust roles and permissions to align with your peoples needs.
                Keeping your member list up to date ensures that your AI-powered assistant remains accessible to the right individuals, providing accurate answers based on your rules and regulations.
            </p>
            <h1>Admin</h1>
            <p>
              This is the "God mode" account. The admin can edit the existance of all member accounts. It is the admins role to upload communty rule documents which the AI system will use to answer questions from members.
            </p>
            <h1> Members</h1>
            <p>
              The members are the regular residents of your community. Their is typically one member account per house hold. Though member accounts communty member can ask what is and is not allowed and find out more about their coumminty in seconds. 
            </p>
        </div>


    </div>
  )
}
