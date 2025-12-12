import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database Connected Successfully ${con.connection.host}`);
        

    }catch(error){
        console.log(`Error in connecting to the Database ${error}`);
        
    }
}