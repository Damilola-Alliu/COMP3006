import React from "react";
import '../Sidebar.css';
import {AdminSidebarData} from '../components/AdminSidebarData';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
    };

    return (
        <div className="sidebar">
            <ul className="sidebarlist">
                {AdminSidebarData.map((val, key) => {
                    return (
                        <li key={key} 
                        className="row"
                        onClick={() => handleNavigation(val.link)}>
                            <div>{val.icon}</div>
                            <div>{val.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AdminSidebar;