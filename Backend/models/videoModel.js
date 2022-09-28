const mongoose = require('mongoose')

const VideoSchema =new mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      imgUrl: {
        type: String,
        required: true,
      },
      videoUrl: {
        type: String,
        required: true,
      },
      views: {
        type: Number,
        default: 0,
      },
      
      likes: {
        type: Number,
        default: 0,
      },
     
     
},
{
    timestamps: true,
  }
)
const Video = mongoose.model("Video",VideoSchema);
module.exports = Video;