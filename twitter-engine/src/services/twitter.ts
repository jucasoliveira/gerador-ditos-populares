import axios from 'axios';
import Twitter from 'twitter-lite';
import fs from 'fs';
import path from 'path';
import { TwitterClient } from 'twitter-api-client';

export const sendTweet = (tweet: string, image: string) => {
  const twitterClient = new TwitterClient({
    apiKey: `${process.env.TWITTER_CONSUMER_KEY}`,
    apiSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    accessToken: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
    accessTokenSecret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`,
    ttl: 120, // seconds. Defaults to 360
    disableCache: true, // Disables the caching behavior. Defaults to 'false'
    maxByteSize: 32000000 // Maximum (approximated) memory size for cache store. Defaults to 16000000.
  });

  const mediaFile = fs.readFileSync(path.join(__dirname, '../public/images/', image));

  const mediaPath = path.join(__dirname, '../public/images/', image);
  const mediaType = 'image/png';
  const mediaData = require('fs').readFileSync(mediaPath);
  const mediaSize = require('fs').statSync(mediaPath).size;

  initUpload() // Declare that you wish to upload some media
    .then(appendUpload) // Send the data for the media
    .then(finalizeUpload) // Declare that you are done uploading chunks
    .then(statusesUpdate); // Send the tweet with the media attached

  /**
   * Step 1 of 4: Initialize a media upload
   * @return Promise resolving to String mediaId
   */
  async function initUpload() {
    const data = await twitterClient.media.mediaUploadInit({
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
    const data = await twitterClient.media.mediaUploadAppend({
      command: 'APPEND',
      media_id: mediaId,
      // media: mediaData,
      // media: mediaData.toString(),
      // media_data: mediaData.toString("base64"),
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
    const data = await twitterClient.media.mediaUploadFinalize({
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
    const data = await twitterClient.tweets.statusesUpdate({
      status: tweet,
      media_ids: mediaId
    });
    console.log('FINALIZE status', data.text);
    return mediaId;
  }
};
