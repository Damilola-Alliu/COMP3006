import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


export const AdminSidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/admin",
    },

    {
        title: "Users",
        icon: <PeopleIcon />,
        link: "/users",
    },

    {
        title: "Books",
        icon: <LibraryBooksIcon />,
        link: "/allbooks",
    },
   

    {
        title: "Borrowed Books",
        icon: <LibraryBooksIcon />,
        link: "/allborrowedbooks",
    },

    
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/adminprofile",
    },
  

    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/",
        onClick: () => {
            const navigate = useNavigate();

            const handleLogout = () => {
                
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                navigate('/login');
            };

            handleLogout();
        },
    },
];
