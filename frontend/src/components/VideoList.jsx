import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/VideoList.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Card } from 'antd';
import {Player} from 'video-react'
import VideoModal from "./VideoModal";
import SampleModal from "./SampleModal";
const { Meta } = Card;

 
function VideoList({video,index}) {
  const [videoPlayers, setVideoPlayers] = useState([]);
  const [modalShow,setModalShow]=useState(false)
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const playVideo = (index) => {
    // const {player} = videoPlayers[index].getState()
    videoPlayers[index].playbackRate = 3;
    videoPlayers[index].actions.play();
  };
  const reloadVideo = (index) => {
    videoPlayers[index].load();
  };
  const updateViews=async(id)=>{
    try{
        const res= await axios.put(`/api/video/view/${id}`)
    }catch(err){
     console.log(err)
    }
    }
  const handleVideo=(url,id)=>{
  setModalShow(true)
  setVideoUrl(url)
  setVideoId(id)
  updateViews(id)
  };

  return (
    <>
     <VideoModal
        backdrop="static"
        keyboard
        url={videoUrl}
        id={videoId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    <div className=" carditem" onMouseEnter={() => {playVideo(index)}} onMouseLeave={() =>{   reloadVideo(index)}}  onClick={() => {
        console.log("clicked");
        handleVideo(video.videoUrl, video._id);
      }}>
      
    <Card
    hoverable
    style={{
      width: 280,
      height:250
    }}
    cover={<img alt="example" src={video.imgUrl} />}
  >
    <Meta title={video.title } description={video.views   + "    views"} />
  </Card>

{/* <HoverVideoPlayer
      videoSrc={video.videoUrl}
      pausedOverlay={
        <img
          src={video.imgUrl}
          alt=""
          style={{
            // Make the image expand to cover the video's dimensions
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      loadingOverlay={
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      }
      loadingStateTimeout={1000} /> */}
      
         </div>
</>
  )
}

export default VideoList
