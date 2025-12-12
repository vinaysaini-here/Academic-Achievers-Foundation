import React, { useState } from "react";
import { useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useAuthStore } from "../store/useAuthStore";

const LoginAsMember = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { memberLogin, isLogin, isAuthenticated } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
     await memberLogin(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gray-50">
      {/* Left side form */}
      <div className="flex flex-col justify-center items-center md:w-[35vw] p-6 md:p-0">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Member Login</h2>
          <p className="text-center text-gray-500 mb-6">
            Access your member dashboard and exclusive features
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Member Email"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password Input */}
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-5 bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition"
              disabled={isLogin}
            >
              {isLogin ? "Signing In..." : "Sign In as Member"}
            </button>
          </form>

          {/* Link to Join */}
          <p className="text-center text-gray-600 mt-6">
            Not a member yet?{" "}
            <NavLink
              to="/joinus"
              className="text-blue-600 font-medium hover:underline"
            >
              Join Now
            </NavLink>
          </p>
        </div>
      </div>

      {/* Right side image */}
      <div className="justify-center items-center hidden md:flex">
        <img src={assets.logo} alt="NGO Logo" className="max-w-[32vw] w-full" />
      </div>
    </div>
  );
};

export default LoginAsMember;
