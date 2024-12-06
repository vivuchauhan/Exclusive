
import React, { useState } from 'react';
import "./css/cart.css";
import Header from './Header';
import Footer from "./footer";
import LoginForm from './login';

import { useSelector } from 'react-redux';

const CancelOrdersStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  fontSize: '16px',
  fontWeight: '600',
  color: 'black',
  maxWidth: '100%',
  textOverflow: 'ellipsis', 
  color:"#7f838a",
};


function Cancellation() {

  const cancelledOrders = useSelector((state) => state.product.cancelledOrders);
  console.log("cancelled order ", cancelledOrders);
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
  const truncateTitle = (title) => {
    const maxLength = 20;
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Header onLogout={handleLogout} toggleTheme={toggleTheme} />
          <div className='container-fluid'>
            <div className='container p-0'>
              <h3 className='mt-3 ps-2'>Cancelled Orders</h3>
              {cancelledOrders.length === 0 ? (
                <div className='text-center text-white'>
                  <img src='https://static.vecteezy.com/system/resources/thumbnails/014/814/239/small/no-order-a-flat-rounded-icon-is-up-for-premium-use-vector.jpg' alt='..' className='img-fluid' />
                </div>
              ) : (
                <div className='row'>
                  {cancelledOrders.map((order, orderIndex) => (
                    <div className='my-4' style={{ background: "#ffcccc", boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.3)", borderRadius:"10px" }}>
                      <div className='col-12 d-lg-flex  pt-2 ps-lg-3' key={orderIndex}>
                        <div className='col-lg-5 col-12'>
                          <div className='d-flex align-items-center'><h4 className='ps-2 mt-2' style={{border:"2px solid black", borderRadius:"50%", width:"30px", height:"30px"}}>{orderIndex + 1}</h4> <h5 className='ms-4 text-danger'>Order cancelled</h5></div>
                          <div className='mt-lg-3'>
                            <div className=''>
                              <p><i style={{ color:"#7f838a",fontWeight: "600" }}>Name:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.fullName}</span></p>
                              <p><i style={{ color:"#7f838a",fontWeight: "600" }}>Email:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.emailAddress}</span></p>
                              <p><i style={{ color:"#7f838a",fontWeight: "600" }}>Phone:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.phoneNumber}</span></p>
                            </div>
                            <div><i style={{ color:"#7f838a",fontWeight: "600" }}>Street Address:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.streetAddress}</span></div>
                            <div className='d-flex gap-4 mt-3'>
                              <p><i style={{ color:"#7f838a",fontWeight: "600" }}>City:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.city}</span></p>
                              <p><i style={{ color:"#7f838a",fontWeight: "600" }}>State:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.state}</span></p>
                              <p><i style={{ color:"#7f838a", fontWeight: "600" }}>Pin Code:</i> <span style={{color:"#7f838a", fontWeight:"600"}}>{order.formData.pinCode}</span></p>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-7 col-12 mt-lg-5'>
                          {order.productDetails.map((product, prodIndex) => (
                            <div className='gap-4 my-3' key={prodIndex} style={{ fontWeight: "600", display: "flex", alignItems: "center" }}>
                              <div className='OrderPgTitle' ><img src={product.image} alt='..' className='img-fluid' style={{ width: "25px" }} /><i className='ms-2'  style={CancelOrdersStyle}>{truncateTitle(product.title)}</i></div>
                              <p className='' style={{ fontWeight: "600",color:"#7f838a" }}>₹{product.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <h5 className='mb-3 ps-lg-3 bg-' style={{color:"#7f838a", fontWeight:"600"}}><span>Total Payable Amount:</span> ₹{order.totalPrice.toFixed(2)} /-</h5>
                    </div>
                  ))}
                </div>
              )}
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

export default Cancellation;
