import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDonationStore } from "../../store/useDonationStore";

const AdminDashboard = () => {
  const {
    recentDonations,
    getRecentDonations,
    monthlyStats,
    totals,
    getDashboardStats,
    isLoading,
  } = useDonationStore();

  // fetch on mount
  useEffect(() => {
    getRecentDonations();
    getDashboardStats();
  }, [getRecentDonations, getDashboardStats]);

  return (
    <main className="flex-1 min-h-[78vh] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Donation Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-2 md:mt-0">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Total Donors</h2>
          <p className="text-3xl font-extrabold text-blue-600">
            {totals?.totalDonations || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Funds Raised</h2>
          <p className="text-3xl font-extrabold text-green-600">
          ₹{totals?.fundsRaised || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">New Donors</h2>
          <p className="text-3xl font-extrabold text-purple-600">
            {totals?.newDonors || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">Active Projects</h2>
          <p className="text-3xl font-extrabold text-orange-500">
            {totals?.activeProjects || 0}
          </p>
        </div>
      </div>

      {/* Donation Overview + Recent Donations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Donation Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyStats}>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Donations
          </h2>
          {isLoading ? (
            <p className="text-gray-500">Loading recent donations...</p>
          ) : recentDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Donor</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDonations.map((donation) => (
                    <tr
                      key={donation._id}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3">
                        {donation.donor?.name || "Anonymous"}
                      </td>
                      <td className="py-3 font-semibold">${donation.amount}</td>
                      <td className="py-3">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent donations found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;

