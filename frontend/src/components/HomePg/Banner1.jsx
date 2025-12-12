import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Banner1 = () => {
  const { user } = useAuthStore();
  return (
    <section className="bg-[#fef3c7] py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm font-medium text-gray-700">Empowering</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            Making a Difference in Rural Healthcare
          </h2>
        </div>

        <div>
          <p className="text-gray-700 max-w-xl text-sm sm:text-base">
            We are dedicated to transforming rural healthcare through
            telemedicine, reaching villages, treating patients, and involving
            healthcare professionals.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-6 max-w-md">
            <div>
              <p className="text-2xl font-bold text-gray-900">50%</p>
              <p className="text-sm text-gray-600">Villages Reached</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50%</p>
              <p className="text-sm text-gray-600">Patients Treated</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-gray-900 px-5 py-2 text-sm font-semibold text-gray-900 rounded-md hover:bg-gray-100"
            >
              Learn More
            </Link>
            {user?.role === "admin" ? (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-sm font-semibold text-gray-900 hover:underline"
            >
              Go to Admin Dashboard
            </Link>
          ) : (
            <Link
              to="/donation"
              className="inline-flex items-center text-sm font-semibold text-gray-900 hover:underline"
            >
              Donate Now <span className="ml-2">➝</span>
            </Link>
          )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner1;
