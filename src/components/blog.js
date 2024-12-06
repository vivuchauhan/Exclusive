import React from 'react';
import Header from './Header';

function Blog () {
  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains('theme-light')
      ? 'theme-light'
      : 'theme-dark';

    document.body.classList.remove(currentTheme);
    document.body.classList.add(currentTheme === 'theme-light' ? 'theme-dark' : 'theme-light');
  };

  
  return (
    <div>
        <Header toggleTheme={toggleTheme}/>
        <h1 className='text-center mt-5'><img src='https://logos.flamingtext.com/Word-Logos/working-design-sketch-name.png' alt='...' className='img-fluid' /></h1>
    </div>
  );
};

export default Blog;
