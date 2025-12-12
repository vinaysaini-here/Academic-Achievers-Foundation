import isTokenExpired from "../utils/isTokenExpired.js";
import setTokensCookies from "../utils/setTokenCookies.js";
import refreshAccessTokenMember from "../utils/refreshAccessTokenMember.js";



const accessTokenAutoRefreshMember = async (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;
  
      if (
        accessToken &&
        !isTokenExpired(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET_KEY)
      ) {
        req.headers["authorization"] = `Bearer ${accessToken}`;
      } else {
        const refreshToken = req.cookies.refreshToken;
  
        if (!refreshToken) {
          throw new Error("Refresh token is missing");
        }
  
        const {
          newAccessToken,
          newRefreshToken,
          newAccessTokenExp,
          newRefreshTokenExp,
        } = await refreshAccessTokenMember(req, res);
  
        // Set new tokens in cookies
        setTokensCookies(
          res,
          newAccessToken,
          newRefreshToken,
          newAccessTokenExp,
          newRefreshTokenExp
        );
  
        // Add the new access token to the Authorization header
        req.headers["authorization"] = `Bearer ${newAccessToken}`;
      }
  
      // Proceed with the next middleware
      next();
    } catch (error) {
      console.error("Error adding access token to header  (memberFile):", error.message);
  
      res.status(401).json({
        error: "Unauthorized",
        message: "Access token is missing or invalid",
      });
    }
  };
  
  export default accessTokenAutoRefreshMember;
  