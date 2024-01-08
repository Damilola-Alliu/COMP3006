import react from 'react'
import './Admin.css'
import AdminSidebar from './components/AdminSidebar'

const Admin = () => {
    return(
        <div className="Admin_page">
    <AdminSidebar />
    <div className="Admin">
        <h1>This is the Admin page!</h1>
    </div>
</div>
    )
}

export default Admin;