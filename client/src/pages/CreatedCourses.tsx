import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseListItem from "../components/CourseListItem";
import { RootState } from "../redux/store";
import { TCourse } from "./Course";

const CreatedCourses = () => {
  const [courses, setCourses] = useState<TCourse[]>([]);

  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (auth.isLoggedIn) {
      axios
        .get(`/courses/created`)
        .then((courses) => {
          setCourses(courses.data);

        })
        .catch((err) => alert("error"));
    }
  }, [auth]);

  return (
    <div>
      kreirani kursevi
      {courses.length ? (
        courses.map((x, i) => <CourseListItem course={x} branch={x?.branch} key={i}/> )
      ) : (
        <p>Nemate dodatih kurseva</p>
      )}
    </div>
  );
};

export default CreatedCourses;
