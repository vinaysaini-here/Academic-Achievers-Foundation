import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens.js";
import setTokenCookies from "../utils/setTokenCookies.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import UserRefreshTokenModel from "../models/UserRefreshToken.js";
import sendEmailVerificationEmail from "../utils/sendEmailVerificationEmail.js";
import EmailVerificationModel from "../models/emailVerification.js";
import transporter from "../config/emailConfig.js";
// import cloudinary from "../config/cloudinary.js";

// -----------------------------------------------------
// User Signup
// -----------------------------------------------------
export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are Required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(420).json({
        status: "failed",
        message: "User Already exists with this Email.",
      });
    }

    // Hashing a User Password..
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    // Send Email Verifaction Mail with OTP..
    res.status(201).json({
      status: "success",
      message: " SignUp Successful",
      user: { id: newuser._id, email: newuser.email },
    });
    // console.log("SignUp Successful");

    // Sending OTP via Mail
    sendEmailVerificationEmail(req, newuser);
  } catch (error) {
    console.log(error);

    return res
      .status(400)
      .json({ status: "Failed", message: "Failed to signup a User..." });
  }
};

// -----------------------------------------------------
// Verify
// -----------------------------------------------------
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ status: "Falied", message: "All feilds are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "Falied", message: "Email Doesn't Exist" });
    }

    if (existingUser.is_verified) {
      return res
        .status(400)
        .json({ status: "Falied", message: "Email Already Verified" });
    }

    const emailVerification = await EmailVerificationModel.findOne({
      userId: existingUser._id,
      otp,
    });

    if (!emailVerification) {
      if (!existingUser.is_verified) {
        await sendEmailVerificationEmail(req, existingUser);
        return res.status(400).json({
          status: "Falied",
          message: "Invalid OTP , new OTP sent to your Mail",
        });
      }
      return res
        .status(400)
        .json({ status: "Falied", message: "Invalid OTP " });
    }

    const currentTime = new Date();

    const expirationTime = new Date(
      emailVerification.createdAt.getTime() + 10 * 60 * 1000
    );
    if (currentTime > expirationTime) {
      // OTP expired, send new OTP
      await sendEmailVerificationEmail(req, existingUser);
      return res.status(400).json({
        status: "failed",
        message: "OTP expired, new OTP sent to your email",
      });
    }

    // OTP is valid and not expired, mark email as verified
    existingUser.is_verified = true;
    await existingUser.save();

    // Delete email verification document after verification
    await EmailVerificationModel.deleteMany({ userId: existingUser._id });
    return res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Falied",
      message: "Unable to verify Email , Please Try Again Later",
    });
  }
};
// -----------------------------------------------------
// User Login
// -----------------------------------------------------
export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(402).json({
        status: " Failed ",
        message: "Email and Password are Required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Invalid Mail or Password" });
    }

    // Check if User's account is verified..
    if (!user.is_verified) {
      return res.status(401).json({
        status: "Failed",
        message: "Please verify your email to login",
      });
    }

    // Comparing passwords..
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "Failed",
        message: " Invalid Mail or password",
      });
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokens(user);

    setTokenCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profilePic: user.profilePic,
      },
      status: "Success",
      message: "Logged in SuccessFully",
      is_auth: "true",
    });
    // console.log("succeessssssssssssssssssss");
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "Failed ",
      message: " Failed to Login... (Catch Block)",
    });
  }
};

// -----------------------------------------------------
// Get New Access Token - its useless

export const getNewAccessToken = async (req, res) => {
  try {
    // Get new access token using Refresh Token
    const {
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp,
    } = await refreshAccessToken(req, res);

    // Set New Tokens to Cookie
    setTokenCookies(
      res,
      newAccessToken,
      newRefreshToken,
      newAccessTokenExp,
      newRefreshTokenExp
    );

    res.status(200).send({
      status: "success",
      message: "New tokens generated",
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
      access_token_exp: newAccessTokenExp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to generate new token, please try again later",
    });
  }
};

// -----------------------------------------------------
// Get User Profile
// -----------------------------------------------------
export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // hide password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout..
export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const userRefreshToken = await UserRefreshTokenModel.findOne({
      token: refreshToken,
    });

    if (userRefreshToken) {
      // Blacklist the refresh token
      userRefreshToken.blacklisted = true;
      await userRefreshToken.save();
    } else {
      console.log("Refresh token not found in database for blacklisting.");
    }

    // Clear access token and refresh token cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("is_auth");
    res.status(200).json({ status: "success", message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: "failed",
      message: "Unable to logout, please try again later",
    });
  }
};

// -----------------------------------------------------
// Update User ProfilePic..
// -----------------------------------------------------
export const uploadProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // If user already has a profile picture, delete old one
    if (user.profilePic) {
      const oldPath = path.join(process.cwd(), "src", user.profilePic);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        // console.log("Deleted old profile pic:", oldPath);
      }
    }

    // Save new path in DB
    user.profilePic = `uploads/profile_pics/${req.file.filename}`;
    await user.save();

    res.json({ message: "Profile picture updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------------------
// if User wants to change his password after Login..
// -----------------------------------------------------
export const changeUserPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    // Check if both password and confirmPassword are provided
    if (!password || !confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm New Password are required",
      });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm New Password don't match",
      });
    }

    // Generate salt and hash new password
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(password, salt);

    // Update user's password
    await User.findByIdAndUpdate(req.user._id, {
      $set: { password: newHashPassword },
    });

    // Send success response
    res
      .status(200)
      .json({ status: "success", message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to change password, please try again later",
    });
  }
};

// -----------------------------------------------------
// Send a Mail if user forgot his password..
// -----------------------------------------------------
export const sendUserPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email field is required" });
    }
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "Email doesn't exist" });
    }
    // Generate token for password reset
    const secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign({ userID: user._id }, secret, {
      expiresIn: "15m",
    });
    // Reset Link
    const resetLink = `http://localhost:5173/new-password/${user._id}/${token}`;
    // const resetLink = `${process.env.FRONTEND_HOST}/newpassword`;
    // console.log(resetLink);

    // Send password reset email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Hello ${user.name},</p><p>Please <a href="${resetLink}">click here</a> to reset your password.</p>`,
    });
    // Send success response
    res.status(200).json({
      status: "success",
      message: "Password reset email sent. Please check your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Unable to send password reset email. Please try again later.",
    });
  }
};

// --------------------------------------------------------------------------------
// Create a new Password following reset Password link followed via Email..
// --------------------------------------------------------------------------------
export const userPasswordReset = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { id, token } = req.params;

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    // Validate token
    const new_secret = user._id + process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    jwt.verify(token, new_secret);

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New Password and Confirm New Password don't match",
      });
    }

    // Generate salt and hash new password
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(password, salt);

    // Update user's password
    await User.findByIdAndUpdate(user._id, {
      $set: { password: newHashPassword },
    });

    // Send email to user confirming password change

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password Reset Successful",
      html: `<p>Hello ${user.name},</p><p>Your password has been reset successfully.</p>`,
    });

    res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        status: "failed",
        message: "Token expired. Please request a new password reset link.",
      });
    }
    res.status(500).json({
      status: "failed",
      message: "Unable to reset password. Please try again later.",
    });
  }
};

// -----------------------------------------------------
// Update userRole from user to Member..
// -----------------------------------------------------
// export const UpdateUserRole = async (req, res) => {
//   const userId = req.params.id; // Extract user ID from URL parameters

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { role: "member" },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "User role updated to 'author' successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred while updating the user role",
//       error: error.message,
//     });
//   }
// };

export const ContactAdmin = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email is Required" });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // send to your admin email
      subject: "Contact Us - New Message",
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({
      status: "success",
      message: "Your message has been sent successfully",
    });
  } catch (error) {
    console.error("ContactAdmin Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

