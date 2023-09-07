import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
        <div className="text-center mt-3">
        <div className="list-group dashboard-menu mt-3">
            <h4>Admin Panel</h4>
                <NavLink to="/dashboard/admin/create-candidate" className="list-group-item list-group-item-action mx-1">Create Candidate</NavLink>
                <NavLink to="/dashboard/admin/candidate" className="list-group-item list-group-item-action mx-1">All Candidate</NavLink>
        </div>
    </div>
    </>
  )
}

export default AdminMenu