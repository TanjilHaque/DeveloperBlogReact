import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import _ from "../lib/lib";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      _.SucessToast("Login successful!");
      navigate("/home");
    } catch (error) {
      _.ErrorToast(error.message);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700 dark:text-white">
          Login to Your Account
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 dark:text-white"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 dark:text-white"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
        >
          Login
        </button>
        <Link to={'/signUp'} className="text-white">
          Goto Sign UP
        </Link>
      </form>
    </div>
  );
};

export default Login;