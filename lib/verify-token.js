import jwt from "jsonwebtoken";

export async function verifyToken(jwtToken) {
  if (jwtToken) {
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const userId = decodedToken?.issuer;
    return userId;
  }
  return null;
}
