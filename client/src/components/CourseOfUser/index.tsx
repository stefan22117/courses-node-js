import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaTimes, FaUpload, FaWindowMinimize } from "react-icons/fa";
import { TCourse } from "../../pages/Course";
import { Modal, Button, Form, ButtonGroup, Container } from "react-bootstrap";
import { useTransition, animated } from "react-spring";
import UploadThumbnail from "./UploadThumbnail";
import UploadVideo from "./UploadVideo";
import VideoOfUserListItem from "./VideoOfUserListItem";
import DeleteVideo from "./DeleteVideo";
import UpdateVideo from "./UpdateVideo";

export type TVideo = {
  _id: string;
title: string;
description: string;
path:'',
demo:boolean;
snapshot:number;
};


const Course: React.FC<{ course: TCourse }> = ({ course }): JSX.Element => {
  const uploadVideoRef = useRef<HTMLInputElement>(null);
  const uploadThumbnailRef = useRef<HTMLInputElement>(null);

  const [showUploadVideo, setShowUploadVideo] = useState(false);
  const [showDeleteVideo, setShowDeleteVideo] = useState(false);
  const [showUpdateVideo, setShowUpdateVideo] = useState(false);

  const [thumbnail, setThumbnail] = useState({ name: course?.thumbnail });

  const [selectedVideo, setSelectedVideo] = useState<any>();
  const [videos, setVideos] = useState<TVideo[]|undefined>(course?.videos);

  const deleteThumbnail = () => {
    axios
      .delete(`/courses/delete-thumbnail/${course?._id}`)
      .then((response) => {
        setThumbnail({ name: response.data?.thumbnail });
      });
  };

  const uploadThumbnail = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.currentTarget.blur();
    uploadThumbnailRef.current?.click();
  };

  const uploadThumbnailHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const formData = new FormData();
    if (e.target.files?.length) {
      formData.append("thumbnail", e.target.files[0]);
      e.target.value = "";
      axios
        .patch(`/courses/update-thumbnail/${course?._id}`, formData)
        .then((response) => {
          setThumbnail({ name: response.data?.thumbnail });
        })
        .catch((err) => console.log(err));
    }
  };


  const transitions = useTransition(thumbnail, {
    from: {
      opacity: 0,
      // transform: "translateX(100%)",
      // transition:'all 1s ease-out'
      transition: "all 4s ease-out",
    },
    enter: {
      opacity: 1,
      // transform: "translateX(0%)",
      transition: "all 4s ease-out",
    },
    leave: {
      opacity: 0,
      // display:()=>thumbnail.name?"block":'none',
      // visibility:'hidden',
      // transform: "translateX(-100%)",
      transition: "all 4s ease-out",
    },

    config: {
      // duration:200,
      //  tension: 220,
      //   friction: 120
    },
  });
  // /* <UploadThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} course={course}/> */

  const [videoToPlay, setVideoToPlay] = useState<TVideo>({
    _id:'',
    title:'',
    description:'',
    path:'',
    demo:false,
    snapshot:0,
  })



  const minimizeVideo = () =>{
    setVideoToPlay( {
      _id:'',
      title:'',
      description:'',
      path:'',
      demo:false,
      snapshot:0,
    })
  }
  return (
    <>
      <div>
        <h1>{course?.title} - tvoj kurs</h1>
        <p>{course?.description}</p>
        <div>
          
            
          
          <div
            style={{
              backgroundColor: "gray",
              height: "300px",
              width: "600px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >

            {
              !!videoToPlay?._id?
              
              <div style={{
              }}>

              <video
              style={{
                width:'100%',
                height:'100%',
              }}
              controls
              src={`/courses/${course?.author.name}/${course?.branch?.slug}/${course?.slug}/videos/${videoToPlay.path}`}
              >
              </video>
              <Button
              style={{
                position:'absolute',
                right: "-4px",
                top: "2px",
                color:'white'
              }}
              variant="transparent" onClick={minimizeVideo}><FaWindowMinimize /></Button>
                </div>


              :
<>


            <ButtonGroup>
              <Button onClick={uploadThumbnail}>+</Button>
              <Form.Control
                hidden
                onChange={uploadThumbnailHandler}
                ref={uploadThumbnailRef}
                type="file"
              />
              <Button variant="secondary" disabled>
                Add Thumbnail
              </Button>
            </ButtonGroup>

            {thumbnail.name && (
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={`/courses/${course?.author.name}/${
                    course?.branch?.slug
                  }/${course?.slug}/${thumbnail.name}?${Date.now()}`}
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
                    size="sm"
                    onClick={uploadThumbnail}
                  >
                    <FaUpload />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={deleteThumbnail}
                  >
                    <FaTimes />
                  </Button>
                </ButtonGroup>
              </div>
            )}
            </>

}
            
          </div>

          

          
        </div>
        <div>
          <Button onClick={() => setShowUploadVideo(true)}>Dodaj video</Button>
        </div>

        {videos && videos.length ? (
          <Container>
            {videos.map((video, i) => (
              <VideoOfUserListItem
              setSelectedVideo={setSelectedVideo}
              setShowUpdateVideo={setShowUpdateVideo}
              setShowDeleteVideo={setShowDeleteVideo}
              setVideoToPlay={setVideoToPlay}
                video={video}
                key={i}
                initialSrc={`/courses/${course?.author.name}/${course?.branch?.slug}/${course?.slug}/videos`}
              />
            ))}
          </Container>
        ) : (
          <div>
            No videos for this course ,{" "}
            {/* <Button onClick={uploadVideo}>Dodaj video</Button> */}
          </div>
        )}
      </div>

      <UploadVideo
        showUploadVideo={showUploadVideo}
        setShowUploadVideo={setShowUploadVideo}
        course={course}
      />
      <UpdateVideo
        showUpdateVideo={showUpdateVideo}
        setShowUpdateVideo={setShowUpdateVideo}
        selectedVideo={selectedVideo}
        setVideos={setVideos}
        videos={videos}
        initialSrc={`/courses/${course?.author.name}/${course?.branch?.slug}/${course?.slug}/videos`}
      />
      <DeleteVideo
        showDeleteVideo={showDeleteVideo}
        setShowDeleteVideo={setShowDeleteVideo}
        selectedVideo={selectedVideo}
        setVideos={setVideos}
        videos={videos}
      />

    </>
  );
};

export default Course;
