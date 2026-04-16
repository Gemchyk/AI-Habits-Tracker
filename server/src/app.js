import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {connectDB} from './db/index.js'

dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());


async function startServer(){
  await connectDB();

  app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
}


startServer();

