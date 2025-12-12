import React, { useState, useEffect } from "react";
import { FaDonate, FaCreditCard, FaPaypal } from "react-icons/fa";
import { useDonationStore } from "../store/useDonationStore";
import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const Donation = () => {



  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    amount: "",
    paymentMethod: "",
  });

  const { user, member } = useAuthStore();
  const userId = user?._id;
  const memberId = member?._id
  // console.log(memberId);


  const { donate, donateMember, isDonating, getRecentDonations, recentDonations, isLoading } =
    useDonationStore();


  const handleDonate = (e) => {
    e.preventDefault();

    if (
      // !formData.name ||
      // !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.amount ||
      !formData.paymentMethod
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (user) {
      donate(formData, userId);
    } else {
      donateMember(formData, memberId)
    }


  };

  // fetch recent donors on mount
  useEffect(() => {
    getRecentDonations();
  }, [getRecentDonations]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axiosInstance.get("/api/user/user-profile", { withCredentials: true });
      setFormData({
        ...formData,
        phone: res.data.user.phone || "",
        address: res.data.user.address || "",
      });
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Hero / Heading */}
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Support Our Mission ❤️
        </h1>
        <p className="mt-2 text-gray-600">
          Your contributions help us empower education, research, and innovation.
        </p>
      </div>

      {/* Donation Summary */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-md p-6 mb-10 text-center">
        <FaDonate className="mx-auto text-4xl mb-3" />
        <h2 className="text-xl font-semibold">Together We Make Change</h2>
        <p className="mt-2 text-sm opacity-90">
          Over <span className="font-bold">₹5,00,000+</span> raised to support
          education and research programs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Make a Donation
          </h2>
          <form className="space-y-4" onSubmit={handleDonate}>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                maxLength={10}
                minLength={10}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Donation Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
                className="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "card" })
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${formData.paymentMethod === "card"
                    ? "bg-blue-600 text-white"
                    : ""
                    }`}
                >
                  <FaCreditCard /> Card
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, paymentMethod: "upi" })
                  }
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${formData.paymentMethod === "upi"
                    ? "bg-blue-600 text-white"
                    : ""
                    }`}
                >
                  <FaPaypal /> UPI
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow transition"
              disabled={isDonating}
            >
              {isDonating ? "Processing..." : "Donate"}
            </button>
          </form>
        </div>

        {/* Recent Donors */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Recent Donors
          </h2>

          {isLoading ? (
            <p className="text-gray-500">Loading donors...</p>
          ) : recentDonations.length > 0 ? (
            <ul className="space-y-3 text-sm text-gray-700">
              {recentDonations.map((donation) => (
                <li
                  key={donation._id}
                  className="flex justify-between border-b pb-2"
                >
                  <span>
                    {donation.donor?.name || "Anonymous"} <br />
                    <span className="text-xs text-gray-500">
                      {donation.donor?.email}
                    </span>
                  </span>
                  <span className="text-blue-600 font-semibold">
                    ₹{donation.amount}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent donors yet.</p>
          )}

          <p className="mt-4 text-gray-500 text-xs">
            *Thank you for supporting our mission!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donation;
