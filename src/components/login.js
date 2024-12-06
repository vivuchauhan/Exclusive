
import React, { useState, useEffect } from 'react';
import "./css/login.css";
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from 'firebase/auth';
import Header from './Header';
import Footer from './footer';

// Initialize Firebase 
const firebaseConfig = {
  apiKey: 'AIzaSyBFjG_bQBep5uwxHMNBfighddqvC4VRukw',
  authDomain: 'add-to-cart-331f9.firebaseapp.com',
  projectId: 'add-to-cart-331f9',
  storageBucket: 'add-to-cart-331f9.appspot.com',
  messagingSenderId: '791631730594',
  appId: '1:791631730594:web:7c2afa4da4d61e185504fb',
  measurementId: 'G-RZ6828G3QK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function LoginForm({ onLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [user, setUser] = useState(null);
  const [messageRegister, setMessageRegister] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  }; 
  
  const validateFullname = (fullName) => {
    return fullName.trim().length >= 4;
  };

  const handleRegister = async () => {

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password.trim())) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    if (!validateFullname(fullName.trim())) {
      setFullNameError('Full name must be at least 4 characters long.');
      return;
    } else {
      setFullNameError('');
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      console.log('Full Name:', fullName);
      setEmail('');
      setPassword('');
      setFullName('');
      console.log('You are registered successfully!');
      setMessageRegister('You are registered successfully!');
      setTimeout(() => {
        setMessageRegister('');
      }, 5000);
    } catch (error) {
      console.error('You Have Already Register:', error.message);
      alert('You have already register:', error.message);
    }
  };

  const handleLogin = async () => {

    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password.trim())) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    } else {
      setPasswordError('');
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      const user = userCredential.user;
      setEmail('');
      setPassword('');
      console.log('You are signed in successfully:', user);
      // alert('You are signed in successfully:', user);
    
      onLogin();
    } catch (error) {
      console.error('Your account is not registered:', error.message);
      setEmailError('Your account is not registered:', error.message);
      setPasswordError('Your account is not registered:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      console.log('Google login successful:', user);
      alert('You are login with Google  successfully:', user);
  
      onLogin(); 
    } catch (error) {
      console.error('Error during Google login:', error.message);
      alert('Error during Google login:', error.message);
    }
  };



  
  const imgUrl = "https://iglebestg.ebizontech.biz/images/login/login8464.png";

  return (
    <>
      <Header/>
        <div className='loginCont'>
            <div>
                <img src={imgUrl} alt='image-login' className='img-fluid loginImage'/>
            </div>
            <div className='ms-lg-5 loginInputs'>
                <h4 className='text-center'>{isRegistering ? 'Create an account' : 'Log in to Exclusive'}</h4>
                {isRegistering ? (
                   <>
                      { messageRegister ?  
                        <div className='my-5 ' style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", color:"white"}}>
                        <img style={{width:"100px"}} src="data:image/png;base64,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"/>                        
                        <span style={{color:"green"}}> {messageRegister}</span>
                        </div>
                      :
                          <div className='loginInputField'>
                            <div>
                              <label className='mt-3' type="text">Full Name</label><br/>
                              <input className='p-1' type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: "300px", background: "#ecf1fe", border: "1px solid #ced4da" }} />
                              {fullNameError && <p className="text-danger m-0" style={{fontSize:"12px"}}>{fullNameError}</p>}
                            </div>
                            <div>
                              <label className='mt-3' type="text">Email</label><br/>
                              <input className='p-1' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"300px", background:"#ecf1fe", border:"1px solid #ced4da"}}/>
                              {emailError && <p className="text-danger m-0" style={{fontSize:"12px"}}>{emailError}</p>}
                            </div>
                            <div>
                              <label className='mt-3' type="text">Password</label><br/>
                              <input className='p-1'  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width:"300px", background:"#ecf1fe", border:"1px solid #ced4da"}}/>
                              {passwordError && <p className="text-danger m-0" style={{fontSize:"12px"}}>{passwordError}</p>}
                            </div>
                            <button className='mt-4 p-1 bg-primary text-white' onClick={handleRegister} style={{width:"300px", border:"1px solid #ced4da"}}>Register</button>
                          </div>
                        }
                    </>
                    ) : (
                      <>
                        <p className='logindetails' style={{fontWeight:"400", fontSize:"13px"}}><span className='me-1' style={{fontWeight:"600", fontSize:"14px"}}>ID:</span> ritik@gmail.com <span className='ms-3 me-1' style={{fontWeight:"600",fontSize:"14px"}}>Password:</span> Ritik@123</p>
                        <div className='loginInputField'>
                          <div>
                            <label className='mt-4 ' type="text">Email</label><br/>
                            <input className='p-1' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width:"300px", background:"#ecf1fe", border:"1px solid #ced4da"}}/>
                            {emailError && <p className="text-danger m-0" style={{fontSize:"12px"}}>{emailError}</p>}
                          </div>
                          <div>
                            <label className='mt-3' type="text">Password</label><br/>
                            <input className='p-1'  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width:"300px", background:"#ecf1fe", border:"1px solid #ced4da"}}/>
                            {passwordError && <p className="text-danger m-0" style={{fontSize:"12px"}}>{passwordError}</p>}
                          </div>
                          <button className='mt-4 p-1 bg-primary text-white' onClick={handleLogin} style={{width:"300px", border:"1px solid #ced4da"}}>Login</button>
                          <button className='mt-4 pb-1 pt-2  text-white justify-content-center d-flex border-0' onClick={handleGoogleLogin} style={{width:"300px", border:"1px solid #ced4da"}}>
                            <img className='img-fluid' style={{width:"26px", height:"26px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII=" />
                            <h6 className='ms-2 text-dark'>Continue with Google</h6>
                          </button>
                        </div>
                      </>
                    )}
                    {isRegistering ? <p className='mt-3 text-center' style={{fontWeight:"600"}}>Already have an account?<span className='text-primary' onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}>  Login</span></p> 
                    : <p className='mt-3  text-center'  style={{fontWeight:"600"}}>Don't have an account? <span className='text-primary' onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer' }}> Register</span></p>}
            </div>
        </div>
      <Footer/>
    </>
  );
}

export default LoginForm;
