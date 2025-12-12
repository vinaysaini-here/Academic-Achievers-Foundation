import React, { useEffect, useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMemberStore } from "../../store/useMemberStore";

const AdminMembers = () => {
  const { members, getAllMembers, deleteMember, isLoading } = useMemberStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  // 🔹 Filter members by search query
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Handle delete click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      await deleteMember(id);
    }
  };

  return (
    <div className="min-h-[78vh]">
      {/* Header with Search + Requests */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">All Members</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="border p-2 pl-10 rounded w-full"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* View Requests Button */}
          <Link
            to="/admin/members/requests"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700"
          >
            View Requests
          </Link>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <p className="text-center text-gray-500">Loading members...</p>
      )}

      {/* Desktop Table */}
      {!isLoading && (
        <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <th className="p-4 text-left rounded-tl-lg">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Address</th>
                <th className="p-4 text-left rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr
                    key={member._id || index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={member.profilePic}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover shadow"
                      />
                      <span className="font-medium text-gray-800">
                        {member.name}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{member.email}</td>
                    <td className="p-4 text-gray-600">{member.address}</td>
                    <td className="p-4 text-center space-x-2">
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FaTrash /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <div
              key={member._id || index}
              className="bg-white rounded shadow p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.profilePic}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{member.address}</span>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminMembers;

