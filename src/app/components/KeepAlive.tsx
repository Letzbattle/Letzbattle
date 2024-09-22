// components/KeepAlive.js
"use client"; // This is a client component

import { useEffect } from 'react';
import axios from 'axios';

const KeepAlive = () => {
  useEffect(() => {
    const keepAlive = async () => {
      try {
        await axios.get('https://letzbattle-backend.onrender.com/api/events');
        console.log('Function pinged successfully.');
      } catch (error) {
        console.error('Error pinging function:', error);
      }
    };

    // Ping every 10 minutes
    const intervalId = setInterval(keepAlive, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component does not render anything
};

export default KeepAlive;
