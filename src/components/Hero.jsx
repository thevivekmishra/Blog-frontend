import React from 'react';

const ProjectDescription = () => {
  return (
    <div className="bg-gray-100 animate-fade-in">
      <div className="container mx-auto p-4 md:px-16 ">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-orange-600 mb-4 flex text-center justify-center items-center mt-9 font-serif animate-slide-in-up">
            POSTFIX App!
          </h2>
          <p className="text-lg text-black mb-9 animate-slide-in-up delay-100">
            Welcome to POSTFIX, where creativity meets community! Sign in to unleash your writing prowess by creating and sharing engaging blogs. Customize each post with images, titles, and detailed descriptions. Edit and delete your blogs effortlessly to keep your content fresh. Our user-friendly interface ensures a seamless experience, complete with a dynamic loader for quick updates. Explore diverse blogs, connect with fellow writers, and enjoy a platform designed for seamless sharing and community engagement. Join us at POSTFIX and start sharing your stories, insights, and creations today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
