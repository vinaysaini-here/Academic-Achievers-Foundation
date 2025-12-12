import { create } from "zustand";
import axiosInstance from "../lib/axios";

import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  member: null,
  isAuthenticated: false,
  isSignup: false,
  setOtp: false,
  isLogin: false,
  isUploading: false,
  isChanging: false,
  setnewPassword: false,
  isSending:false,
  isContacting:false,

  checkAuth: async () => {
    if (Cookies.get("is_auth") !== "true") {
      set({ user: null, member: null, isAuthenticated: false });
      return;
    }

    try {
      // 1. Try fetching user profile
      const userRes = await axiosInstance.get("/api/user/user-profile", {
        withCredentials: true,
      });

      if (userRes.data?.user) {
        set({
          user: userRes.data.user,
          member: null,
          isAuthenticated: true,
        });
        return;
      }
    } catch (err) {
      console.log("Not a user, trying member...");
    }

    try {
      // 2. If not user, try fetching member profile
      const memberRes = await axiosInstance.get("/api/member/member-profile", {
        withCredentials: true,
      });

      if (memberRes.data?.member) {
        set({
          member: memberRes.data.member,
          user: null,
          isAuthenticated: true,
        });
        return;
      }
    } catch (err) {
      console.log("Not a member either.");
    }

    // 3. If both fail → logged out
    set({ user: null, member: null, isAuthenticated: false });
  },

  signup: async (data) => {
    set({ isSignup: true });
    try {
      const response = await axiosInstance.post("/api/user/signup", data);
      set({ user: response.data });

      toast.success("Signup Successful");
    } catch (error) {
      // toast.error(error.response.data.message);
      toast.error("Signup Failed");
    } finally {
      set({ isSignup: false });
    }
  },

  verifyEmail: async (data) => {
    set({ setOtp: true });
    try {
      const response = await axiosInstance.post("/api/user/verify-email", data);
      set({ user: response.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ setOtp: false });
    }
  },

  // Login
  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/api/user/login", data, {
        withCredentials: true,
      });

      // Check if the 'is_auth' cookie is set
      if (Cookies.get("is_auth") === "true") {
        set({ user: res.data?.user, isAuthenticated: true });
        toast.success("Logged in successfully");
      } else {
        set({ isAuthenticated: false });
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLogin: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/user/logout");

      // Remove cookies related to authentication
      Cookies.remove("is_auth");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Reset authentication state in Zustand
      set({ user: null, isAuthenticated: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  },

  uploadProfilePic: async (userId, file) => {
    set({ isUploading: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.post(
        `/api/user/upload/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set({ user: res.data.user });
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload picture");
    } finally {
      set({ isUploading: false });
    }
  },

  memberLogin: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post("/api/member/member-signin", data, {
        withCredentials: true,
      });

      // Check if the 'is_auth' cookie is set
      if (Cookies.get("is_auth") === "true") {
        set({ member: res.data?.member, isAuthenticated: true });
        toast.success("Logged in successfully");
      } else {
        set({ isAuthenticated: false });
      }

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to log in.");
    } finally {
      set({ isLogin: false });
    }
  },

  uploadProfilePicMember: async (memberId, file) => {
    set({ isUploading: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axiosInstance.post(
        `/api/member/upload/${memberId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set({ member: res.data.member });
      // console.log(res.data);

      toast.success("Profile picture updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload picture");
    } finally {
      set({ isUploading: false });
    }
  },

  memberlogout: async () => {
    try {
      await axiosInstance.post("/api/member/member/logout");

      // Remove cookies related to authentication
      Cookies.remove("is_auth");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Reset authentication state in Zustand
      set({ member: null, isAuthenticated: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out.");
    }
  },

  changepassword: async (data) => {
    set({ isChanging: true });
    try {
      await axiosInstance.put(
        "/api/user/change-password",
        data, 
        { withCredentials: true } 
      );
      toast.success("Password Changed Successfully");
    } catch (error) {
      console.log("Error", error);
      toast.error("Request Failed.. Please try Later");
    } finally {
      set({ isChanging: false });
    }
  },

  
  memberchangepassword: async (data) => {
    set({ isChanging: true });
    try {
      await axiosInstance.put(
        "/api/member/change-password",
        data, 
        { withCredentials: true } 
      );
      toast.success("Password Changed Successfully");
    } catch (error) {
      console.log("Error", error);
      toast.error("Request Failed.. Please try Later");
    } finally {
      set({ isChanging: false });
    }
  },

  forgetPasswordEmailCheck: async (data) => {
    set({setOtp:true})
    try {
      await axiosInstance.post("/api/user/reset-password-link", data);
      toast.success("Reset password link sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send link.");
    }finally{
      set({setOtp:false})
    }
  },
// Reseting a password if user forgot password 
  newPassword: async (id, token, data) => {
    set({setnewPassword:true})
    try {
      await axiosInstance.post(`/api/user/reset-password/${id}/${token}`, data);
      toast.success("Password reset successfully! Please log in.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }finally{
      set({setnewPassword:false})
    }
  },


  contactAdmin : async(data) =>{
    set({isContacting:true})
    try {
      const res = await axiosInstance.post("/api/user/contact", data);
      toast.success("Response Sent..")
    } catch (error) {
      console.log("Error : ", error);  
      toast.error("Error in Contacting to Admin")  
    }finally{
      set({isContacting:false})
    }
  },

  
}));
