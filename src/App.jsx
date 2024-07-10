import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Auth from "./components/Auth.jsx";
import Blogs from "./components/Blogs.jsx";
import UserBlogs from "./components/UserBlogs.jsx";
import BlogDetails from "./components/BlogDetails.jsx";
import AddBlogs from "./components/AddBlogs.jsx";
import { useSelector, useDispatch } from "react-redux";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import { authActions } from "./store/index.jsx";
import toast, { Toaster } from 'react-hot-toast'

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
        {!isLoggedIn && <Hero />}
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlogs />} />
              <Route path="*" element={<Navigate to="/blogs" />} />
            </>
          )}
        </Routes>
        {!isLoggedIn && <Footer />}
      </main>
      <Toaster/>
    </>
  );
};

export default App;
