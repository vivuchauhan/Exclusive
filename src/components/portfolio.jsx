import React from 'react'
import Header from './header';
import './css/about.css';
import Footer from "./footer"; 

export const Portfolio = () => {
  return (
   <>
   <Header />
        <div className='d-flex justify-content-center'>
            <img src='https://media.istockphoto.com/id/1302168946/vector/coming-soon-red-ribbon-label-banner-open-available-now-sign-or-coming-soon-tag-vector.jpg?s=612x612&w=0&k=20&c=uzI1Ztsm3NcyQCscb1kQ3goarshfkR_n2ZDhAwgYPWQ=' alt='' className='img-fluid' />                
        </div>
    <Footer />
   </>
  )
}
