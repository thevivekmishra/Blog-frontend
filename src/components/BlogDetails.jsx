import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const BlogDetails = () => {
  const { id } = useParams(); // Accessing id parameter from URL using useParams
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null); // State to store the fetched blog data
  const [inputs, setInputs] = useState({ title: '', description: '' }); // State to manage form inputs

  // Fetch blog details based on id from the backend
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`https://blogbackend-62t9.onrender.com/api/blog/${id}`); // Replace with your Render backend URL
      setBlog(res.data.blog); // Set blog state with fetched data
      // Set form inputs with fetched blog details
      setInputs({
        title: res.data.blog.title,
        description: res.data.blog.description,
      });
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

  useEffect(() => {
    fetchDetails(); // Fetch blog details when component mounts or id changes
  }, [id]); // Dependency array ensures useEffect runs when id changes

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`https://blogbackend-62t9.onrender.com/api/blog/update/${id}`, { // Replace with your Render backend URL
        title: inputs.title,
        description: inputs.description,
      });
      console.log('Blog updated successfully:', res.data);
      toast.success('Blog updated successfully');
      navigate('/myBlogs'); // Navigate to /myBlogs after successful update
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-3">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Your Blog</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={inputs.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={inputs.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the description"
            rows="4"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogDetails;
