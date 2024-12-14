import React, { useEffect } from 'react';

const SuccessAlert = ({ message }) => {
    
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hide the success alert after 5 seconds
      document.getElementById('success-alert').style.display = 'none';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="success-alert" className="alert alert-success fixed top-5 left-0 right-0 mx-auto mt-10 w-1/4 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{message}</span>
    </div>
  );
};

const ErrorAlert = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hide the error alert after 5 seconds
      document.getElementById('error-alert').style.display = 'none';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="error-alert" className="alert alert-error fixed top-5 left-0 right-0 mx-auto mt-10 w-1/4 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{message}</span>
    </div>
  );
};

export { SuccessAlert, ErrorAlert };