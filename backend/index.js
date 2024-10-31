import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from  "dotenv"
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js'
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'


dotenv.config({})

const app = express();

app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"Welcome",
        success:true,
    })
})


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'https://vedan-frontend.onrender.comhttps://vedan-frontend.onrender.comhttps://vedan-frontend.onrender.com', // replace with your frontend url
    credentials: true,
}
app.use(cors(corsOptions))

const PORT = process.env.PORT || 8000;

// api
app.get("/home",(req,res)=>{
    return res.status(200).json({
        message:"Welcome",
        success:true,
    })
})
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
// http://localhost:8000/api/v1/user/register


app.listen(PORT , ()=>{
    connectDB();
    console.log(`server running on port ${PORT}`);
});
