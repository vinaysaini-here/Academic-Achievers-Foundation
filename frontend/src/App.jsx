import React, { useEffect, useState } from "react";
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";

import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Members from "./pages/Members";
import Documents from "./pages/Documents";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Signup from "./pages/AuthPages/Signup";
import SingInPg from "./pages/AuthPages/SingInPg";
import AdmDashboard from "./pages/AdmDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminMembers from "./components/Admin/AdminMembers";
import AdminDoc from "./components/Admin/AdminDoc";
import AdminDonations from "./components/Admin/AdminDonations";
import AdminSetting from "./components/Admin/AdminSetting";
import MemberRequests from "./components/Admin/MemberRequests";
import MemDashboard from "./pages/MemDashboard";
import MemberDonationHistory from "./components/Member/MemberDonationHistory";
import MemberIDCard from "./components/Member/MemberIDCard";
import MemberOverview from "./components/Member/MemberOverview";
import MemberSettings from "./components/Member/MemberSettings";
import Donation from "./pages/Donation";
import JoinUs from "./pages/JoinUs";
import EmailVerification from "./pages/EmailVerification";
import Userdashboard from "./pages/Userdashboard";
import UserOverview from "./components/User/UserOverview";
import UserDonations from "./components/User/UserDonations";
import UserSettings from "./components/User/UserSettings";
import LoginAsMember from "./pages/LoginAsMember";
import ResetPassword from "./pages/AuthPages/ResetPassword";
import CodeRecived from "./pages/AuthPages/CodeRecived";
import NewPassword from "./pages/AuthPages/NewPassword";
import Projects from "./pages/Projects";
import AdminProjects from "./components/Admin/AdminProjects";

const ProtectedRoute = ({ element, allowedFor, user, member, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium text-gray-700">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user && !member) return <Navigate to="/signin" replace />;

  if (allowedFor === "admin" && user?.role === "admin") return element;
  if (allowedFor === "user" && user?.role === "user") return element;
  if (allowedFor === "member" && member) return element;
  if (allowedFor === "donate" && (user?.role === "user" || member))
    return element;

  return <Navigate to="/" replace />;
};

const App = () => {
  const { checkAuth, user, member } = useAuthStore();
  const [loading, setLoading] = useState(true); // local loading

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth(); // call your store method
      setLoading(false); // stop loading after auth check
    };
    fetchAuth();
  }, [checkAuth]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* AUTH ROUTES */}
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<SingInPg />} />
        <Route path="member-signin" element={<LoginAsMember />} />
        <Route path="verify-email" element={<EmailVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="code-recived" element={<CodeRecived />} />
        <Route path="new-password/:id/:token" element={<NewPassword />} />

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="members" element={<Members />} />
          <Route path="documents" element={<Documents />} />
          <Route path="projects" element={<Projects/>} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="joinus" element={<JoinUs />} />

          {/* DONATION ROUTE */}
          <Route
            path="donation"
            element={
              <ProtectedRoute
                user={user}
                member={member}
                loading={loading}
                allowedFor="donate"
                element={<Donation />}
              />
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="admin"
            element={
              <ProtectedRoute
                user={user}
                member={member}
                loading={loading}
                allowedFor="admin"
                element={<AdmDashboard />}
              />
            }
          >
            <Route path="/admin/" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route
              path="/admin/members/requests"
              element={<MemberRequests />}
            />
            <Route path="/admin/document" element={<AdminDoc />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/donations" element={<AdminDonations />} />
            <Route path="/admin/settings" element={<AdminSetting />} />
          </Route>

          {/* MEMBER ROUTES */}
          <Route
            path="member"
            element={
              <ProtectedRoute
                user={user}
                member={member}
                loading={loading}
                allowedFor="member"
                element={<MemDashboard />}
              />
            }
          >
            <Route path="/member/" element={<MemberOverview />} />
            <Route path="/member/overview" element={<MemberOverview />} />
            <Route
              path="/member/donationhistory"
              element={<MemberDonationHistory />}
            />
            <Route path="/member/setting" element={<MemberSettings />} />
            <Route path="/member/idcard" element={<MemberIDCard />} />
          </Route>

          {/* USER ROUTES */}
          <Route
            path="user"
            element={
              <ProtectedRoute
                user={user}
                member={member}
                loading={loading}
                allowedFor="user"
                element={<Userdashboard />}
              />
            }
          >
            <Route path="/user/" element={<UserOverview />} />
            <Route path="/user/overview" element={<UserOverview />} />
            <Route path="/user/Donation" element={<UserDonations />} />
            <Route path="/user/setting" element={<UserSettings />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
