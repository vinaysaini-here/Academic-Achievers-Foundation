// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import passport from "passport";
// import path from "path"
// import { fileURLToPath } from "url"; 
// import { connectDB } from "./src/config/connectDB.js";
// import userRoutes from "./src/routes/auth.routes.js";
// import donarRoutes from "./src/routes/donation.route.js";
// import memberRoutes from "./src/routes/member.routes.js";
// import documentRoutes from "./src/routes/document.routes.js"
// import "./src/config/passport-jwt-strategy.js";
// import "./src/config/googleStrategy.js";
// import setTokensCookies from "./src/utils/setTokenCookies.js";
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const corsOptions = {
//   origin: ["http://localhost:5173","https://academic-achievers-foundation.onrender.com/"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use(passport.initialize());

// // Database Connection..

// connectDB();

// // Routes..

// app.use("/api/user", userRoutes);
// app.use("/api/donation", donarRoutes);
// app.use("/api/member", memberRoutes);
// app.use("/api/document",documentRoutes)





// app.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     session: false,
//     scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "http://localhost:5173/signin",
//   }),
//   (req, res) => {
//     // console.log("Google OAuth Callback Triggered");

//     if (!req.user) {
//       console.error(" Google Authentication Failed");
//       return res.redirect("http://localhost:5173/signin");
//     }

//     // console.log(" User Authenticated:", req.user);

//     // Set cookies for authentication
//     const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
//     setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

//     res.redirect("http://localhost:5173/");
//   }
// );



// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//   });
// }

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is Running on Port ${PORT}`);
// });


// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./src/config/connectDB.js";
import userRoutes from "./src/routes/auth.routes.js";
import donarRoutes from "./src/routes/donation.route.js";
import memberRoutes from "./src/routes/member.routes.js";
import documentRoutes from "./src/routes/document.routes.js";
import "./src/config/passport-jwt-strategy.js";
import "./src/config/googleStrategy.js";
import setTokensCookies from "./src/utils/setTokenCookies.js";

dotenv.config();

const app = express();
app.use(express.json());

// compute __filename / __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple CSP middleware (pragmatic - allows blob: scripts used by some bundlers)
// If you want a stricter policy later, replace this with helmet() and nonces/hashes.
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' blob:; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data:; " +
      "connect-src 'self';"
  );
  next();
});

// Serve uploads (use __dirname for reliable paths)
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// FRONTEND_ORIGIN env var recommended (set to production frontend URL)
// Example: FRONTEND_ORIGIN=https://academic-achievers-foundation.onrender.com
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// CORS config
const corsOptions = {
  origin: [FRONTEND_ORIGIN, "http://localhost:5173"].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());

// Database Connection
connectDB();

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/donation", donarRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/document", documentRoutes);

// OAuth routes (use FRONTEND_ORIGIN so redirects work in production)
app.get(
  "/auth/google",
  passport.authenticate("google", { session: false, scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${FRONTEND_ORIGIN}/signin` }),
  (req, res) => {
    if (!req.user) {
      console.error("Google Authentication Failed");
      return res.redirect(`${FRONTEND_ORIGIN}/signin`);
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } = req.user;
    setTokensCookies(res, accessToken, refreshToken, accessTokenExp, refreshTokenExp);

    return res.redirect(FRONTEND_ORIGIN + "/");
  }
);

// Production static serving — robust check + safe catch-all
if (process.env.NODE_ENV === "production") {
  // candidate paths (case-sensitive). Adjust if your frontend folder is named differently.
  const tryPaths = [
    path.join(__dirname, "../frontend/dist"),
    path.join(__dirname, "../Frontend/dist"),
    path.join(__dirname, "../client/dist"),
    path.join(__dirname, "../dist"),
  ];

  let frontendDist = null;
  for (const p of tryPaths) {
    console.log("DEBUG: checking for frontend dist at:", p, "exists?", fs.existsSync(p));
    if (fs.existsSync(p)) {
      frontendDist = p;
      break;
    }
  }

  if (frontendDist) {
    console.log("DEBUG: serving frontend from:", frontendDist);
    app.use(express.static(frontendDist));

    // Use '/*' to avoid path-to-regexp '*' parsing errors in some router versions
    app.get("/*", (req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"));
    });

    // Error handler for static serving
    app.use((err, req, res, next) => {
      console.error("STATIC SERVE ERROR:", err && err.stack ? err.stack : err);
      res.status(500).send("Server error while serving frontend.");
    });
  } else {
    console.error("ERROR: No frontend 'dist' found in any of:", tryPaths);
    app.get("/", (req, res) => {
      res.status(500).send(
        "<h1>Frontend build missing</h1><p>Server could not find the frontend 'dist' folder. Check server logs.</p>"
      );
    });
    app.get("*", (req, res) => {
      res.status(404).send("Frontend build not found on server. See logs.");
    });
  }
}

// PORT binding - ensure Render detects it by binding to 0.0.0.0
const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is Running on Port ${PORT} and bound to 0.0.0.0`);
});
