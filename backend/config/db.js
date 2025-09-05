import mongoose from "mongoose";

const connectDb=async ()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("MongoDB Connected Successfully");
    }catch(error){
     console.log("MongoDB Does not connected :",error);
     process.exit(1);
    }
}
export default connectDb