import 'dotenv/config'; 
import connectDB from './db/connect.js';
import {app} from "./app.js"


console.log(process.env.MONGODB_URI + "hello");
connectDB()
.then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
      })
  })
  .catch((err) => {
      console.log("MONGO db connection failed !!! ", err);
  })