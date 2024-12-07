
import React, { useState } from 'react';
import "./css/login.css";
import Header from './Header';
import Footer from './footer';
import LoginForm from './login';


function Signup() {
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

  return (
    <div>
    {isLoggedIn ? (
      <>
        <Header onLogout={handleLogout}/>
        <div className='container-fluid'>
          <div className='container'>
            <div className=' row text-center my-5 pb-5'>
              <div><img src='https://static.vecteezy.com/system/resources/previews/017/639/144/original/account-has-been-registered-login-success-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg' alt='..' className='img-fluid' style={{width:"300px"}}/></div>
              <h3 className=''>You are successfully logged in</h3>
            </div>
          </div>
        </div>
        <Footer />
      </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Signup;
