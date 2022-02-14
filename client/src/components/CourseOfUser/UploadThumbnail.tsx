import axios from "axios";
import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaTimes, FaUpload } from "react-icons/fa";
import { animated, useTransition } from "react-spring";
import { TCourse } from "../../pages/Course";
const UploadThumbnail = ({
  thumbnail,
  course,
  setThumbnail,
}: {
  thumbnail: {
    name: string | undefined;
  };
  course: TCourse;
  setThumbnail: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
    }>
  >;
}) => {
  const transitions = useTransition(thumbnail, {
    from: {
      opacity: 0,
      // transform: "translateX(100%)",
      // transition:'all 1s ease-out'
      transition: "all 1s ease-out",
    },
    enter: {
      opacity: 1,
      // transform: "translateX(0%)",
      transition: "all 1s ease-out",
    },
    leave: {
      opacity: 0,
      // visibility:'hidden',
      // transform: "translateX(-100%)",
      transition: "all 1s ease-out",
    },

    config: {
      // duration:200,
      //  tension: 220,
      //   friction: 120
    },
  });

  const deleteThumbnail = () => {
    axios
      .delete(`/courses/delete-thumbnail/${course?._id}`)
      .then((response) => {
        console.log("posle brisanja", response.data);
        setThumbnail({ name: response.data?.thumbnail });
      });
  };

  //   const uploadThumbnail = (e: React.MouseEvent<HTMLButtonElement>): void => {
  //     e.currentTarget.blur();
  //     uploadThumbnailRef.current?.click();
  //   };

  const uploadThumbnailHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const formData = new FormData();
    if (e.target.files?.length) {
      // formData.append("course", course?.slug ?? '');
      formData.append("thumbnail", e.target.files[0]);
      e.target.value = "";
      axios
        .patch(`/courses/update-thumbnail/${course?._id}`, formData)
        .then((response) => {
          setThumbnail({ name: response.data?.thumbnail });
        });
    }
  };

  return transitions((props, thumbnail) => {
    console.log("TRANSITIONS", thumbnail.name);
    return (
      thumbnail.name && (
        <animated.div
          style={{
            ...props,
            position: "absolute",
            height: "100%",
            width: "100%",
          }}
        >
          <img
            src={`/courses/${course?.author.name}/${course?.branch?.slug}/${course?.slug}/${thumbnail.name}`}
            style={{
              height: "100%",
              width: "100%",
            }}
            alt="thumbnail"
          />
          <ButtonGroup
            style={{
              position: "absolute",
              right: "3%",
              top: "5%",
            }}
          >
            <Button
              variant="outline-warning"
              // onClick={uploadThumbnail}
            >
              <FaUpload />
            </Button>
            <Button variant="outline-danger" onClick={deleteThumbnail}>
              <FaTimes />
            </Button>
          </ButtonGroup>
        </animated.div>
      )
    );
  });
};

export default UploadThumbnail;
