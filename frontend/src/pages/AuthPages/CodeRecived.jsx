import React from "react";
import assets from "../../assets/assets";

const CodeRecived = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-HomeBgColor p-6">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image Section */}
        <div className="hidden lg:flex items-center justify-center p-6">
          <img
            src={assets.ForgetPassword_img}
            className="w-full h-auto max-h-[350px] object-contain"
            alt="Verification Email Sent"
          />
        </div>

        {/* Right: Content Section */}
        <div className="p-8 lg:p-12 flex flex-col items-center text-center">
          <h3 className="text-3xl font-bold text-black">Check Your Email!</h3>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            We've sent a verification code to your registered email. Please
            check your inbox.
          </p>

          <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-800 text-lg font-semibold tracking-widest">
            ✉ Your Verification Code:{" "}
            <span className="text-gray-800">XXXXXX</span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            If you don’t see the email in your inbox, check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeRecived;
