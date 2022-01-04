import cron from 'node-cron';
import { phraseGenerator } from './services/phrase';
import { sendTweet, streamMentions } from './services/twitter';
require('dotenv').config({ path: './.env' });

// Run once immediately
async function generateTweets() {
  streamMentions();
}

generateTweets();

process.on('exit', function (code) {
  return console.log(`About to exit with code ${code}`);
});
