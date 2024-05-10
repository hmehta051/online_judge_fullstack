import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const reqObj = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const res = await axios.post("http://localhost:8080/api/register", reqObj);
        navigate("/login")
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div
      className="w-full bg-white-600 flex items-center justify-center flex-col bg-[#F5F5F5]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="max-w-md w-[90%] sm:w-[90%] md:w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-xl sm:text-xl md:text-3xl font-extrabold text-gray-900">
            Create your CodeKing Account
          </h2>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                minLength={3}
              />
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="confirm-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#527450] hover:bg-[#527450] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#527450]"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
      <span className="mt-2 text-left">
        Already have an account?{" "}
        <Link to="/login" className="text-[#527450]">
          Login
        </Link>
      </span>
    </div>
  );
};

export default Signup;
