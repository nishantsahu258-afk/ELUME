import React from 'react'
import Navbar from '../components/sections/Navbar'
import AnnouncementBar from '../components/sections/AnnouncementBar'
import Footer from '../components/sections/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div>
        {isHome && <AnnouncementBar />}
        <Navbar />
      
        <Outlet />
        <Footer />
    </div>
  );
}

export default MainLayout;