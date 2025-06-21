import React from "react";
import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/SignUp";
import Profile from "./pages/Profile";
import PublicBlog from "./pages/PublicBlog";




const App = () => {
  return (
      <AuthProvider>
        <ThemeProvider>
          <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signUp" element={<Signup></Signup>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="/publicBlog" element={<PublicBlog></PublicBlog>}></Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
  );
};

export default App;
