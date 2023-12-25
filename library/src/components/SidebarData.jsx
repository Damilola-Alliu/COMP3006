import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

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
    },
];
