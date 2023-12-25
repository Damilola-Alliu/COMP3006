import React from "react";
import '../Sidebar.css';
import {SidebarData} from '../components/SidebarData';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleNavigation = (link) => {
        navigate(link);
    };

    return (
        <div className="sidebar">
            <ul className="sidebarlist">
                {SidebarData.map((val, key) => {
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

export default Sidebar;
