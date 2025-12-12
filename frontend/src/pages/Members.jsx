import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import asstes from "../assets/assets";
import { useMemberStore } from "../store/useMemberStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Members = () => {
  const navigate = useNavigate();
  const { members, getApprovedMembers, isLoading } = useMemberStore()
  const { user, member } = useAuthStore();

  useEffect(() => {
    getApprovedMembers();
  }, [getApprovedMembers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-12 px-4  bg-[#fef3c7] text-black">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Meet Our Members
        </h1>
        <p className="max-w-2xl mx-auto text-lg mb-6">
          Our NGO family is growing with passionate individuals who are
          dedicated to making a difference. Join us and become part of our
          community today!
        </p>
        {user?.role === "admin" ? (
          <Link
            to="/admin/members"
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
          >
            See Members
          </Link>
        ) : (
          <>
            {member ? (
              <Link
                to="/member/"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
              >
                Member Dashboard
              </Link>
            ) : (
              <Link
                to="/joinus"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
              >
                Join as a Member
              </Link>
            )}
          </>
        )}
      </section>

      {isLoading && (
        <p className="text-center text-gray-500">Loading members...</p>
      )}

      <section className="p-6 md:p-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Active Members
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center"
            >
              <img
                src={member.profilePic}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-blue-100"
              />
              <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.address}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-50 py-12 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Want to be part of this amazing journey?
        </h2>
        <p className="max-w-xl mx-auto text-gray-600 mb-6">
          By becoming a member, you can contribute to meaningful causes, join
          events, and work together for a brighter future.
        </p>
        {user?.role === "admin" ? (
          <Link
            to="/admin/members"
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
          >
            See Members
          </Link>
        ) : (
          <>
            {member ? (
              <Link
                to="/member/"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
              >
                Member Dashboard
              </Link>
            ) : (
              <Link
                to="/joinus"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow hover:bg-white hover:text-black hover:border transition"
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

export default Members;
