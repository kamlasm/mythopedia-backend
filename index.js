import 'dotenv/config';

import { connectToDb } from './db/helpers.js';
// import errorHandler from './middleware/errorHandler.js';
import express from 'express';
import { port } from './config/environment.js';
import characterRouter from './controllers/character.js';
import authRouter from './controllers/auth.js';
import teamRouter from './controllers/team.js';

const app = express();

app.use(express.json());
app.use('/api', authRouter);
app.use('/api', characterRouter);
app.use('/api', teamRouter);
// app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('hello world')
})

async function startServer() {
    try {
      await connectToDb();
      console.log('Database connected');
      app.listen(port, () => console.log(`Listening on Port: ${port}`));
    } catch (err) {
      console.log('Oh no something went wrong');
      console.log(err);
    }
  }
  
  startServer();