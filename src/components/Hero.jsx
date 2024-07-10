import React from 'react';

const ProjectDescription = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto w-[70%] py-4">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-4 flex text-center justify-center  items-center mt-9 ">Welcome to CRUD App!</h2>
          <p className="text-lg text-black text-center mb-9">
            Sign in or sign up to use CRUD App. Once logged in, you can upload images,
            provide titles and descriptions for your posts. Other users can view and
            interact with your posts. Enjoy managing your content seamlessly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
