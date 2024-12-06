
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/womansFash.css";

import Header from './Header';
import Footer from './footer';
import LoginForm from './login';

import SideNavBar from './sideNavBar';




function HomeLifestyle() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('isLoggedIn') === 'true'
    );

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const toggleTheme = () => {
        const currentTheme = document.body.classList.contains('theme-light')
        ? 'theme-light'
        : 'theme-dark';

        document.body.classList.remove(currentTheme);
        document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
    };

    

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header onLogout={handleLogout} toggleTheme={toggleTheme}/>
          <div className='d-md-flex container-fluid p-0'>
            <div className='container p-0'>
              <div className='row caroselRow p-0 m-0'>
                <div className='col-md-3 col-12 d-none d-lg-block' style={{ borderRight: "1px solid #D6D5D5" }}>
                  <SideNavBar/>
                </div>
                <div className="col-md-8 col-12 pt-lg-4 p-0">
                  <div className='row justify-content-center'>
                  <h4 className='text-center'>Home & Lifestyle collection's</h4>
                    <img src='https://media.istockphoto.com/id/1302168946/vector/coming-soon-red-ribbon-label-banner-open-available-now-sign-or-coming-soon-tag-vector.jpg?s=612x612&w=0&k=20&c=uzI1Ztsm3NcyQCscb1kQ3goarshfkR_n2ZDhAwgYPWQ=' alt='' className='img-fluid' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default HomeLifestyle;
