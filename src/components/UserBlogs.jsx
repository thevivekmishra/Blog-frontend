import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog.jsx';
import Loader from './Loader.jsx';
import notfound404 from '../assets/404image.png';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = localStorage.getItem('userId');

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get('https://blogbackend-62t9.onrender.com/api/blog/user/' + id); // Replace with your Render backend URL
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const refreshBlogs = () => {
    setIsLoading(true); // Set loading state to true before fetching data
    fetchUserBlogs().then((data) => {
      const sortedBlogs = data.blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBlogs(sortedBlogs);
      setBlogs(data.blogs);
      setIsLoading(false); // Set loading state to false after fetching data
    });
  };

  useEffect(() => {
    refreshBlogs();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      <div className="container mx-auto ">
        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Loader key={index} />
            ))
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <Blog
                key={blog._id} // Use key prop with a unique value
                id={blog._id}
                isUser={true}
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
              <img src={notfound404} alt="No data available" className="h-[500px] w-[500px] mb-4" />
              <p className="text-gray-600 text-lg">All your posts will appear here after uploading</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBlogs;
