const mongoose =require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("connected to db"))
    .catch((error)=>{
        console.log("error connecting to db");
        console.error(error);
        process.exit(1);
    })
}