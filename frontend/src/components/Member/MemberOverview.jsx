import React, { useEffect } from "react";
import { FaMoneyBillWave, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import {useDonationStore} from "../../store/useDonationStore"; 
import {useAuthStore} from "../../store/useAuthStore"

const MemberOverview = () => {
  const {member} = useAuthStore()
  const { totalDonations, fetchTotalDonations, loading, error } = useDonationStore();
  const memberId = member?._id
  // console.log(memberId);
  

  useEffect(() => {
    if (memberId) {
      fetchTotalDonations(memberId);
    }
  }, [memberId, fetchTotalDonations]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Overview</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* Total Donations (Dynamic) */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Total Donations</h3>
            {loading ? (
              <p className="text-lg">Loading...</p>
            ) : error ? (
              <p className="text-red-400 text-lg">Error</p>
            ) : (
              <p className="text-2xl font-bold">₹{totalDonations}</p>
            )}
          </div>
          <FaMoneyBillWave size={32} />
        </div>

        {/* Membership (Hardcoded) */}
        <div className="bg-green-600 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Membership</h3>
            <p className="text-2xl font-bold">Active</p>
          </div>
          <FaCheckCircle size={32} />
        </div>

        {/* Next Event (Hardcoded) */}
        <div className="bg-yellow-500 text-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h3>Member Since</h3>
            <p className="text-2xl font-bold">{new Date(member?.joinedAt).toLocaleDateString()}</p>
          </div>
          <FaCalendarAlt size={32} />
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
