const  dotenv=require('dotenv').config()
const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode?res.statusCode:500
    res.status(statusCode)
    
    res.json({
        message:err.message,
        stack: process.env.NODE_ENV ==='production'?null:err.stack
    })
}
 const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
  };
module.exports ={
    errorHandler,createError
}