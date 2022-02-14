import mongoose from "mongoose";
import Branch from "./Branch.js";
import User from "./User.js";
import Video from "./Video.js";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    slug: {
        type: String,
        // unique:true
    },
    description: String,
    thumbnail: String,
    price: Number,
    branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    buyers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

courseSchema.pre("save", async function (next) {
    if(!this.slug){
        this.slug = this.title.toLowerCase().replace(" ", "-");
    }
  next();
});

courseSchema.post("save", async (doc) => {
  const branch = await Branch.findOne({ _id: doc.branch });

  if (branch && !branch.courses.includes(doc._id)) {
    branch.courses.push(doc._id);
    await branch.save();
  }
  const author = await User.findOne({ _id: doc.author });

  if (author && !author.courses.includes(doc._id)) {
    author.courses.push(doc._id);
    await author.save();
  }
});

export default mongoose.model("Course", courseSchema);
