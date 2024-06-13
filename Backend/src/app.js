import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js'; 

const app = express();
app.use(cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
}))
app.use(express.json({ limit: '16kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));

app.use('/api/users', userRouter);
app.get("/", (req, res)=>{
      res.status(200).send("chal ja re");
})

export { app };
