import express from "express";
import Branch from "../models/Branch.js";
import Course from "../models/Course.js";
import formidable from "formidable";
import fs from "fs";
import Video from "../models/Video.js";
import getUserByJWT from "../utils/getUserByJWT.js";
const router = express.Router();


router.get(`/:branch/:slug`, (req, res) => {
  Branch.findOne({ slug: req.params.branch })
    .populate({
      path: "courses",
      match: {
        slug: req.params.slug,
      },
    })
    .then((branch) => {
      let _course = branch.courses[0];
      Course.findById(_course._id)
        .populate("branch")
        .populate("author")
        .populate("videos")
        .then((course) => res.json(course));
    });
});

router.post("/create-course", async (req, res) => {
  let author = await getUserByJWT(req);
  let branch = await Branch.findOne({ slug: req.body.branch });

  let course = await Course.create({
    ...req.body,
    author: author._id,
    branch: branch._id,
  });

  Course.findById(course._id)
    .populate("branch")
    .then((_course) => res.json(_course));
});

router.get("/created", async (req, res) => {

  console.log(1)
  const user = await getUserByJWT(req);
  console.log(2)
  
  if (!user?._id) {
    return res.send(403);
  }
  console.log(3)

  Course.find({ author: user?._id })
  .populate("branch")
  .then((courses) =>{
    console.log(courses)
    console.log(4)
    res.json(courses)});
});

router.patch("/update-thumbnail/:course_id", async (req, res) => {
  const course = await Course.findById(req.params.course_id)
    .populate("branch")
    .populate("author");

  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    let usersDir = `./client/public/courses/${course.author.name}/${course.branch.slug}/${course.slug}`;

    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir, { recursive: true });
    }
    if (fs.existsSync(usersDir + "/thumbnail.jpg")) {
      fs.rmSync(usersDir + "/thumbnail.jpg", { recursive: true });
    }

    fs.rename(
      files.thumbnail.filepath,
      usersDir + "/thumbnail.jpg",
      async (err) => {
        await course.update({
          thumbnail: "thumbnail.jpg",
        });
        res.json({ thumbnail: "thumbnail.jpg" });
      }
    );
  });
});

router.delete("/delete-thumbnail/:course_id", async (req, res) => {
  const course = await Course.findById(req.params.course_id)
    .populate("branch")
    .populate("author");
  let usersDir = `./client/public/courses/${course.author.name}/${course.branch.slug}/${course.slug}`;

  if (fs.existsSync(usersDir + "/thumbnail.jpg")) {
    fs.rmSync(usersDir + "/thumbnail.jpg", { recursive: true });
  }

  await course.update({
    thumbnail: "",
  });
  res.json(course);
});

// router.post("/upload-video/:course_id", async (req, res) => {
//   const course = await Course.findById(req.params.course_id)
//     .populate("branch")
//     .populate("author");

//   const form = formidable({ multiples: true });

//   form.parse(req, (err, fields, files) => {
//     let usersDir = `./client/public/courses/${course.author.name}/${course.branch.slug}/${course.slug}/videos`;

//     if (!fs.existsSync(usersDir)) {
//       fs.mkdirSync(usersDir, { recursive: true });
//     }

//     let videoName = "video" + Date.now() + ".mp4";
//     fs.rename(files.video.filepath, usersDir + "/" + videoName, (err) => {
//       Video.create({
//         title: fields.title,
//         order: 0,
//         description: fields.description,
//         path: videoName,
//         demo: true, //if demo, moze se gledati bez da je kurs kupljen
//         course: course._id,
//       });
//       res.json({ video: videoName });
//     });
//   });
// });




router.get(`/:course_id`, (req, res) => {
  Course.findById(req.params.course_id)
    .populate("branch")
    .populate("author")
    .populate("videos")
    .then((course) => res.json(course));

});


export default router;
