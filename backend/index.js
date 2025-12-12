import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path"
import { connectDB } from "./src/config/connectDB.js";
import userRoutes from "./src/routes/auth.routes.js";
import donarRoutes from "./src/routes/donation.route.js";
import memberRoutes from "./src/routes/member.routes.js";
import documentRoutes from "./src/routes/document.routes.js"
import "./src/config/passport-jwt-strategy.js";
import "./src/config/googleStrategy.js";
import setTokensCookies from "./src/utils/setTokenCookies.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());

// Database Connection..

connectDB();

// Routes..

app.use("/api/user", userRoutes);
app.use("/api/donation", donarRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/document",documentRoutes)





app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/signin",
  }),
  (req, res) => {
    // console.log("Google OAuth Callback Triggered");

    if (!req.user) {
      console.error(" Google Authentication Failed");
      return res.redirect("http://localhost:5173/signin");
    }

    // console.log(" User Authenticated:", req.user);

    // Set cookies for authentication
    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

    res.redirect("http://localhost:5173/");
  }
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
