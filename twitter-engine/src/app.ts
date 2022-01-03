import cron from 'node-cron';
import { phraseGenerator } from './services/phrase';
require('dotenv').config({ path: './.env' });

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
  const { image, ditado } = await phraseGenerator();
  console.log(`generetad phrase: ${ditado} and image: ${image}`);
});

// Schedule a task to run every 24 hours
cron.schedule('0 0 * * *', async () => {
  const { image, ditado } = await phraseGenerator();
});

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});
