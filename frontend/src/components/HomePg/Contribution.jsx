import React from "react";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Contribution = () => {
  const { user } = useAuthStore();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            Every Contribution Counts <br /> in Transforming Lives
          </h2>

          <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-xl">
            Even small donations can make a significant impact in providing
            healthcare to those in need. Your support can help save lives and
            bring healthcare to rural areas through telemedicine.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900">Small Donations</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Make a big difference in transforming{" "}
                <em>healthcare for those in need.</em>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Join Us</h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                In making a lasting impact through your{" "}
                <em>generous contribution.</em>
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
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
              Donate
            </Link>
          )}
            <Link
             to="/about"
              className="inline-flex items-center text-sm font-semibold text-gray-900 hover:underline"
            >
              Learn More
              <span className="ml-2">➝</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={assets.RfH_Img_1}
            alt="Helping community"
            className="w-full max-w-lg rounded-2xl object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Contribution;
