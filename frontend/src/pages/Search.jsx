import React,{useEffect,useState} from 'react'
import UserNav from '../components/UseNav'
import axios from "axios";
import VideoList from '../components/VideoList';
import '../styles/VideoList.css'
import { useLocation } from 'react-router-dom';
 

function Home() {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/video/search${query}`);
      setVideos(res.data);
      
    };
    fetchVideos();
  },[query]);
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