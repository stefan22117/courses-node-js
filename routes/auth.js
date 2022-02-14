import express from "express";
import Models from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticate, authorize } from "../middleware/auth.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

const router = express.Router();

router.get("/", authorize("admin"), (req, res) => {
  Models.User.find()
    .select("-_id -__v -password")
    .then((users) => res.send(users));
});

router.get("/check-email/:email", async (req, res) => {
  const emailCount = await Models.User.find({ email: req.params.email })
    .count()
    .exec();
  return res.send(!emailCount);
});
router.get("/check-username/:name", async (req, res) => {
  const nameCount = await Models.User.find({ name: req.params.name })
    .count()
    .exec();
  return res.send(!nameCount);
});

router.post("/register", async (req, res) => {
  const usersCount = await Models.User.count().exec();
  const userExists = await Models.User.find({email:req.body.email}).count().exec();
  console.log(userExists);
  if(!userExists){
    Models.User.create({
      name: req.body.name,
      email: req.body.email,
      role: !usersCount ? "admin" : undefined,
      password: await bcrypt.hash(req.body.password, 10),
    }).then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET || "secret"
      );
  
      res.cookie("jwt", token);
      res.status(201).send(user);
    });
  }
  else{
    console.log('user exists');
    res.status(500).send('user already exists');
  }
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email })
  .then((user) => {

    if (!user) {
      res.status(404).send("nema korisnika");
    } else {
      bcrypt.compare(req.body.password, user.password)
      .then((result) => {
        if (result) {
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET || "secret"
          );

          res.cookie("jwt", token);

          User.findOne(user).select('-id -password')
          .then(user=>res.send(user))

        } else {
          res.status(401).send("wrong pass");
        }
      });
    }
  });
});

router.get("/get-logged-user", (req, res) => {
  let token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send("niste ulogovani1");
  }
  const userId = jwt.decode(token);
  User.findOne(userId).select("-password").then((user) => {
    if (!user) {
      res.status(404).send("nema korisnika");
    } else {
      res.status(200).send(user);
    }
  });
});

router.get("/logout", authenticate, (req, res) => {
  console.log("logout");
  res.clearCookie("jwt").send("you are logged out");
});

export default router;
