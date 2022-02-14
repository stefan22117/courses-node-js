import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const authenticate = async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("niste ulogovani1");
  }
  const userId = jwt.decode(token);
  const user = await User.findOne(userId).exec();


  if (!userId || !user) {
    return res.status(401).send("niste ulogovani2");
  }
  next();
};

export const authorize = (role) => async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("niste ulogovani");
  }

  const userId = jwt.decode(token);
  const user = await User.findOne(userId).exec();

  if (!userId || !user) {
    res.status(404).send("nema korisnika");
  }
  if (user.role != role) {
    res.status(403).send("niste autorizovani");
  }

  next();
};
