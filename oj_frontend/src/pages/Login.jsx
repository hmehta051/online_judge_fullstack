import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/login", formData);
      if (res.data.status === "success") {
        // Assuming you have received the response object from the login request
        const token = res.data.token;
        const decoded = jwtDecode(token);
        console.log(decoded)

        // Set the received token as a cookie
        Cookies.set("token", token, { expires: 1, secure: true }); // Example options, adjust as needed

        navigate("/");
      }
      console.log(res);
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div
      className="w-full bg-white-600 flex items-center justify-center flex-col"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      <div className="max-w-md w-[90%] sm:w-[90%] md:w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-xl sm:text-xl md:text-3xl font-extrabold text-gray-900">
            Login your CodeKing Account
          </h2>
        </div>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="on"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#527450] focus:border-[#527450] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#527450] hover:bg-[#527450] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#527450]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <span className="mt-2 text-left">
        Don't have an accound?{" "}
        <Link to="/signup" className="text-[#527450]">
          Signup
        </Link>
      </span>
    </div>
  );
};

export default Login;
