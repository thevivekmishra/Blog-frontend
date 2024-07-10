import React from 'react';

const Loader = () => {
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden m-4 p-4 animate-pulse">
      <div className="flex space-x-4 items-center">
        <div className="rounded-full bg-gray-300 h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          {/* <div className="h-4 bg-gray-300 rounded w-3/4"></div> */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="mt-2 h-60 bg-gray-300 rounded"></div> {/* Adjust height to match image dimensions */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mt-6"></div>
    </div>
    
  );
};

export default Loader;

