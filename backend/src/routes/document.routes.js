import {
  uploadDocument,
  listDocuments,
  deleteDocument,
} from "../controllers/document.controller.js";
import passport from "passport";
import express from "express";
const router = express.Router();
import accessTokenAutoRefresh from "../middlewares/accessTokenAutoRefresh.js";
import {uploadDocument as UD} from "../config/multerConfig.js"


// Public Route
router.get( "/documents",  listDocuments);


router.post(
  "/document",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  UD.single("file"),
  uploadDocument,
  
);

router.delete(
  "/documents/:id",
  accessTokenAutoRefresh,
  passport.authenticate("jwt", { session: false }),
  deleteDocument
);

export default router;
