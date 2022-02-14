import axios from "axios";
import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

const DeleteVideo: React.FC<{
  selectedVideo: any;
  showDeleteVideo: boolean;
  setShowDeleteVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideos: React.Dispatch<React.SetStateAction<any|undefined>[]>;
  videos: any[]|undefined
}> = ({ selectedVideo, showDeleteVideo , setShowDeleteVideo, setVideos, videos}): JSX.Element => {
  const deleteVideoHandler = () => {
    axios.delete(`/videos/${selectedVideo._id}`).then(() => {
      setVideos(videos?.filter(x=>x._id !== selectedVideo._id) ?? [])
      setShowDeleteVideo(false);
    });
  };

  return (
    <Modal show={showDeleteVideo} onHide={() => setShowDeleteVideo(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting Video - {selectedVideo?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure that you want to delete this video?</p>
        <Container>
          <Row>
            <Col md={{ span: 2, offset: 8 }}>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteVideo(false)}
              >
                Cancel
              </Button>
            </Col>
            <Col md={{ span: 2, offset: 0 }}>
              <Button variant="danger" onClick={deleteVideoHandler}>
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteVideo;
