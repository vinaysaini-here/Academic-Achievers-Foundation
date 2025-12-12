import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://avatar.iran.liara.run/public/1" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    is_verified: { type: Boolean, default: false },
    donations: [{ type: mongoose.Types.ObjectId, ref: "donation" }],
    phone: { type: Number },
    address: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
