import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";


export const useMemberStore = create((set, get) => ({
  members: [],
  pendingRequest: [],
  isLoading: false,
  isApplying: false,


  // Admin Pages
  getAllMembers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/member/all");
      set({ members: res.data.members, isLoading: false });
    } catch (error) {
      console.error("Error fetching Members:", error);
      toast.error(error.response?.data?.message || "Failed to fetch Members");
      set({ isLoading: false });
    }
  },

  getPendingMembers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/member/pending-request");
      set({ pendingRequest: res.data.members, isLoading: false });
    } catch (error) {
      console.error("Error fetching Requests:", error);
      toast.error(error.response?.data?.message || "Failed to fetch Requests");
      set({ isLoading: false });
    }
  },

  approveMember: async (id) => {
    try {
      const res = await axiosInstance.put(`/api/member/approve/${id}`);
      toast.success(res.data.message);

      // remove approved member from pending list
      const updatedPending = get().pendingRequest.filter((m) => m._id !== id);
      set({ pendingRequest: updatedPending });

      // optional: refresh full members list
      get().getAllMembers();
    } catch (error) {
      console.error("Error approving member:", error);
      toast.error(error.response?.data?.message || "Unable to approve member");
    }
  },

  rejectMember: async (id) => {
    try {
      const res = await axiosInstance.put(`/api/member/reject/${id}`);
      toast.success(res.data.message);

      // remove rejected member from pending list
      const updatedPending = get().pendingRequest.filter((m) => m._id !== id);
      set({ pendingRequest: updatedPending });
    } catch (error) {
      console.error("Error rejecting member:", error);
      toast.error(error.response?.data?.message || "Unable to reject member");
    }
  },

  deleteMember: async (id) => {
    try {
      await axiosInstance.delete(`/api/member/${id}`);
      // Remove member from local state
      const updated = get().members.filter((m) => m._id !== id);
      set({ members: updated });
      toast.success("Member deleted successfully");
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error(error.response?.data?.message || "Failed to delete member");
    }
  },

  // Public Pages
  getApprovedMembers: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/member/approved-members");
      set({ members: res.data.members, isLoading: false });
    } catch (error) {
      console.error("Error fetching Members:", error);
      toast.error(error.response?.data?.message || "Failed to fetch Members");
      set({ isLoading: false });
    }
  },

  becomeMember: async (data) => {
    set({ isApplying: true });
    try {
      const res = await axiosInstance.post("/api/member/apply", data);
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in Applying ", error);
      toast.error( "Failed to Apply. Please try again Later");
    } finally {
      set({ isApplying: false });
    }
  },


  

}));
