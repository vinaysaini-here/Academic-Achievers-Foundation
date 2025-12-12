import React from "react";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };
 
  const { signup, isSignup } = useAuthStore();


  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);

      navigate("/verify-email");
    }
  };

  const handleGoogleLogin = () =>{
    window.location.href = "http://localhost:8000/auth/google";
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-gray-50">
      <div className="justify-center items-center  hidden md:flex">
        <img src={assets.logo} alt="NGO Logo" className="max-w-[35vw] w-full" />
      </div>

      <div className=" flex flex-col justify-center items-center md:w-[35vw] p-6 md:p-0 ">

        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-2">SIGNUP</h2>
            <p className="text-center text-gray-500 mb-6">
              Let’s Get Started With Your NGO account
            </p>

            <div className="space-y-4">
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg px-3">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-transparent focus:outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
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
                />
              </div>
            </div>

            <button className="w-full mt-5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition" type="submit" disabled={isSignup}>
              {isSignup ? "Signing Up..." : "SignUp Now"}

            </button>
          </form>
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">
              SignUp with Others
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FcGoogle className="text-xl mr-2" />
              <span>
                SignUp with <strong>Google</strong>
              </span>
            </button>
            {/* <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition">
              <FaMicrosoft className="text-blue-500 text-xl mr-2" />
              <span>
                SignUp with <strong>Microsoft</strong>
              </span>
            </button> */}
          </div>

          <p className="text-center text-gray-600 mt-6">
            Do you have any account?{" "}
            <NavLink
              href="/signin"
              className="text-blue-600 font-medium hover:underline"
              onClick={() => navigate("/signin", { replace: true })}
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
