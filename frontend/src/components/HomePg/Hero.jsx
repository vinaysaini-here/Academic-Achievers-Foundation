import React from "react";
import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const Hero = () => {
  // const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <section className="relative isolate max-h-[92vh] sm:h-[75vh] lg:h-[92vh] overflow-hidden">
      <img
        src={assets.homeBg}
        alt="Hero background"
        className="absolute inset-0 h-[100vh] w-[100vw] object-cover"
      />

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-white font-roboto-bold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              Foundation of nation
              <br /> building – education
              <br /> and research!
            </h1>

            <p className="mt-6 text-white/85 text-sm sm:text-base max-w-md">
              Now donating is not just a virtue, it is also a wisdom – get tax
              exemption.
            </p>

            <div className="mt-6">
            {user?.role === "admin" ? (
            <Link
              to="/admin/dashboard"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-blue-400"
            >
              Go to Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/donation"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
            >
              Donate
            </Link>
          )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
