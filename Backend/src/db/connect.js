import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://ayushmeenacs:8349587323@cluster0.tcbbl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;