import React, { useEffect, useMemo } from "react";
import { useDonationStore } from "../../store/useDonationStore";
import { useAuthStore } from "../../store/useAuthStore";

const UserOverview = () => {
  const { donations, isLoading, getUserDonations } = useDonationStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      getUserDonations(user.id); // fetch donations for this user
    }
  }, [user, getUserDonations]);

  // Calculate total amount
  const totalAmount = useMemo(() => {
    if (!donations || donations.length === 0) return 0;
    return donations.reduce((sum, d) => sum + d.amount, 0);
  }, [donations]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>

      {isLoading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold">Total Donations</h3>
            <p className="text-2xl font-bold text-blue-600">₹ {totalAmount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOverview;
