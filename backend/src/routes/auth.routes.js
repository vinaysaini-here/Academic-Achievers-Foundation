import express from "express";
const router = express.Router();
import {
  SignUp,
  LogIn,
  verifyEmail,
  getNewAccessToken,
  userProfile,
  Logout,
  uploadProfile,
  changeUserPassword,
  sendUserPasswordResetEmail,
  userPasswordReset,
  ContactAdmin,
  // UpdateUserRole,
} from "../controllers/auth.controller.js";
import passport from "passport";
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import { uploadProfilePic } from "../config/multerConfig.js";

// -----------------------------------------------------
// Public Routes..
// -----------------------------------------------------

router.post("/signup", SignUp);
router.post("/login", LogIn);
router.post("/verify-email", verifyEmail);
router.post("/get-new-access-token", getNewAccessToken);
router.post("/reset-password-link", sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", userPasswordReset);

// -----------------------------------------------------
// Protected Routes..
// -----------------------------------------------------

router.get(
  "/user-profile",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  userProfile
);
router.post(
  "/logout",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  Logout
);

router.put(
  "/change-password",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  changeUserPassword
);
// router.post(
//   "/update-role",
//   accessTokenAutoRefresh,
//   passport.authenticate("jwt", { session: false }),
//   UpdateUserRole
// );
router.post(
  "/upload/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  uploadProfilePic.single("profilePic"),
  uploadProfile
);

router.post(
  "/contact", ContactAdmin
);

export default router;
