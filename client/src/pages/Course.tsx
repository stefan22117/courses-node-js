import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseOfUser from "../components/CourseOfUser";
import CourseOfAnother from "../components/CourseOfAuthor";
import { RootState } from "../redux/store";
import axios from "axios";
import { useParams } from "react-router-dom";

export type TCourse = {
  _id: string;
  title: string;
  author: string | any;
  branch: string | any;
  slug: string;
  description: string;
  thumbnail: string;
  videos: any[];
  price:number;
} | null;

const Course: React.FC = (): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);

  const [course, setCourse] = useState<TCourse>();

  const params = useParams();
  useEffect(() => {
    axios
      .get(`/courses/${params.branch}/${params.slug}`)
      .then((res) => setCourse(res.data));
  }, []);
  return (
    <>
      <h1>Course</h1>
      {course &&
        (auth.isLoggedIn && auth.user._id == course?.author?._id ? (
          <CourseOfUser course={course} />
        ) : (
          <CourseOfAnother course={course} />
        ))}
    </>
  );
};

export default Course;
