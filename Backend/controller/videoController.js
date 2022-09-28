const User = require("../models/userModel")
const Video = require("../models/videoModel")
const asyncHandler = require("express-async-handler");
const { createError } = require("../middleware/errorMiddleware");

const addvideo=asyncHandler(async(req,res)=>{
    console.log("reach")
    console.log(req.body)
    console.log(req.user.id)
  const video= await  Video.create({userId:req.user.id, ...req.body})
  if(video){
    res.status(200).json(video)
  }else{
    res.status(400);
    throw new Error("Invalid  data");
  }
})

const getallvideo=asyncHandler(async(req,res)=>{
    console.log("get the request")
const video= await Video.find()
if(video){
    res.status(200).json(video)
}else{
  return next(createError(404,"not found"))
}
})

const updatevideo=asyncHandler(async(req,res)=>{
const video= await Video.findById(req.params.id)
if(video){
   if(req.userId===video.userId){
    const updateVideo= await Video.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
   res.status(200).json(updateVideo)
}else{
    return next(createError(403,"you are  not allowed to update this video"))
}
}else{
    return next(createError(404,"not found"))
}
})

const getvideo=asyncHandler(async(req,res)=>{
   const video= await Video.findById(req.params.id)
   if(video){
    res.status(200).json(video)
   }else{
    throw new Error("content not found");
   }
})
const view=asyncHandler(async(req,res)=>{
    const video=await Video.findByIdAndUpdate(req.params.id,{
        $inc:{views:1}
    })
    if(!video){
        throw new Error("unable to like");
    }
    res.status(200).json("video has been viewed")
})

const trending= asyncHandler(async(req,res)=>{
    const video= await Video.find().sort({views: -1})
    if(video){
        res.status(200).json(video)
    }else{
        throw new Error("unable to find");
    }
})

const search= asyncHandler(async(req,res)=>{
    const query=req.query.q
    const video= await Video.find({title:{$regex:query,$option:"i"}}).limit(30)
    if(video){
        res.status(200).json(video)
    }else{
        throw new Error("not found");
    }
})

const like= asyncHandler(async(req,res)=>{
    const vid=req.params.videoId
     const video= await Video.findByIdAndUpdate(vid,
        {
            $inc:{likes:1}
        })
        if(video){
            res.status(200).json("liked")
        }

})



module.exports = {
    addvideo,
   getallvideo,
   updatevideo,
   getvideo,
   view,
   trending,
   like
  };