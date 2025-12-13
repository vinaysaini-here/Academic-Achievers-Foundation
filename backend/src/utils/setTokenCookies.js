// const setTokensCookies = (res, accessToken, refreshToken, newAccessTokenExp, newRefreshTokenExp) => {
  
//   newAccessTokenExp = Math.floor(Date.now() / 1000) +   60 * 60; // Set to 1 minute
//   newRefreshTokenExp = Math.floor(Date.now() / 1000) + 5 * 24 * 60 * 60; // Set to 5 days 

//   const accessTokenMaxAge = (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
//   const refreshTokenmaxAge = (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

//   // Set Cookie for Access Token
//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: true,
//     sameSite: "None",
//     maxAge: accessTokenMaxAge, 
//   });

//   // Set Cookie for Refresh Token
//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: true, // Set to true if using HTTPS
//     sameSite: "None",
//     maxAge: refreshTokenmaxAge,
//   });

//   // Set Cookie for is_auth
//   res.cookie("is_auth", true, {
//     httpOnly: false,
//     secure: true, // Set to true if using HTTPS
//     maxAge: refreshTokenmaxAge,
//   });
// };

// export default setTokensCookies;

const setTokensCookies = (res, accessToken, refreshToken) => {
  const accessTokenExp =
    Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour

  const refreshTokenExp =
    Math.floor(Date.now() / 1000) + 5 * 24 * 60 * 60; // 5 days

  const accessTokenMaxAge =
    (accessTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  const refreshTokenMaxAge =
    (refreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  // Access Token Cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: accessTokenMaxAge,
  });

  // Refresh Token Cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: refreshTokenMaxAge,
  });

  // Auth Flag Cookie (IMPORTANT FIX)
  res.cookie("is_auth", "true", {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    maxAge: refreshTokenMaxAge,
  });
};

export default setTokensCookies;
