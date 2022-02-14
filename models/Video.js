import mongoose from "mongoose";
import Branch from "./Branch.js";
import Course from "./Course.js";
import User from "./User.js";
import { getVideoDurationInSeconds } from 'get-video-duration';

const videoSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    duration: Number,
    snapshot:Number,
    description: String,
    path:String,
    demo:Boolean, //if demo, moze se gledati bez da je kurs kupljen
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true }
);

videoSchema.pre("save", async function (next) {
  const course = await Course.findById(this.course)
  .populate("branch")
  .populate("author");
  let usersDir = `./client/public/courses/${course.author.name}/${course.branch.slug}/${course.slug}/videos`;
  this.duration = await getVideoDurationInSeconds(usersDir + "/" + this.path)
  next();
});

videoSchema.post("save", async (doc) => {
  const course = await Course.findOne({ _id: doc.course });

  if (course && !course.videos.includes(doc._id)) {
    course.videos.push(doc._id);
    await course.save();
  }
 
});


videoSchema.post("remove", async (doc) => {
  const course = await Course.findOne({ _id: doc.course });

  if (course && course.videos.includes(doc._id)) {
    course.videos =  course.videos.filter(x=>x._id !== doc._id);
    await course.save();
  }
 
});




export default mongoose.model("Video", videoSchema);
