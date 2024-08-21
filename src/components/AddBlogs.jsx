import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import bgimage2 from '../assets/bgimage2.png';

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
      const apiUrl = 'https://blogbackend-62t9.onrender.com/api/blog/add';
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
      navigate('/myBlogs');
    }
  };

  return (
    <div className="relative flex justify-center items-center h-[100vh] p-2">
      <img src={bgimage2} alt="Background" className="absolute inset-0 w-full h-full object-cover  z-0" />
      <div className="absolute inset-0 z-0"></div>
      <Toaster/>
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg bg-white mt-24 sm:ml-[-500px] p-8 rounded-lg shadow-2xl z-10 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Your Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            placeholder="Enter the title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            placeholder="Enter the description"
            rows="4"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            placeholder="Enter the image URL"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300 font-semibold shadow-md transform hover:scale-105"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
