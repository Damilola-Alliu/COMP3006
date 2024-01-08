import react from 'react'
import './Admin.css'
import Sidebar from './components/sidebar'

const Admin = () => {
    return(
        <div className="Admin_page">
    <Sidebar />
    <div className="Admin">
        <h1>This is the Admin page!</h1>
    </div>
</div>
    )
}

export default Admin;