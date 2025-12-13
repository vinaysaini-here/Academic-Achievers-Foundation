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
//   origin: ["http://localhost:5173","https://academic-achievers-foundation1.netlify.app"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));
// app.options("/*", cors(corsOptions));
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



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import path from "path";
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

/* ---------------- PATH SETUP ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- CORS CONFIG ---------------- */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://academic-achievers-foundation1.netlify.app",
    "https://academic-achievers-foundation-1.onrender.com",
    "https://academic-achievers-foundation-2.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

/* ---------------- MIDDLEWARES ---------------- */
app.use(express.json());
app.use(cors(corsOptions));          // enable CORS
app.use(cookieParser());
app.use(passport.initialize());

/* ----------- STATIC FILES -------------------- */
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "src/uploads"))
);

/* ---------------- DATABASE ------------------- */
connectDB();

/* ---------------- ROUTES --------------------- */
app.use("/api/user", userRoutes);
app.use("/api/donation", donarRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/document", documentRoutes);

/* ---------------- GOOGLE AUTH ---------------- */
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
    if (!req.user) {
      return res.redirect("http://localhost:5173/signin");
    }

    const {
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp,
    } = req.user;

    setTokensCookies(
      res,
      accessToken,
      refreshToken,
      accessTokenExp,
      refreshTokenExp
    );

    res.redirect("http://localhost:5173/");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}


/* ---------------- SERVER --------------------- */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
