const express= require("express")
const dotenv = require('dotenv').config()
var cookieParser = require('cookie-parser')
const {errorHandler}= require('./middleware/errorMiddleware')
const port =process.env.PORT || 5000
const connectDB = require('./config/db');
connectDB()
const app=express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

app.use('/api/users',require('./routes/userRoute'))
app.use('/api/video',require('./routes/videoRoute'))
 
app.use(errorHandler)
app.listen(port,()=>console.log(`server started on port ${port}`))