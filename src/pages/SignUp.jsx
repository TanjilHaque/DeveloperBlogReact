import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { db } from "../../Database/firebase.config";
import { ref, set } from "firebase/database";
import _ from "../lib/lib";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const authInstance = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: form.username,
      });

      // Save to Realtime DB
      await set(ref(db, "users/" + user.uid), {
        uid: user.uid,
        username: form.username,
        email: form.email,
        createdAt: _.getTimeNow(),
        emailVerified: user.emailVerified,
      });

      // Send verification email
      await sendEmailVerification(user);
      _.SucessToast("Verification email sent! Please check your inbox.");
      navigate("/login"); // go to login after sending email
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
          Create an Account
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md outline-none bg-white dark:bg-gray-700 dark:text-white"
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
        </div>

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
          Sign Up
        </button>
        <Link to={'/login'} className="text-white">
          Goto Login
        </Link>
      </form>
    </div>
  );
};

export default Signup;