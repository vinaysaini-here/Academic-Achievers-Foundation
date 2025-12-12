import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const TeamSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 px-4 md:px-12 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Team</h2>
      <p className="text-gray-600 mb-6">
        Meet our Members of professionals to serve you
      </p>

      <section className="pt-4 pb-10 max-w-6xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              name: "Dr. Jaydip Kumar",
              role: "Founder & Director",
              avatar: assets.Founder,
            },
            {
              name: "Poonam Kumar",
              role: "Director",
              avatar: assets.Director,
            },
            {
              name: "Roshan Lal",
              role: "Board of Directors",
              avatar: assets.Board_of_Directors,
            },
          ].map((person, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg shadow p-6 text-center hover:shadow-lg transition"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-100"
              />
              <h3 className="mt-4 text-lg font-semibold">{person.name}</h3>
              <p className="text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-center gap-4 ">
        <button
          className="bg-purple-800 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-900 transition"
          onClick={() => navigate("/about")}
        >
          About us
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-300 transition"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </div>
    </section>
  );
};

export default TeamSection;
