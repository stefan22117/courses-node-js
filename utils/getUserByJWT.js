import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async (req) => {
  let token = req.cookies.jwt;
  if (token) {
    const userId = jwt.decode(token);
    const user = await User.findOne(userId);

    if (userId && user) {
      return user;
    }
  }
};
