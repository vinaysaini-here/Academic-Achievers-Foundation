import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const EmailVerification = () => {
  const navigate = useNavigate()
  const [ formData, setformData]  = useState({
    email: "",
    otp: ""
  });


  const { verifyEmail, setOtp  } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
     const response = await verifyEmail(formData);
    if(response){
      navigate("/");
    }
     
    
  };




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FaEnvelopeOpenText className="text-blue-600 text-5xl" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We’ve sent a 4-digit verification code to your email. Please enter the
          code below to verify your account.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Your Mail Address"
            
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter 4-digit code"
            maxLength={4}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.otp}
            onChange={(e) => {
              setformData({ ...formData, otp: e.target.value })
            }}
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={setOtp}
          >
            {setOtp ? "Verifying ..." : "Verify Email"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Didn’t receive the email?{" "}
          <button className="text-blue-600 font-semibold hover:underline">
            Resend Email
          </button>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
