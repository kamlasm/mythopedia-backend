import 'dotenv/config';

import { connectToDb } from '../../db/helpers.js';
import errorHandler from '../../middleware/errorHandler.js';
import express from 'express';
import { port } from '../../config/environment.js';
import characterRouter from '../../controllers/character.js';
import monsterRouter from '../../controllers/monster.js';
import authRouter from '../../controllers/auth.js';
import gameRouter from '../../controllers/game.js';

import cors from 'cors' 
import serverless from "serverless-http"  

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', authRouter);
app.use('/api', characterRouter);
app.use('/api', monsterRouter);
app.use('/api', gameRouter);
app.use(errorHandler);

async function startServer() {
    try {
      await connectToDb();
      console.log('Database connected');
      
    } catch (err) {
      console.log('Oh no something went wrong');
      console.log(err);
    }
  }
  
  startServer();

  export const handler = serverless(app)