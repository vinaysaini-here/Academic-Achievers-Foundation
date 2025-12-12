import jwt from "jsonwebtoken";
import MemberRefreshTokenModel from "../models/MemberRefreshToken.js"


const generateTokensMember = async (user) => {
    try {
      if (!user) throw new Error("User Not found in file generateTokens (memberFile)");
  
      const payload = { id: user._id, roles: user.roles }; // use `id` consistently everywhere
  
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });
  
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: "5d",
      });
  
      // FIX: correct field name
      await MemberRefreshTokenModel.deleteMany({ MemberId: user._id });
  
      await new MemberRefreshTokenModel({
        MemberId: user._id,
        token: refreshToken,
      }).save();
  
      return {
        accessToken,
        refreshToken,
        accessTokenExp: Math.floor(Date.now() / 1000) + 60, // 1 min
        refreshTokenExp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5, // 5 days
      };
    } catch (error) {
      console.error("Error in generating Tokens  (memberFile) : ", error.message);
      throw error;
    }
  };
  

export default generateTokensMember;