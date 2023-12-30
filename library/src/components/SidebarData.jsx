import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export const SidebarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/home",
    },
    {
        title: "Books",
        icon: <LibraryBooksIcon />,
        link: "/books",
    },
    {
        title: "Returned Books",
        icon: <AssignmentReturnedIcon />,
        link: "/returnedbooks",
    },
    {
        title: "Profile",
        icon: <PersonIcon />,
        link: "/profile",
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/",
        onClick: () => {
            const navigate = useNavigate();

            const handleLogout = () => {
                // Clear user data from localStorage and redirect to the login page
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                navigate('/login');
            };

            handleLogout();
        },
    },
];
