const express= require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const {
    Tokenverify
}=require('../middleware/tokenverification')
 
const { addvideo, updatevideo, getallvideo, getvideo,view,trending,like } = require('../controller/videoController')

//add video
router.post('/',Tokenverify,addvideo)

//edit
router.put('/:id',Tokenverify,updatevideo)

//to get one video
router.get('/get/:id',getvideo)

//to get all video
router.get('/getall',getallvideo)

//to update views
router.put('/view/:id',view)

module.exports=router
