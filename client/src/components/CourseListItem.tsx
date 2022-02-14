import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TCourse } from "../pages/Course";
const CourseListItem: React.FC<{ branch: any; course: TCourse }> = ({
  branch,
  course,
}): JSX.Element => {
  const [thumbnail, setThumbnail] = useState<any>();
  const [populatedCourse, setPopulatedCourse] = useState<TCourse | undefined>();

  useEffect(() => {
    axios.get(`/courses/${course?._id}`)
    .then((response) => {
      setPopulatedCourse(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(populatedCourse)
    if (!!populatedCourse?._id) {
      let thumbnailURL = `/courses/${populatedCourse?.author.name}/${branch?.slug}/${populatedCourse?.slug}/${populatedCourse?.thumbnail}`;
      axios
        .get(thumbnailURL)
        .then(() => {
          setThumbnail(thumbnailURL);
        })
        .catch(() => setThumbnail("/blank_thumbnail.jpg"));
    }
  }, [populatedCourse]);

  return (
    <Row>
      <Col md={4}>
        {!!populatedCourse?._id ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            style={{
              width: "200px",
            }}
          />
        ) : (
          <Spinner animation="border" />
        )}
      </Col>

      <Col md={2}>
        <Link to={`/courses/${branch.slug}/${course?.slug}`}>
          {course?.title}
        </Link>
      </Col>
      <Col md={2}>
        {populatedCourse?.videos.length}{" "}
        {populatedCourse?.videos.length == 1 ? "video" : "videos"}
      </Col>
      <Col md={2}>
        by: {populatedCourse?.author.name}
      </Col>
      <Col md={2}>
        {populatedCourse?.price ?? 0} $
      </Col>


    </Row>
  );
};

export default CourseListItem;
