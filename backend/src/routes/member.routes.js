import express from "express";
const router = express.Router();

import {
  applyForMembership,
  approveMember,
  rejectMember,
  getAllMembers,
  getApprovedMembers,
  getPendingMembers,
  deleteMember,
  MemberLogIn,
  memberProfile,
  uploadProfile,
  MemberLogout,
  changeUserPassword
} from "../controllers/member.controller.js";

import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import accessTokenAutoRefreshMember from "../middlewares/accessTokenAutoRefreshMember.js";
import { uploadProfilePic } from "../config/multerConfig.js";

// ---------------------------------------
// Public Routes
// ---------------------------------------
router.post("/apply", applyForMembership);
router.post("/member-signin", MemberLogIn);
router.get("/approved-members", getApprovedMembers);


// ---------------------------------------
// Protected Routes (Admin Only)
// ---------------------------------------
router.get(
  "/all",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getAllMembers
);

router.get(
  "/pending-request",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  getPendingMembers
);

router.put(
  "/approve/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  approveMember
);

router.put(
  "/reject/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  rejectMember
);

router.delete(
  "/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteMember
);


router.get(
  "/member-profile",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  memberProfile
);


router.post(
  "/upload/:id",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  uploadProfilePic.single("profilePic"),
  uploadProfile
);


router.post(
  "/member/logout",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  MemberLogout
);

router.put(
  "/change-password",
  accessTokenAutoRefreshMember,
  passport.authenticate("member-jwt", { session: false }),
  changeUserPassword
);

export default router;
