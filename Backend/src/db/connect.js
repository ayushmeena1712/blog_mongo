import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectionInstance = {
    isConnected: false,
};

const connectDB = async () => {
    try {
        if(connectionInstance.isConnected){
            console.log("using the existing connection")
            return;
        }
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        connectionInstance.isConnected = mongoose.connections[0].readyState === 1 ? true: false;
        console.log(`\n MongoDB connected !! DB HOST: ${db.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    } 
}

export default connectDB