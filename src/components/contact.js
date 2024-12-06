import React, { useState } from 'react';
import Header from './Header';
import Footer from "./footer"
import './css/contact.css';
import { firestore, collection, addDoc } from './fireBase';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const contactUsImg =
    'https://media.istockphoto.com/id/1365544413/video/contact-us-concept.jpg?s=640x640&k=20&c=a6o5RVk_pVTjL_YXzFQYSa76PahdhH7OLCLdv3iel_I=';

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\d{10}$/; 
    return regex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();
  
    const newErrors = {
      name: !name ? 'Please enter your name' : !/^[a-zA-Z\s]+$/.test(name) ? 'Name can only contain alphabets and spaces' : (name.length < 2 || name.length > 50) ? 'Name should be between 2 and 50 characters' : '',
      phone: !phone ? 'Please enter your phone number' : !validatePhoneNumber(phone) ? 'Please enter a valid 10-digit phone number' : '',
      email: !email ? 'Please enter your email address' : !/^\S+@\S+\.\S+$/.test(email) ? 'Please enter a valid email address' : '',
      message: !message ? 'Please enter your message' : '',
    };
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error !== '')) {
      return;
    }
  
    try {
      const contactsCollection = collection(firestore, 'contacts');
      await addDoc(contactsCollection, {
        name,
        phone,
        email,
        message,
      });
  
      console.log('Contact details submitted successfully!');
      alert('Contact details submitted successfully!');
  
      // Clear form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact details:', error);
      alert('Error submitting contact details' + error.message);
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('theme-light')
      ? 'theme-light'
      : 'theme-dark';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  };

  

  return (
      <>
        <Header toggleTheme={toggleTheme}/>
        <div className='container-fluid ps-0 pe-0'>
          <div className='container pt-5 d-lg-flex'>
            <div className='col-lg-4 col-12 pe-5'>
              <div>
                <div className='d-flex'>
                 <span style={{background:"#DB4444", borderRadius:"50%" , padding:"2px 8px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone text-white" viewBox="0 0 16 16">
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                 </span>
                 <h5 className='ms-2'>Call To Us</h5>
                </div>
                <p className='m-0 mt-3'>We are available 24/7, 7 days a week.</p>
                <p style={{fontWeight:"500"}}>Phone: +91-6111122222</p>
              </div>
              <hr/>
              <div>
                <div className='d-flex'>
                  <span style={{background:"#DB4444", borderRadius:"50%" , padding:"2px 8px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope text-white" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                    </svg>
                  </span>
                  <h5 className='ms-2'>Write To Us</h5>
                </div>
                <p className='m-0 mt-3'>Fill out our form and we will contact you within 24 hours.</p>
                <p style={{fontWeight:"500"}}>Emails: customer@exclusive.com</p>
              </div>
            </div>
            <div className='col-lg-8 col-12 mb-5 pb-5 mt-5 mt-lg-0'>
              <form className='contact-form' onSubmit={handleSubmit}>
                <div className='d-lg-flex gap-lg-5'>
                  <div className='me-auto w-100 w-lg-50'>
                    <label htmlFor='name'>Name*:</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Your Name'
                      className={errors.name ? 'error' : ''}
                      value={formData.name}
                      onChange={handleChange}
                      style={{background:"#e6e1e1"}}
                    />
                    {errors.name && <div className='error-message m-0 text-danger ps-2' style={{fontSize:"14px"}}>{errors.name}</div>}
                  </div>
                  <div className='w-100 w-lg-50 mt-2 mt-lg-0'>
                    <label htmlFor='phone'>Phone*:</label>
                    <input
                      type='text'
                      id='phone'
                      name='phone'
                      placeholder='Your Number'
                      className={errors.phone ? 'error' : ''}
                      value={formData.phone}
                      onChange={handleChange}
                      style={{background:"#e6e1e1"}}
                    />
                    {errors.phone && <div className='error-message text-danger m-0 ps-2' style={{fontSize:"14px"}}>{errors.phone}</div>}
                  </div>
                </div>
    
                <label htmlFor='email'>Email*:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Your Email'
                  className={errors.email ? 'error' : ''}
                  value={formData.email}
                  onChange={handleChange}
                  style={{background:"#e6e1e1"}}
                />
                {errors.email && <div className='error-message m-0 ps-2 text-danger' style={{fontSize:"14px"}}>{errors.email}</div>}
    
                <label htmlFor='message'>Message*:</label>
                <textarea
                  type="text"
                  id='message'
                  name='message'
                  placeholder='Type your message'
                  className={errors.message ? 'error' : ''}
                  value={formData.message}
                  onChange={handleChange}
                  style={{background:"#e6e1e1"}}
                ></textarea>
                {errors.message && <div className='error-message m-0 ps-2 text-danger' style={{fontSize:"14px"}}>{errors.message}</div>}
    
                <button type='submit' className='btn bg-danger mt-4'>Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
  );
}

export default Contact;
