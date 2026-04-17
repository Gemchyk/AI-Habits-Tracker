import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {connectDB} from './db/index.js'
import router from './routes/router.js';

dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/history', router)


async function startServer(){
  await connectDB();

  app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
}


//TODO: Write a post and get endpoints and finish services, routes and controllers

startServer();


