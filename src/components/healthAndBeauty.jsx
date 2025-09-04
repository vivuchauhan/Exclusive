
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./css/womansFash.css";

import SideNavBar from './sideNavBar';




function HealthBeauty() {

  return (
      <>
        <div className='d-md-flex container-fluid p-0'>
          <div className='container p-0'>
            <div className='row caroselRow p-0 m-0'>
              <div className='col-md-3 col-12 d-none d-lg-block' style={{ borderRight: "1px solid #D6D5D5" }}>
                <SideNavBar/>
              </div>
              <div className="col-md-9 col-12 pt-lg-4 p-0">
                <div className='row justify-content-center'>
                <h4 className='text-center'>Health & Beauty collection's</h4>
                  <img src='https://media.istockphoto.com/id/1302168946/vector/coming-soon-red-ribbon-label-banner-open-available-now-sign-or-coming-soon-tag-vector.jpg?s=612x612&w=0&k=20&c=uzI1Ztsm3NcyQCscb1kQ3goarshfkR_n2ZDhAwgYPWQ=' alt='' className='img-fluid' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default HealthBeauty;
