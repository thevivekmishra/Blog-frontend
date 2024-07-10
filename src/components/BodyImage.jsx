import React from 'react';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

const BodyImage = () => {
  return (
    <div className="mt-6 pt-9">
      <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="relative group">
          <img src={image1} alt="Mobile view 1" className="w-full h-auto object-cover rounded-md shadow-sm" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <p className="text-white text-lg">You can see all posts</p>
          </div>
        </div>

        <div className="relative group">
          <img src={image2} alt="Mobile view 2" className="w-full h-auto object-cover rounded-md shadow-sm" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <p className="text-white text-lg">You can Edit/Update your posts</p>
          </div>
        </div>
        <div className="relative group">
          <img src={image3} alt="Mobile view 3" className="w-full h-auto object-cover rounded-md shadow-sm" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
            <p className="text-white text-lg">You can upload new posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyImage;
