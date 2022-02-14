import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import CreateCourse from "./CreateCourse";
import CreatedCourses from "./CreatedCourses";
import Course from "./Course";
import "./index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CoursesByBranch from "./CoursesByBranch";
import CourseBranches from "./CourseBranches";
import CreateBranch from "./CreateBranch";

type PageProps = {
  authenticate?: boolean;
  authorize?: string;
  children: JSX.Element;
  redirectLink?: string;
};

const Page: React.FC<PageProps> = ({
  children,
  authenticate = false,
  authorize = "",
  redirectLink = "/login",
}) => {
  const navigate = useNavigate();

  const authenticateFunction = () => {
    axios
      .get("/auth/get-logged-user")
      .then((response) => {})
      .catch((err) => {
        if (err.response.status == 401 || err.response.status == 404) {
          return navigate(redirectLink);
        }
      });
  };

  const authorizeFunction = (authorize: string) => {
    axios
      .get("/auth/get-logged-user")
      .then((response) => {
          if(response.data.role != authorize){
              return navigate(redirectLink);

          }
      })
      .catch((err) => {
        if (err.response.status == 401 || err.response.status == 404) {
          return navigate(redirectLink);
        }
      });
  };
  useEffect(() => {
    if (authorize) {
        authorizeFunction(authorize)
    } else if (authenticate) {
      authenticateFunction();
    }
  }, []);
  return <div className="page">{children}</div>;
};

export default {
  Home: () => (
    <Page>
      <Home />
    </Page>
  ),
  Login: () => (
    <Page>
      <Login />
    </Page>
  ),
  Register: () => (
    <Page>
      <Register />
    </Page>
  ),
  CreateCourse: () => (
    <Page authenticate>
      <CreateCourse />
    </Page>
  ),
  CreatedCourses: () => (
    <Page authenticate>
      <CreatedCourses />
    </Page>
  ),
  CourseBranches: () => (
    <Page>
      <CourseBranches />
    </Page>
  ),
  CoursesByBranch: () => (
    <Page>
      <CoursesByBranch />
    </Page>
  ),
  Course: () => (
    <Page>
      <Course />
    </Page>
  ),
  CreateBranch: () => (
    <Page>
      <CreateBranch />
    </Page>
  ),
};
