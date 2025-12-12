import React, { useState } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { forgetPasswordEmailCheck , setOtp } = useAuthStore()
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgetPasswordEmailCheck(formData);

    navigate("/code-recived");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-HomeBgColor p-6">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image Section */}
        <div className="hidden lg:block">
          <img
            src={assets.ForgetPassword_img}
            className="w-full h-full object-cover rounded-l-2xl"
            alt="Forgot Password"
          />
        </div>

        {/* Right: Form Section */}
        <div className="p-8 lg:p-12 flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold text-black">
            Forgot Your Password?
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            No worries! Enter your email below and we’ll send you an OTP to
            reset your password.
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-6 flex flex-col">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 my-2 bg-gray-100 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f5050] outline-none"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Send OTP Button */}
            <button
              className="w-full mt-4 py-3 text-white font-semibold bg-black hover:bg-[#434444] rounded-md transition-all duration-300 flex items-center justify-center"
              type="submit"
              disabled={setOtp}
            >
              {setOtp? "Sending" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
