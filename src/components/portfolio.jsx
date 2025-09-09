
import React from 'react';
import ResumePDF from './assets/vivek-updated-resume.pdf'; // adjust path
import './css/about.css';

export const Portfolio = () => {
  return (
    <div className='container d-flex justify-content-end flex-column align-items-center'>
      <a href={ResumePDF} download className="btn btn-primary mt-4 mb-5">
        Download My Resume
      </a>
    </div>
  );
};
