import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Vivek Kumar Mishra. All Rights Reserved.
        </p>
        <p className="text-sm mt-2">
          Email: <a href="mailto:mishravivek9569@gmail.com" className="underline">mishravivek9569@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
