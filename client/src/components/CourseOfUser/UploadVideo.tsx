import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TCourse } from "../../pages/Course";
const UploadVideo: React.FC<{
  showUploadVideo: boolean;
  setShowUploadVideo: React.Dispatch<React.SetStateAction<boolean>>;
  course: TCourse;
}> = ({ showUploadVideo, setShowUploadVideo, course }): JSX.Element => {
  const [video, setVideo] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  const handleChange =
    (name: string): any =>
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
      setVideo({ ...video, [name]: e.target.value });
    };

  const videoInputRef = useRef<HTMLInputElement>(null);
  const validate = () => {
    return true;
  };

  const uploadVideoHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validate()) {
      const formData = new FormData();
      if (videoInputRef.current?.files) {
        formData.append("title", video.title);
        formData.append("description", video.description);
        formData.append("video", videoInputRef.current?.files[0]);
      }
      axios
        .post(`/videos/upload-video/${course?._id}`, formData)
        .then((response) => setShowUploadVideo(false));
    }
  };

  return (
    <Modal
      show={showUploadVideo}
      fullscreen={true}
      onHide={() => setShowUploadVideo(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Uploading Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={uploadVideoHandler} encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
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
            />
            <Form.Check
              inline
              name="demo"
              type="radio"
              label="Only buyers"
              id="onlyBuyers"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="file" ref={videoInputRef} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UploadVideo;
