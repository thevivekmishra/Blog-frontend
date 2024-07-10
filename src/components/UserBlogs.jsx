import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog.jsx';
import Loader from './Loader.jsx';
import notfound from '../assets/404image.png';

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
      setBlogs(data.blogs);
      setIsLoading(false); // Set loading state to false after fetching data
    });
  };

  useEffect(() => {
    refreshBlogs();
  }, [id]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Loader key={index} />
        ))
      ) : blogs && blogs.length > 0 ? (
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
        <div className="flex flex-col items-center mt-6">
          <img src={notfound} alt="No posts found" className="h-100 w-auto mb-4" />
          <p className="text-gray-600 text-lg text-center">
            No posts available. Add posts to see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
