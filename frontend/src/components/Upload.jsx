import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import app from '../firebase'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:lightgrey;
display:flex;
align-items:center;
justify-content:center;
z-index:200;
`;
const Wrapper= styled.div`
width:600px;
height:600px;
background-color: ${({theme})=>theme.bgLighter};
color:${({theme})=>theme.text};
padding:1px;
display:flex;
flex-direction:column;
gap:20px;
position:relative;

`;
const Close =styled.div`
position:absolute;
top:10px;
right:10px;
font-size:30px;
font-weight:600;
cursor:pointer;
`;
const Title = styled.h1`
text-align:center;
`;
const Input = styled.input`
border:1px solid ${({theme})=> theme.soft};
color:${({theme}) => theme.text};
border-radius:3px;
padding:25px;
background-color:transparent;
`;
const Desc = styled.textarea`
border:1px solid ${({theme})=> theme.soft};
color:${({theme}) => theme.text};
border-radius:3px;
padding:20px;
background-color:transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
  font-weight:700
`;
const Upload=({setOpen})=> {
    const [img,setImg]= useState(undefined)
    const [video,setVieo]= useState(undefined)
    const [imgPerc,setImgPerc]= useState(0)
    const [videoPerc,setVideoPerc]=useState(0)
    const [inputs,setInputs]=useState({})
   const navigate= useNavigate()
    const handleChange =(e)=>{
        setInputs((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
const handleUpload=async (e)=>{
e.preventDefault();
const res=await axios.post("/api/video/",{...inputs})
setOpen(false)
res.status===200 && navigate('/')
}
    const uploadFile=(file,urlType)=>{
        const storage = getStorage(app);
        const fileName= new Date().getTime()+ file.name
        const storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     urlType === "imgUrl"?setImgPerc(progress):setVideoPerc(progress)
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
            break;
    }
  }, 
  (error) => {},
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setInputs((prev)=>{
            return {...prev,[urlType]:downloadURL}
        })
    });
  }
        );
    }

    useEffect(()=>{
   video && uploadFile(video,"videoUrl")
    },[video])
    useEffect(()=>{
   img && uploadFile(img,"imgUrl")
    },[img])
  return (
    <Container>
<Wrapper>
    <Close onClick={()=>setOpen(false)}>X</Close>
    <Title>Upload a New Video</Title>
    <Label>Video:</Label>
    {videoPerc > 0?("uploading:"+videoPerc+"%"):(<Input type='file' accept='video/*' onChange={e=>setVieo(e.target.files[0])}/>)}
    

    <Input type='text' placeholder='Title' name='title' onChange={handleChange}/>
    <Desc placeholder='Description' rows={8} name='desc' onChange={handleChange}/>
    <Label>Image:</Label>
    {imgPerc > 0?("uploading:"+imgPerc+"%"):(    <Input type='file' accept='image/*'  onChange={e=>setImg(e.target.files[0])}/>)}

    <Button onClick={handleUpload} >Upload</Button>
</Wrapper>
    </Container>
  )
}

export default Upload