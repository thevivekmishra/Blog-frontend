import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendRequest = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const apiUrl = 'https://blogbackend-62t9.onrender.com/api/blog/add'; // Replace with your Render backend URL
      const res = await axios.post(apiUrl, {
        title: formData.title,
        description: formData.description,
        image: formData.imageUrl,
        user: userId,
      });
      return res.data;
    } catch (err) {
      console.error('Error adding post:', err);
      toast.error('Failed to add post');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();
    if (data) {
      toast.success('Post added successfully');
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
      });
      navigate('/myBlogs'); // Navigate to /myBlogs after adding the post
    } else {
      // Already handled in sendRequest
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-3">
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the description"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter the image URL"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;