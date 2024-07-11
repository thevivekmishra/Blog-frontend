import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog.jsx';
import Loader from './Loader.jsx';
import notfound404 from '../assets/notfound.webp';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  const sendRequest = async () => {
    try {
      const res = await axios.get('https://blogbackend-62t9.onrender.com/api/blog'); // Replace with your Render backend URL
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const refreshBlogs = () => {
    sendRequest()
      .then((data) => {
        setBlogs(data.blogs);
        setIsLoading(false); // Set loading to false after blogs are fetched
      })
      .catch(() => {
        setIsLoading(false); // Handle error state
      });
  };

  useEffect(() => {
    refreshBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto ">
        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Loader key={index} />
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Blog 
                key={blog._id}
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user._id}
                username={blog.user.name}
                title={blog.title}
                imageURL={blog.image}
                description={blog.description}
                createdAt={blog.createdAt}
                refreshBlogs={refreshBlogs}
              />
            ))
          ) : (
            <div className="flex flex-col items-center">
              <img src={notfound404} alt="No data available" className="h-[400px] w-[500px] mb-4" />
              <p className="text-gray-600 text-lg">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
