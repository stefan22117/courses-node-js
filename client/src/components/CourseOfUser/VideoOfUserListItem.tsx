import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Modal, Overlay, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FaDollarSign, FaEdit, FaPlayCircle, FaTimes } from "react-icons/fa";
import { TVideo } from ".";
import { formatVideoLength } from "../../helpers/formatVideoLength";




const VideoOfUserListItem: React.FC<{
  video: any;
  initialSrc: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<any>>;
  setShowUpdateVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteVideo: React.Dispatch<React.SetStateAction<boolean>>;
  setVideoToPlay: React.Dispatch<React.SetStateAction<TVideo>>;
}> = ({
  video,
  initialSrc,
  setSelectedVideo,
  setShowUpdateVideo,
  setShowDeleteVideo,
  setVideoToPlay
}): JSX.Element => {
  const [showFree, setShowFree] = useState(false);
  const [showOnlyBuyers, setShowOnlyBuyers] = useState(false);
  const freeRef = useRef<any>(null);
  const onlyBuyersRef = useRef<any>(null);
  
  const handleTooltip = (demo:boolean, value:boolean) => {
    if(demo){
      setShowFree(value)
    }else{
      setShowOnlyBuyers(value)
    }
  }



  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (
      videoRef?.current &&
      typeof videoRef.current.currentTime !== "undefined"
    ) {
      videoRef.current.currentTime = video.snapshot ?? 0;
    }
  }, [videoRef, video.snapshot]);

  const [demo, setDemo] = useState(video.demo);

  useEffect(()=>{
    setDemo(video.demo)
  }, [video.demo])


  const changeDemoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios
      .patch(`/videos/update-demo-status/${video._id}`, {
        demo: e.target.checked,
      })
      .then((response) => setDemo(response.data.demo));
  };
  return (
    <>
      <Row>
        <Col xs={2}>
          <video
          onClick={()=>setVideoToPlay(video)}
            ref={videoRef}
            preload="metadata"
            style={{
              width: "100%",
            }}
            src={`${initialSrc}/${video.path}`}
          ></video>
        </Col>
        <Col xs={4}>{video.title}</Col>
        <Col xs={3}>{formatVideoLength(video.duration)}</Col>
        <Col xs={1} onMouseOver={()=>handleTooltip(demo, true)} onMouseLeave={()=>handleTooltip(demo, false)}>
          {demo ? 
          <span
          ref={freeRef}
          >
            <FaPlayCircle />
          <Overlay placement="top" target={freeRef.current} show={showFree}>
          {(props) => (
          <Tooltip {...props}>
            Free
          </Tooltip>
        )}
          </Overlay>
          </span>
           :
           <span
          ref={onlyBuyersRef}
          >
            <FaDollarSign />
          <Overlay placement="top" target={onlyBuyersRef.current} show={showOnlyBuyers}>
          {(props) => (
          <Tooltip {...props}>
            Only Buyers
          </Tooltip>
        )}
          </Overlay>
          </span>
           }
        </Col>
        <Col xs={1}>
          <Button
            variant="warning"
            onClick={() => {
              setSelectedVideo(video);
              setShowUpdateVideo(true);
            }}
          >
            <FaEdit />
          </Button>
        </Col>
        <Col xs={1}>
          <Button
            variant="danger"
            onClick={() => {
              setSelectedVideo(video);
              setShowDeleteVideo(true);
            }}
          >
            <FaTimes />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default VideoOfUserListItem;
