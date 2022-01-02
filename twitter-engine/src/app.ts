import cron from 'node-cron';
import express from 'express';
import * as http from 'http';
import { phraseGenerator } from './services/phrase';
const port = 3500;

const app = express();

app.get('/twitter', async (req, res) => {
  const { ditado } = await phraseGenerator();
  console.log('hello', ditado);
  res.send('hello');
});

// Schedule a task to run every 24 hours
cron.schedule('0 0 * * *', () => {
  console.log('running a task every 24 hours');
});

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
