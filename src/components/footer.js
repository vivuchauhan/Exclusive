import React from 'react';
import "./css/footer.css";

function Footer () {
  const footerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
    marginTop: '20px',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
  };

  const socialIconStyle = {
    width: '30px',
    height: '30px',
    margin: '0 5px',
  };

  const subscribeFormStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={footerStyle}>
      <p className='text-white'>&copy; 2024 Your E-Commerce Store</p>
      <div>
        <a href="#" style={linkStyle} className='footerLink'>
          Home
        </a>
        <a href="#" style={linkStyle} className='footerLink'>
          Products
        </a>
        <a href="#" style={linkStyle} className='footerLink'>
          Contact Us
        </a>
      </div>
      <div style={{ marginTop: '20px' }}>
        <a href="#" style={linkStyle} className='footerLink'>
          Facebook
        </a>
        <a href="#" style={linkStyle} className='footerLink'>
          Twitter
        </a>
        <a href="#" style={linkStyle} className='footerLink'>
          Instagram
        </a>
      </div>
      <div style={subscribeFormStyle}>
        <input
          type="email"
          placeholder="Subscribe to our newsletter"
          style={{ padding: '10px', marginRight: '10px', width: '200px' }}
        />
        <button style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Footer;
