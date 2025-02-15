import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">Status Page</h1>
      <div>
        <a href="#" className="text-gray-300 hover:text-white mx-2">Home</a>
        <a href="#" className="text-gray-300 hover:text-white mx-2">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar; 