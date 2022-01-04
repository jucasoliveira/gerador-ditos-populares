import fs from 'fs';
import path from 'path';
import { TwitterClient } from 'twitter-api-client';
import Twitter from 'twitter-lite';
import { promptTwitter } from '../types/prompt.enum';
import { configLite, configSend } from '../types/twitter.enum';
import { phraseGenerator } from './phrase';

export const sendTweet = (in_reply_to_status_id: number | string, tweet: string, image: string) => {
  try {
    const client = new TwitterClient({
      ...configSend()
    });
    const mediaPath = path.join(__dirname, '../public/images/', image);
    const mediaType = 'image/png';
    const mediaSize = require('fs').statSync(mediaPath).size;

    initUpload() // Declare that you wish to upload some media
      .then(appendUpload) // Send the data for the media
      .then(finalizeUpload) // Declare that you are done uploading chunks
      .then(statusesUpdate)
      .catch((err) => {
        console.log(err);
      }); // Send the tweet with the media attached

    /**
     * Step 1 of 4: Initialize a media upload
     * @return Promise resolving to String mediaId
     */
    async function initUpload() {
      const data = await client.media.mediaUploadInit({
        command: 'INIT',
        total_bytes: mediaSize,
        media_type: mediaType
      });
      console.log('INIT data', data);
      return data.media_id_string;
    }

    /**
     * Step 2 of 4: Append file chunk
     * @param String mediaId    Reference to media object being uploaded
     * @return Promise resolving to String mediaId (for chaining)
     */
    async function appendUpload(mediaId: any) {
      const data = await client.media.mediaUploadAppend({
        command: 'APPEND',
        media_id: mediaId,
        media_data: require('fs').readFileSync(mediaPath, { encoding: 'base64' }),
        segment_index: '0'
      });
      console.log('APPEND data', data);
      return mediaId;
    }

    /**
     * Step 3 of 4: Finalize upload
     * @param String mediaId   Reference to media
     * @return Promise resolving to mediaId (for chaining)
     */
    async function finalizeUpload(mediaId: any) {
      const data = await client.media.mediaUploadFinalize({
        command: 'FINALIZE',
        media_id: mediaId
      });
      console.log('FINALIZE data', data);
      return mediaId;
    }

    /**
     * Step 4 of 4: Update Status
     * @param String mediaId   Reference to media
     * @return Promise resolving to mediaId (for chaining)
     */
    async function statusesUpdate(mediaId: string) {
      const data = await client.tweets.statusesUpdate({
        status: tweet,
        media_ids: mediaId,
        in_reply_to_status_id: in_reply_to_status_id,
        auto_populate_reply_metadata: true
      });
      console.log('FINALIZE status', data.text);
      return mediaId;
    }
  } catch (err) {
    console.log(err);
  }
};

// stream mentions of the twitter profile and answer with a random phrase
export const streamMentions = async () => {
  try {
    const twitterClient = new Twitter({ ...configLite() });

    const parameters = {
      track: '@umditadopopular roll'
    };

    twitterClient
      .stream('statuses/filter', parameters)
      .on('start', (response) => console.log('Streaming messages of @umditadopopular'))
      .on('data', async (tweet: any) => {
        const { ditado, image } = await phraseGenerator();
        const tweetText = `@${tweet.user.screen_name} ${promptTwitter()}`;
        const { id_str } = tweet;
        sendTweet(id_str, tweetText, image);
        // callback(tweetText, image);
      })
      .on('error', (error: any) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
