import React from 'react';
import Header from './Header';
import './css/about.css';
import Footer from "./footer"; 
import aboutImage1 from './images/about/Side Image.png';
import aboutImage3 from './images/about/Frame 874.png';
import aboutImage4 from './images/about/Frame 875.png';
import aboutImage5 from './images/about/Frame 876.png';

import aboutSecContImg1 from './images/about/Services.png';
import aboutSecContImg2 from './images/about/Services (1).png';
import aboutSecContImg3 from './images/about/Services (2).png';
import aboutSecContImg4 from './images/about/Services (3).png';


import aboutLastContImg1 from './images/about/S1.png';
import aboutLastContImg2 from './images/about/S2.png';
import aboutLastContImg3 from './images/about/S3.png';


function About () {
  const sectionStyle = {
    marginBottom: '20px',
  };

  const imageStyle = {
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width:"100%",
    height:"auto"
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
        <div className='container-fluid'>
          <div className="container pt-lg-5 pt-3">
            <section style={sectionStyle}>
              <div className='d-lg-flex col-lg-12'>
                <div className='col-lg-7 col-12 mt-lg-5 pt-lg-4'>
                  <h2 className='ms-lg-5 mb-3'>Our Story</h2>
                  <p className='px-lg-5 pt-lg-2'>
                    Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
                    <br/><br/>
                    Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                  </p>
                </div>
                <div className='col-lg-5 col-12'>
                  <img className='AboutImg' src={aboutImage1} alt="Our Story" style={imageStyle} />
                </div>
              </div>
            </section>
            <section className='py-3'>
              <div className='aboutSecondCont col-12'>
                <div className='col-lg-3 col-12 text-center'>
                  <img src={aboutSecContImg1} className='img-fluid' alt='..' />
                  <span>10.5k</span>
                  <p>Sallers active our site</p>
                </div>
                <div className='text-bg-danger col-lg-3 col-12 text-center'>
                  <img src={aboutSecContImg2} className='img-fluid' alt='..' />
                  <span>33k</span>
                  <p>Mopnthly Produduct Sale</p>
                </div>
                <div className='col-lg-3 col-12 text-center'>
                  <img src={aboutSecContImg3} className='img-fluid' alt='..' />
                  <span>45.5k</span>
                  <p>Customer active in our site</p>
                </div>
                <div className='col-lg-3 col-12 text-center'>
                  <img src={aboutSecContImg4} className='img-fluid' alt='..' />
                  <span>25k</span>
                  <p>Anual gross sale in our site</p>
                </div>
              </div>
            </section>
            <section className='py-3' style={sectionStyle}>
              <div className='d-lg-flex gap-lg-4 col-12 justify-content-center secondlastCont'>
                <div className='text-center col-lg-4 col-12' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', paddingBottom: '20px', overflow:"hidden" }}>
                  <img className='AboutImg' src={aboutImage3} alt="Our Team"  />
                  <h4 className='mt-3'>Name 1</h4>
                  <p className='mt-0 mb-0'>Founder & Chairman</p>
                </div>
                <div className='text-center col-lg-4 col-12 mt-5 m-md-0' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', paddingBottom: '20px', overflow:"hidden" }}>
                  <img className='AboutImg' src={aboutImage4} alt="Our Team"  />
                  <h4 className='mt-3'>Name 2</h4>
                  <p className='mb-0'>Managing Director</p>
                </div>
                <div className='text-center col-lg-4 col-12 mt-5 m-md-0' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', paddingBottom: '20px', overflow:"hidden" }}>
                  <img className='AboutImg' src={aboutImage5} alt="Our Team"  />
                  <h4 className='mt-3'>Name 3</h4>
                  <p className='mt-0 mb-0'>Product Designer </p>
                </div>
              </div>
            </section>
            <section className='py-3'>
              <div className='aboutLastCont col-12'>
                <div className='text-center col-lg-4 col-12 mt-5 m-md-0'>
                  <img src={aboutLastContImg1} className='img-fluid' alt='..' />
                  <span>FREE AND FAST DELIVERY</span>
                  <p>Free delivery for all orders over  ₹350</p>
                </div>
                <div className='text-center col-lg-4 col-12 mt-5 m-md-0'>
                  <img src={aboutLastContImg2} className='img-fluid' alt='..' />
                  <span>24/7 CUSTOMER SERVICE</span>
                  <p>Friendly 24/7 customer support</p>
                </div>
                <div className='text-center col-lg-4 col-12 mt-5 m-md-0'>
                  <img src={aboutLastContImg3} className='img-fluid' alt='..' />
                  <span>MONEY BACK GUARANTEE</span>
                  <p>We reurn money within 30 days</p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer/>
      </>
  );
};

export default About;
