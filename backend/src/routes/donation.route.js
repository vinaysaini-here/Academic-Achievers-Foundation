import express from "express";
const router = express.Router();

import {
  createDonation,
  verifyDonation,
  getAllDonations,
  getDonationById,
  deleteDonation,
  getUserDonations,
  getDonationStats,
  getRecentDonations,
  downloadReceipt,
  getUserDonationsMember,
  getTotalCompletedDonations
} from "../controllers/donation.controller.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import accessTokenAutoRefreshMember from "../middlewares/accessTokenAutoRefreshMember.js";

// ------------------------------------------------
// Donor Routes (User)
// ------------------------------------------------
router.post(
  "/create-order",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  createDonation
);
router.post(
  "/verify-payment",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  verifyDonation
);
router.get(
  "/user/:userId",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getUserDonations
);

// ------------------------------------------------
// Donor Routes (Member)
// ------------------------------------------------
router.post(
  "/member/create-order",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  createDonation
);
router.post(
  "/member/verify-payment",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  verifyDonation
);
router.get(
  "/member/:memberId",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  getUserDonationsMember
);

router.get(
  "/total/:donorId",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  getTotalCompletedDonations
);


router.get(
  "/member/receipt/:id",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  downloadReceipt
);
// ------------------------------------------------
// Public / Recent Donations
// ------------------------------------------------
router.get("/recent-donations", getRecentDonations);

// ------------------------------------------------
// Admin Routes
// ------------------------------------------------
router.get(
  "/all",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getAllDonations
);
router.get(
  "/stats",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getDonationStats
);
router.get(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getDonationById
);
router.delete(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDonation
);
router.get(
  "/receipt/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  downloadReceipt
);

export default router;
