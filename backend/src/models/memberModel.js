import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password:{type: String },
    phone: { type: String },
    address: { type: String },
    profilePic: { type: String, default: "https://avatar.iran.liara.run/public/1" },
    donations: [{ type: mongoose.Types.ObjectId, ref: "donation" }],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    joinedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);
export default Member;
