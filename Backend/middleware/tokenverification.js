const jwt = require("jsonwebtoken");
const {createError}= require('../middleware/errorMiddleware')
 

const Tokenverify= (req,res,next)=>{
    const token = req.cookies.accesstoken
if(!token){
    return next(createError(401,"you are not authenticated"))
}
jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err){
        return next (createError(403,"inavalid token"))
    }
    req.user = user
    next()
})
}

module.exports ={
    Tokenverify
}