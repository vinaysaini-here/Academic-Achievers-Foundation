import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import assets from "../../assets/assets";

const MemberIDCard = () => {
  const { member } = useAuthStore();
  const BACKEND_URL = import.meta.env.VITE_API_URL; 
  // console.log(`${BACKEND_URL}/${member.profilePic}` );
  

  const members = {
    id: member?._id || "0000 1111 8888 0000",
    name: member?.name || "NAME",
    email: member?.email || "example@email.com",
    joined: member?.joinedAt,
    avatar: member?.profilePic ? `${BACKEND_URL}/${member.profilePic}` : assets.user,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-center">My Membership ID</h2>

      <div className="max-w-lg mx-auto bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-xl border relative overflow-hidden">
        {/* Header */}
        <div className="p-4 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-green-900">
              Academics Achievers Foundation
            </h3>
            <p className="text-sm text-gray-700 font-semibold">REGISTRATION CARD</p>
          </div>
          <div className="w-24 h-28 border bg-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={members.avatar}
              alt={members.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-2 text-left text-sm space-y-1">
          <p>
            <span className="font-semibold">Name: </span>
            {members.name}
          </p>
          <p>
            <span className="font-semibold">Email: </span>
            {members.email}
          </p>
          <p>
            <span className="font-semibold">Member Since: </span>
            {members.joined ? new Date(members.joined).toLocaleDateString() : "-"}
          </p>
        </div>

        {/* ID Number */}
        <div className="mt-4 text-center">
          <p className="text-2xl tracking-widest font-mono text-red-700 font-bold">
            {members.id}
          </p>
        </div>

        {/* Barcode placeholder */}
        <div className="mt-2 flex justify-center mb-4">
          <div className="w-3/4 h-12 bg-[repeating-linear-gradient(to_right,_black_0,_black_2px,_white_2px,_white_4px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default MemberIDCard;
