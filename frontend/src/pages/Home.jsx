import React,{useEffect,useState} from 'react'
import UserNav from '../components/UseNav'
import styled from "styled-components";
import axios from "axios";
import VideoList from '../components/VideoList';
import '../styles/VideoList.css'

function Home({type}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/video/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  },[]);
  return (
    <div><UserNav/>
    <div className='row   carditem'>
      {videos.map((video,index) => (
        <div className="col-12 col-md-3  carditems">
        <VideoList key={video._id} video={video} index={index}/> </div>
      ))}
     
     </div>
    </div>
  )
}

export default Home