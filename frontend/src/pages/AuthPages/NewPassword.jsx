import React, { useState } from "react";
import assets from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"

const NewPassword = () => {
  const { id, token } = useParams(); // Extract id and token from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { newPassword, setnewPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      return alert("Both fields are required!");
    }

    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    newPassword(id, token, formData)
    // Navigate to login page after successful password reset
    navigate("/signin");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-HomeBgColor p-6">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image Section */}
        <div className="hidden lg:flex items-center justify-center p-6">
          <img
           src={assets.EnterMail_img}
            className="w-full h-auto max-h-[350px] object-contain"
            alt="Reset Password"
          />
        </div>
        
        {/* Right: Form Section */}
        <div className="p-8 lg:p-12 flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold text-black">Reset Your Password</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Choose a strong password that you haven’t used before.
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full py-3 px-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full py-3 px-4 mb-4 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full  bg-black hover:bg-[#434444] text-white font-semibold py-3 rounded-lg flex items-center justify-center transition " disabled={setnewPassword}
              >
                {setnewPassword ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
