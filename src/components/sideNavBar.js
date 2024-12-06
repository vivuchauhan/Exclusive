import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./css/home.css";

function SideNavBar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className='container d-flex flex-column gap-2 ms-lg-2' style={{padding:"20px 20px 0 0"}}>
      <Link to="/womansFashion" className={`SideBarListText ${isActive('/womansFashion') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Woman's Fashion </Link>
      <Link to="/mensFashion" className={`SideBarListText ${isActive('/mensFashion') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Men’s Fashion </Link>
      <Link to="/jewelery" className={`SideBarListText ${isActive('/jewelery') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Jewelry </Link>
      <Link to="/electronics" className={`SideBarListText ${isActive('/electronics') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Electronics </Link>
      <Link to="/homeLifestyle" className={`SideBarListText ${isActive('/homeLifestyle') ? 'SideBarActive' : ''}`} style={{ textDecoration:"none"}}>Home & Lifestyle </Link>
      <Link to="/sportsOutdoor" className={`SideBarListText ${isActive('/sportsOutdoor') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Sports & Outdoor </Link>
      <Link to="/babysToys" className={`SideBarListText ${isActive('/babysToys') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Baby’s & Toys </Link>
      <Link to="/groceriesPets" className={`SideBarListText ${isActive('/groceriesPets') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Groceries & Pets </Link>
      <Link to="/healthBeauty" className={`SideBarListText ${isActive('/healthBeauty') ? 'SideBarActive' : ''}`} style={{textDecoration:"none"}}>Health & Beauty</Link>
    </div>
  );
}

export default SideNavBar;
