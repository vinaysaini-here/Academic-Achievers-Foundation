import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCamera, FaLock } from "react-icons/fa";
import { useAuthStore } from "../../store/useAuthStore";

const UserSettings = () => {
  const { user, uploadProfilePic, isUploading , changepassword , isChanging} = useAuthStore();
  const [preview, setPreview] = useState(user?.profilePic || "#");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file && user?._id) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);

      try {
        await uploadProfilePic(user._id, file);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  // const profilePic = user?.profilePic;
  // console.log(profilePic);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await changepassword(formData);

  };

  return (
    <div className="p-2">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={
                  preview.startsWith("blob:")
                    ? preview
                    : user?.profilePic
                    ? `${import.meta.env.VITE_API_URL}/${user.profilePic}`
                    : "/default-avatar.png"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="profilePicUpload"
                className={`absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 ${
                  isUploading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <FaCamera />
              </label>
              <input
                type="file"
                id="profilePicUpload"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
                disabled={isUploading}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {isUploading ? "Uploading..." : "Change Profile Picture"}
            </p>
          </div>

          {/* Name & Email (read-only) */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <p className="flex items-center border rounded px-3 py-2 bg-gray-50">
                <FaUser className="text-gray-400 mr-2" />
                {user?.name || "N/A"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="flex items-center border rounded px-3 py-2 bg-gray-50">
                <FaEnvelope className="text-gray-400 mr-2" />
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>


        {/* Right Side - Change Password */}
        <div className="bg-white rounded-xl shadow p-6 space-x-7">
          <h3 className="text-lg font-semibold mb-4">Change Login Password</h3>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <div className="flex items-center border rounded px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full p-2 outline-none"
                />
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <div className="flex items-center border rounded px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2 outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <div className="flex items-center border rounded px-3">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full p-2 outline-none"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700" disabled={isChanging}>
              {isChanging ? "Updating":"Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
