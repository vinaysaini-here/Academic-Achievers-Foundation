import Member from "../models/memberModel.js";
import MemberRefreshTokenModel from "../models/MemberRefreshToken.js";
import generateTokensMember from "./generateTokens-member.js";
import verifyRefreshTokenMember from "./verifyRefreshTokenMember.js";

const refreshAccessTokenMember = async (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken) throw new Error("No Refresh Token Provided");

    //   const { tokenDetails } = await verifyRefreshTokenMember(oldRefreshToken);
    const { tokenDetails, error, message } = await verifyRefreshTokenMember(
      oldRefreshToken
    );

    if (error) {
      throw new Error(message); // pass the real message up
    }

    const user = await Member.findById(tokenDetails.id);
    if (!user) throw new Error("User not Found");

    const userRefreshToken = await MemberRefreshTokenModel.findOne({
      MemberId: tokenDetails.id,
    });

    if (
      !userRefreshToken ||
      oldRefreshToken !== userRefreshToken.token ||
      userRefreshToken.blacklisted
    ) {
      throw new Error("Unauthorized Access  (memberFile)");
    }

    const { accessToken, refreshToken, accessTokenExp, refreshTokenExp } =
      await generateTokensMember(user);

    return {
      newAccessToken: accessToken,
      newRefreshToken: refreshToken,
      newAccessTokenExp: accessTokenExp,
      newRefreshTokenExp: refreshTokenExp,
    };
  } catch (error) {
    console.error("Error in RefreshAccessToken (memberFile):", error.message);
    throw error;
  }
};

export default refreshAccessTokenMember;
