import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReduxActions from "../redux/actions";
import { TBranch } from "./CourseBranches";

const CreateCourse = () => {
  const [branches, setBranches] = useState<TBranch[]>([]);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState<any[]>([]);
  const [course, setCourse] = useState<{
    title: string;
    description?: string;
    branch: string;
  }>({
    title: "",
    description: "",
    branch: "",
  });
  const dispatch = useDispatch();
  const coursesActions = bindActionCreators(ReduxActions.courses, dispatch);

  useEffect(() => {
    axios.get("/branches").then((response) => setBranches(response.data));
  }, []);

  const validate = () => {
    let errorsTemp: any[] = [];
    if (!/^.{4,35}$/.test(course.title)) {
      errorsTemp = [...errorsTemp, { title: "Invalid title" }];
    }
    if (!/^.{10,}$/.test(course.description ?? "")) {
      errorsTemp = [...errorsTemp, { description: "Invalid description" }];
    }
    setFormErrors(errorsTemp);
    return !errorsTemp.length;
  };

  const handleChange =
    (name: string): any =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      setCourse({ ...course, [name]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent<Element>): void => {
    e.preventDefault();

    if (validate()) {
      alert("valid");
      axios
        .post("/courses/create-course", course)
        .then((res) => navigate(`/courses/${res.data.branch.slug}/${res.data.slug}`))
        .catch((err) => {
          if (err.status == 401) {
            navigate("/login");
          }
          console.log(err);
        });
    } else {
      alert("invalid data");
    }
    return;

    // coursesActions.create(course)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input onChange={handleChange("title")} />
        {formErrors.filter((x) => x.title).length > 0 &&
          formErrors
            .filter((x) => x.title)
            .map((err, i) => <span key={i}>{err.title}</span>)}

        <br />
        <label>Description</label>
        <input onChange={handleChange("description")} />

        {formErrors.filter((x) => x.description).length > 0 &&
          formErrors
            .filter((x) => x.description)
            .map((err, i) => <span key={i}>{err.description}</span>)}

        <br />

        <select value={course.branch} onChange={handleChange("branch")}>
          <option value="">sELECT BRANCH</option>
          {branches.map((x) => (
            <option key={x?.slug} value={x?.slug}>{x?.name}</option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCourse;
