
import React, { useState, useEffect } from 'react';
import "./css/cart.css";
import Header from './Header';
import Footer from "./footer";
import LoginForm from './login';

import { useSelector, useDispatch  } from 'react-redux';
import { placeOrder } from '../redux/action/action';
import placeImage from './images/checkout/placeOrderImg.jpg';

function Checkout() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [googlePayError, setGooglePayError] = useState(false)
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    streetAddress: '',
    city: '',
    state: '',
    pinCode: '',
    saveInfo: false,
  });

  const [productDetails, setProductDetails] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

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

  const cart = useSelector((state) => state.product.cart);

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
    TotalDiscount();
    setProductDetails(cart);
  }, [cart]);

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    setTotalAmount(totalAmount);
    return totalAmount;
  };

  const TotalDiscount = () => {
    if (cart.length === 0) {
      setDiscount(0);
    } else {
      setDiscount(25);
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('theme-light')
      ? 'theme-light'
      : 'theme-dark';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  };
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
    }, 10000);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.flexRadioDefault1.checked) {
      redirectToGooglePay();
    } else {
      handlePlaceOrder();
      dispatch(placeOrder(formData, totalAmount, productDetails));
    }
  };
  
  const redirectToGooglePay = () => {
      // alert("Google Pay Payment service not available right now!")
      setGooglePayError(true);
  };

  const dismissError = () => {
    setGooglePayError(false);
  };
  

  return (
    <div>
    {isLoggedIn ? (
      <>
        <Header onLogout={handleLogout} toggleTheme={toggleTheme}/>
        <div className='container-fluid p-0'>
         <form className='container needs-validation cartContainer p-0'  onSubmit={handleSubmit}>
            {orderPlaced ? <div className='container-fluid'><div className='container'><div className='row justify-content-center  text-white'><img src={placeImage} alt='' className='img-fluid' style={{width:"40%", cursor:"default"}} /></div></div></div>:
            <>
            <div className='row my-3 me-auto cartLeftCont'>
              <div className='container ps-2'><h4 className='my-2 cartPgHeading'>Billing Details</h4></div>
              <div className='d-lg-flex justify-content-center mb-lg-5 mt-3'>
                <ul className='CartContStyle ps-2 pe-lg-5'>
                <div className="row g-3 needs-validation  pe-lg-5">
                    <div className="col-md-12">
                        <label for="validationCustom01" className="form-label">Full Name</label>
                        <input type="text" className="form-control"  name="fullName" id="validationCustom01" style={{background: "rgb(230, 225, 225)"}} value={formData.fullName} onChange={handleChange}  required />
                        <div className="valid-feedback">
                        Looks good!
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustom02" className="form-label">Phone Number</label>
                        <input type="number" className="form-control"  name="phoneNumber" id="validationCustom02" value={formData.phoneNumber} onChange={handleChange} style={{background: "rgb(230, 225, 225)"}}  required/>
                        <div className="valid-feedback">
                          Looks good!
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustomUsername" className="form-label">Email Address</label>
                        <div className="input-group has-validation">
                        <input type="email" className="form-control" id="validationCustomUsername" name="emailAddress" value={formData.emailAddress} onChange={handleChange}  aria-describedby="inputGroupPrepend" style={{background: "rgb(230, 225, 225)"}} required/>
                        <div className="invalid-feedback">
                            Please enter a username.
                        </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label for="validationCustom03" className="form-label">Street Address</label>
                        <input type="text" className="form-control" id="validationCustom03" name="streetAddress" value={formData.streetAddress} onChange={handleChange} style={{background: "rgb(230, 225, 225)"}} required/>
                        <div className="invalid-feedback">
                         Please provide a valid city.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom03" className="form-label">City</label>
                        <input type="text" className="form-control" id="validationCustom03" name="city" value={formData.city} onChange={handleChange} style={{background: "rgb(230, 225, 225)"}} required/>
                        <div className="invalid-feedback">
                          Please provide a valid city.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom04" className="form-label">State</label>
                        <select className="form-select" id="validationCustom04" name="state" value={formData.state} onChange={handleChange} style={{background: "rgb(230, 225, 225)"}} required>
                            <option  disabled value="" >Choose...</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                        <div className="invalid-feedback">
                        Please select a valid state.
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label for="validationCustom05" className="form-label">Pin Code</label>
                        <input type="text" className="form-control" id="validationCustom05" name="pinCode" value={formData.pinCode} onChange={handleChange} style={{background: "rgb(230, 225, 225)"}} required/>
                        <div className="invalid-feedback">
                          Please provide a valid zip.
                        </div>
                    </div>
                    <div className="col-12 checkoutAdressRadio">
                        <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="saveInfo" value={formData.saveInfo} onChange={handleChange} id="invalidCheck" required/>
                        <label className="form-check-label ms-2" for="invalidCheck">
                           Save this information for faster check-out next time
                        </label>
                        <div className="invalid-feedback">
                            You must agree before submitting.
                        </div>
                        </div>
                    </div>
                </div>
                </ul> 
              </div>
            </div>
            <div className='row checkoutRightCont pt-lg-5 ps-4 ps-lg-0'>
                <div>
                  {cart.map((item) => (
                      <div className='my-lg-2 py-2 px-3' key={item.id}  style={{ background:"rgb(230, 225, 225)", borderRadius:"5px"}}>
                          <div  style={{ width:'100%',display:"flex"}}>
                              <img src={item.image} style={{ width: '35px', height: '35px' }} alt={item.title} />
                              <p className=' p-0 ps-3 m-0' style={{ fontSize: '12px', fontWeight: '600', width:"70%"}}>
                              {item.title}
                              </p>
                              <span className='text-success' style={{fontWeight:"600"}}>₹ {item.price}</span>
                          </div>
                      </div>
                      ))}
                </div>
                <p style={{borderBottom:"1px solid #D6D5D5", fontWeight:"600"}} className='pb-3 mt-3'>Subtotal: ₹{totalAmount.toFixed(2)}</p>
                <p style={{borderBottom:"1px solid #D6D5D5"}} className='pb-3'>Shipping: <span className='ps-2 text-success' style={{font:"14px", fontWeight:"400"}}>Free</span></p>
                <h5>Total: ₹{(totalAmount - discount).toFixed(2)} /-</h5>
                <div className="form-check mt-3 ms-3" style={{display:"flex", alignItems:"center"}} >
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  onChange={() => setFormData({ ...formData, paymentMethod: 'UPI' })} checked/>
                    <label className="form-check-label" for="flexRadioDefault1">
                     UPI
                    </label>
                    <span><img className='ms-5' style={{width:"35px"}} src="data:image/png;base64,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"/></span>
                </div>
                {googlePayError && (
                  <div className="text-danger alert-danger ms-3" role="alert" style={{height:"20px", width:"85%", fontSize:"12px", fontWeight:"600"}}>
                    Google Pay Payment service is not available right now!
                    <button type="button" className="btn-close" aria-label="Close" onClick={dismissError} style={{height:"10px"}}></button>
                  </div>
                )}
                <div className="form-check mb-3 mt-2 ms-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  onChange={() => setFormData({ ...formData, paymentMethod: 'CashOnDelivery' })}/>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Cash on delivery
                    </label>
                </div>
                <div className='my-3' style={{display:"flex", alignItems:"center"}}>
                    <input className='ps-2' type='input' placeholder='Coupon Code' style={{ fontSize:'16px', width:"60%", height:"37px", fontWeight:"400", borderRadius:"3px" }}/>
                    <button
                    className='CartRemoveBtn ms-2'
                    style={{ fontSize:'22px', width:"38%", height:"38px", fontWeight:"600" }}
                    >
                    Apply Coupon
                    </button>
                </div>
                <div className='text-center my-3'  type="submit">
                    <button className='CartRemoveBtn' style={{ fontSize:'22px', width:"100%", height:"38px", fontWeight:"600" }} >
                      Place Order
                    </button>
                </div>
            </div>
            </>
            }
          </form>
        </div>
        <Footer/>
      </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Checkout;
