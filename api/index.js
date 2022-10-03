const  express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

app.use("/images", express.static(path.join(__dirname, "public/images"))); /* si uso el path "/images" en vez de hacer
algun request voy a ir directamente a la direccion "public/images"  */


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req,res)=>{ /* upload.single("file") hace el upload automaticamente, solo tengo que retornar la res */
    try {
        return res.status(200).json("File uploaded successfully.");
    } catch (err) {
        console.log(err);
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);




app.listen(8800, ()=>{
    console.log("Backend server is running")
})