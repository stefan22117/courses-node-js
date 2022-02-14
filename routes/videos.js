import express from "express";
import Course from "../models/Course.js";
import formidable from "formidable";
import fs from "fs";
import Video from "../models/Video.js";
const router = express.Router();

router.post("/upload-video/:course_id", async (req, res) => {
  const course = await Course.findById(req.params.course_id)
    .populate("branch")
    .populate("author");

  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    let usersDir = `./client/public/courses/${course.author.name}/${course.branch.slug}/${course.slug}/videos`;

    if (!fs.existsSync(usersDir)) {
      fs.mkdirSync(usersDir, { recursive: true });
    }

    let videoName = "video" + Date.now() + ".mp4";
    fs.rename(files.video.filepath, usersDir + "/" + videoName, async (err) => {
      let order = (
        await Video.find({ course: req.params.course_id }).sort({
          order: "descending",
        })
      )[0];
      Video.create({
        title: fields.title,
        order: order ? order.order + 1 : 1,
        duration: 0,
        snapshot: 0,
        description: fields.description,
        path: videoName,
        demo: true, //if demo, moze se gledati bez da je kurs kupljen
        course: course._id,
      });
      res.json({ video: videoName });
    });
  });
});


router.patch("/update-demo-status/:video_id", (req, res)=>{

    Video.findByIdAndUpdate(req.params.video_id,
        {
            demo: req.body.demo
        },
        {new:true}
        )
        .then((video)=>res.json(video));


})


router.delete("/:video_id", (req, res)=>{
    Video.findByIdAndDelete(req.params.video_id)
    .then(()=>{
        res.send(204)
    })
});

router.patch("/:video_id", (req, res)=>{
  Video.findByIdAndUpdate(req.params.video_id,
    req.body
    ,{
      new:true
    })
    .then(video=>res.json(video))
})
export default router;
