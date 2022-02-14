import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import RangeSlider from "react-bootstrap-range-slider";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { formatVideoLength } from "../../helpers/formatVideoLength";
import { TVideo } from ".";
const UpdateVideo: React.FC<{
  selectedVideo: any;
  showUpdateVideo: boolean;
  setShowUpdateVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideos: React.Dispatch<React.SetStateAction<any | undefined>[]>;
  videos: any[] | undefined;
  initialSrc: string;
}> = ({
  selectedVideo,
  showUpdateVideo,
  setShowUpdateVideo,
  setVideos,
  videos,
  initialSrc,
}): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [newVideoInfo, setNewVideoInfo] = useState<TVideo>({
    _id:'',
    title:'',
    description:'',
    path:'',
    demo:false,
    snapshot:0,
  });
  useEffect(() => {
    if(selectedVideo){
      setNewVideoInfo(selectedVideo);
    }
  }, [selectedVideo]);

  useEffect(() => {
    if (
      videoRef?.current &&
      typeof videoRef.current.currentTime !== "undefined"
    ) {
      videoRef.current.currentTime = newVideoInfo?.snapshot ?? 0;
    }
  }, [videoRef, newVideoInfo?.snapshot]);

  const updateVideoHandler = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.patch(`/videos/${newVideoInfo?._id}`, newVideoInfo).then((response) => {

      let index = videos?.map(x=>x._id).indexOf(newVideoInfo?._id);
      
      if(typeof index !== 'undefined' && index > -1){
        const _videos = videos ? [...videos] : [];
        if(_videos.length){
          _videos.splice(index, 1, response.data);
          setVideos(_videos)
        }
      }
      setShowUpdateVideo(false);
    });
  };
  const handleChange =
    (name: string): any =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    
      setNewVideoInfo({ ...newVideoInfo, [name]: e.target.value });
    };
  return (
    <Modal
      show={showUpdateVideo}
      fullscreen={true}
      onHide={() => setShowUpdateVideo(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Updating Video - {selectedVideo?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={updateVideoHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={newVideoInfo?.title}
              onChange={handleChange("title")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={2}
              placeholder="Description"
              value={newVideoInfo?.description}
              onChange={handleChange("description")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              inline
              name="demo"
              type="radio"
              label="Free"
              id="free"
              checked={newVideoInfo.demo}
              onChange={()=>setNewVideoInfo({...newVideoInfo, demo:!newVideoInfo.demo})}
            />
            <Form.Check
              inline
              name="demo"
              type="radio"
              label="Only buyers"
              id="onlyBuyers"
              checked={!newVideoInfo.demo}
              onChange={()=>setNewVideoInfo({...newVideoInfo, demo:!newVideoInfo.demo})}
            />
          </Form.Group>

          <Form.Group>
              <Row>
                <Col md={10}>
                <video
                  ref={videoRef}
                  preload="metadata"
                  style={{
                    width: "50%",
                  }}
                  src={`${initialSrc}/${selectedVideo?.path}`}
                ></video>
                 <RangeSlider
                  tooltip="auto"
                  tooltipLabel={(currentValue) =>
                    formatVideoLength(currentValue)
                  }
                  max={selectedVideo?.duration ?? 0}
                  value={newVideoInfo?.snapshot ?? 0}
                  onChange={(e) =>
                    setNewVideoInfo({ ...newVideoInfo, snapshot: parseInt(e.target.value) })
                  }
                />
</Col>

                <Col
                //  md={{ span: 2, offset: 10 }}
                style={{
                  display:'flex',
                  justifyContent:'flex-end',
                  alignItems:'flex-end'
                }}
                  md={2}
                >
                <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="info" type="button" onClick={()=>setNewVideoInfo(selectedVideo)}>
            Reset
          </Button>
                </Col>
              </Row>
          </Form.Group>

          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateVideo;
