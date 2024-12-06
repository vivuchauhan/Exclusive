// FlashSaleCountdown.js

import React, { useEffect, useState } from 'react';
import "./css/home.css";

const FlashSaleCountdown = () => {
  // ... your existing countdown logic here
  const calculateRemainingTime = () => {
    const flashSaleEndTime = new Date('2024-10-10T18:00:00Z');
    const now = new Date();
    
    let differenceInSeconds = Math.floor((flashSaleEndTime - now) / 1000);
  
    // If remaining time is negative or zero, reset it to the initial flash sale duration
    if (differenceInSeconds <= 0) {
      const oneHourLater = new Date();
      oneHourLater.setHours(oneHourLater.getHours() + 1); 
      differenceInSeconds = Math.floor((oneHourLater - now) / 1000);
    }
    return differenceInSeconds;
  };
  

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    // Update remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ul className='list-unstyled d-flex gap-3 HomePgTime'>
      <li>
          <p>Hours</p>
          <span>{Math.floor((remainingTime % 86400) / 3600)}</span>
      </li>
      <li className='dots'>:</li>
      <li>
          <p>Minutes</p>
          <span>{Math.floor((remainingTime % 3600) / 60)}</span>
      </li>
      <li className='dots'>:</li>
      <li>
          <p>Seconds</p>
          <span>{remainingTime % 60}</span>
      </li>
    </ul>
  );
};

export default FlashSaleCountdown;
