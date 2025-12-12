import React from "react";
// import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AboutUs = () => {
  // const navigate = useNavigate();
  const { user , member} = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#fef3c7] text-black py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About Us - AAEAR Foundation
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          Academics Achievers Education And Research Foundation is a premier
          institution dedicated to advancing education, research, and
          innovation.
        </p>
      </section>

      {/* Detailed About Section */}
      <section className="pt-12 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 leading-relaxed text-gray-700 space-y-6">
          <p>
            Our mission is to empower students, educators, and researchers by
            providing high-quality academic resources, research opportunities,
            and skill development programs.
          </p>
          <p>
            With a strong commitment to excellence, we bridge the gap between
            knowledge and practical application, fostering a learning
            environment that nurtures curiosity, critical thinking, and
            intellectual growth. Our foundation collaborates with leading
            academic institutions, industry experts, and research organizations
            to drive impactful learning experiences and groundbreaking
            discoveries.
          </p>
          <p>
            At Academics Achievers, we believe in the power of education to
            shape the future. Whether through scholarships, research grants,
            training workshops, or mentorship programs, we strive to create
            opportunities that inspire lifelong learning and academic success.
          </p>
          <p className="font-semibold text-blue-700">
            Join us in our journey to make education more accessible, research
            more impactful, and innovation more meaningful.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-6 md:px-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Mission</h2>
          <p className="text-gray-600">
            To uplift underprivileged communities through education, healthcare,
            and social initiatives, ensuring equal opportunities for all.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Our Vision</h2>
          <p className="text-gray-600">
            To create a world where every individual has access to resources,
            knowledge, and opportunities to live a dignified life.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-blue-50 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">
          Our Impact in Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div>
            <p className="text-4xl font-bold text-blue-700">500+</p>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-700">₹10L+</p>
            <p className="text-gray-600">Donations Raised</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-700">100+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-700">20+</p>
            <p className="text-gray-600">Communities Served</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">Meet Our Team</h2>
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
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
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

      {/* Call to Action */}
      <section className="bg-gray-800 text-white py-12 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Join us in making a difference!
        </h2>
        <p className="max-w-xl mx-auto mb-6">
          Whether through volunteering, donating, or becoming a member, your
          support helps us continue our mission.
        </p>
        {user?.role === "admin" ? (
          <Link
            to="/admin/members"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300"
          >
            See Members
          </Link>
        ) : (
          <>
            {member ? (
              <Link
                to="/member/"
                className="px-6 py-3 bg-yellow-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
              >
                Member Dashboard
              </Link>
            ) : (
              <Link
                to="/joinus"
                className="px-6 py-3 bg-yellow-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
              >
                Join as a Member
              </Link>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default AboutUs;
