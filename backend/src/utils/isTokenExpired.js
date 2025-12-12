import jwt from "jsonwebtoken"
const isTokenExpired = (token, secret) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwt.verify(token, secret); // Verify token and decode it
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (err) {
    // If the token is invalid or expired, `jwt.verify` will throw an error
    return true;
  }
}

export default isTokenExpired