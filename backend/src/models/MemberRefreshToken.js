import mongoose from "mongoose";

// Defining Schema
const userRefreshTokenSchema = new mongoose.Schema({
  MemberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  token: { type: String, required: true },
  blacklisted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: '5d' }
});

// Model
const MemberRefreshTokenModel = mongoose.model("MemberRefreshToken", userRefreshTokenSchema);

export default MemberRefreshTokenModel;