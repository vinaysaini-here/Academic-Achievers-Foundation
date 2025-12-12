import React, { useState, useEffect } from "react";
import {
  FaFileDownload,
  FaMoneyBillWave,
  FaClock,
  FaDonate,
  FaSearch,
} from "react-icons/fa";
import { useDonationStore } from "../../store/useDonationStore";

const AdminDonations = () => {
  const {
    getAllDonations,
    isLoading,
    donations,
    downloadReceipt,
    isDownloading,
  } = useDonationStore();

  useEffect(() => {
    getAllDonations();
  }, [getAllDonations]);

  const filteredDonations = Array.isArray(donations)
    ? donations
    : donations?.donations || [];

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6 min-h-[78vh]">
      <h2 className="text-2xl font-bold">Donations</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaDonate className="text-blue-600 text-3xl" />
          <div>
            <p className="text-gray-500">Total Donations</p>
            <p className="text-xl font-bold">{filteredDonations.length}</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-5 flex items-center gap-4">
          <FaMoneyBillWave className="text-yellow-600 text-3xl" />
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="text-xl font-bold">₹{totalAmount}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search donor or email..."
            className="border p-2 pl-10 rounded w-full"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Donor</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{d._id}</td>
                <td className="p-3 border-b">{d?.donor?.name}</td>
                <td className="p-3 border-b">{d?.donor?.email}</td>
                <td className="p-3 border-b font-semibold text-green-600">
                  ₹{d.amount}
                </td>
                <td className="p-3 border-b">
                  {new Date(d.date).toLocaleDateString()}
                </td>
                <td className="p-3 border-b">
                  <button
                    onClick={() => downloadReceipt(d._id)}
                    disabled={isDownloading}
                    className={`px-3 py-1 rounded text-white flex items-center gap-2 ${
                      isDownloading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    <FaFileDownload />
                    {isDownloading ? "Downloading..." : "Download"}
                  </button>
                </td>
              </tr>
            ))}
            {filteredDonations.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid gap-4">
        {filteredDonations.map((d) => (
          <div
            key={d._id}
            className="bg-white rounded shadow p-4 flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">{d?.donor?.name}</p>
              <p className="text-green-600 font-bold">₹{d.amount}</p>
            </div>
            <p className="text-sm text-gray-500">{d?.donor?.email}</p>
            <p className="text-sm text-gray-400">
              {new Date(d.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => downloadReceipt(d._id)}
              disabled={isDownloading}
              className={`px-3 py-2 rounded text-white flex items-center gap-2 justify-center ${
                isDownloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FaFileDownload />
              {isDownloading ? "Downloading..." : "Download Receipt"}
            </button>
          </div>
        ))}
        {filteredDonations.length === 0 && (
          <p className="text-center text-gray-500">No donations found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;
