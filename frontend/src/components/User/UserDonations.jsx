import React, { useEffect } from "react";
import { useDonationStore } from "../../store/useDonationStore";
import { useAuthStore } from "../../store/useAuthStore";
const UserDonations = () => {
  const { donations, isLoading, getUserDonations, downloadReceipt, isDownloading } = useDonationStore();
  const { user } = useAuthStore();

  // console.log(user?._id);

  useEffect(() => {
    if (user?._id) {
      getUserDonations(user._id);
    }
  }, [user]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">My Donation History</h2>

      {isLoading ? (
        <p className="text-gray-500 italic">Loading donations...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((d) => (
                  <tr key={d._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(d.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">₹{d.amount}</td>
                    <td className="p-3">{d.paymentMethod}</td>
                    <td className="p-3">
                      <button
                        onClick={() => downloadReceipt(d._id)}
                        disabled={isDownloading}
                        className={`px-3 py-1 rounded text-white ${isDownloading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                      >
                        {isDownloading ? "Downloading..." : "Download"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-4 text-gray-500 italic"
                  >
                    No donations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDonations;
