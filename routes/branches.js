import express from "express";
import mongoose from "mongoose";
import { authenticate } from "../middleware/auth.js";
import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import getUserByJWT from "../utils/getUserByJWT.js";

const router = express.Router();

router.get("/", (req, res) => {
  Branch.find().then((branches) => res.json(branches));
});

router.post("/create-branch", (req, res) => {
  Branch.create({
    name: req.body.name,
    courses: [],
  }).then((branch) => res.status(201).json(branch));
});
router.get("/:branch", (req, res) => {
    Branch.findOne(
      {slug:req.params.branch}
      )
    .populate('courses')
    .then((branch) => res.json(branch));
  });
export default router;
