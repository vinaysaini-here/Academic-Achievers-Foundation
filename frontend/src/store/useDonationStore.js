import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const useDonationStore = create((set) => ({
  donations: [],
  recentDonations: [],
  monthlyStats: [],
  totals: {},
  totalDonations:0,
  loading: false,
  error: null,
  isDonating: false,
  isLoading: false,
  isDownloading: false,

  donate: async (formData, userId) => {
    set({ isDonating: true });
    try {
      const { data: res } = await axiosInstance.post(
        "/api/donation/create-order",
        {
          donorId: userId,
          amount: formData.amount,
          paymentMethod: formData.paymentMethod,
          phone: formData.phone,
          address: formData.address,
        },
        { withCredentials: true }
      );

      const { order } = res;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My NGO",
        description: "Donation towards NGO",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment with backend
            const verifyRes = await axiosInstance.post(
              "/api/donation/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // amount: formData.amount,
              }
            );

            if (verifyRes.data.success) {
              toast.success(" Donation successful! Receipt generated.");
            } else {
              toast.error(" Payment verification failed.");
              console.log();
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Verification failed.");
          }
        },
        theme: {
          color: "#2563eb",
        },
      };

      // 4️⃣ Open Razorpay popup
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      set({ isDonating: false });
    }
  },

  getAllDonations: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/donation/all");
      set({ donations: res.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to fetch donations");
      set({ isLoading: false });
    }
  },

  getRecentDonations: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/donation/recent-donations");
      set({ recentDonations: res.data.donations, isLoading: false });
    } catch (error) {
      console.error("Error fetching donations:", error);
      toast.error("Failed to fetch donations");
      set({ isLoading: false });
    }
  },

  getUserDonations: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/api/donation/user/${userId}`);
      set({ donations: res.data.donations, isLoading: false });
    } catch (error) {
      console.error("Error fetching user donations:", error);
      toast.error("Failed to fetch donations");
      set({ isLoading: false });
    }
  },

  downloadReceipt: async (donationId) => {
    set({ isDownloading: true });
    try {
      const res = await axiosInstance.get(
        `/api/donation/receipt/${donationId}`,
        {
          responseType: "blob", // important for file download
        }
      );

      // Create blob link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${donationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Receipt downloaded");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download receipt"
      );
    } finally {
      set({ isDownloading: false });
    }
  },

  getDashboardStats: async () => {
    try {
      const res = await axiosInstance.get("/api/donation/stats");
      set({
        monthlyStats: res.data.monthlyStats,
        totals: res.data.totals,
      });
    } catch (error) {
      console.error("Error fetching donation stats:", error);
      toast.error("Failed to fetch donation stats");
    }
  },

  donateMember: async (formData, userId) => {
    set({ isDonating: true });
    try {
      const { data: res } = await axiosInstance.post(
        "/api/donation/member/create-order",
        {
          donorId: userId,
          amount: formData.amount,
          paymentMethod: formData.paymentMethod,
          phone: formData.phone,
          address: formData.address,
        },
        { withCredentials: true }
      );

      const { order } = res;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My NGO",
        description: "Donation towards NGO",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment with backend
            const verifyRes = await axiosInstance.post(
              "/api/donation/member/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                // amount: formData.amount,
              }
            );

            if (verifyRes.data.success) {
              toast.success(" Donation successful! Receipt generated.");
            } else {
              toast.error(" Payment verification failed.");
              console.log();
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Verification failed.");
          }
        },
        theme: {
          color: "#2563eb",
        },
      };

      // 4️⃣ Open Razorpay popup
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      set({ isDonating: false });
    }
  },

  getMemberDonations: async (memberId) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/api/donation/member/${memberId}`);
      set({ donations: res.data.donations, isLoading: false });
      // console.log(res.data);
      
    } catch (error) {
      console.error("Error fetching user donations:", error);
      toast.error("Failed to fetch donations");
      set({ isLoading: false });
    }
  },


  downloadReceiptMember: async (donationId) => {
    set({ isDownloading: true });
    try {
      const res = await axiosInstance.get(
        `/api/donation/member/receipt/${donationId}`,
        {
          responseType: "blob", // important for file download
        }
      );

      // Create blob link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${donationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Receipt downloaded");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to download receipt"
      );
    } finally {
      set({ isDownloading: false });
    }
  },



  fetchTotalDonations: async (donorId) => {
    try {
      set({ loading: true, error: null });

      const res = await axiosInstance.get(`/api/donation/total/${donorId}`);

      set({
        totalDonations: res.data.total || 0,
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching total donations:", err);
      set({
        error: err.response?.data?.message || "Failed to fetch total donations",
        loading: false,
      });
    }
  },
}));
