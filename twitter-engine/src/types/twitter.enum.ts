const configLite = () => {
  return {
    consumer_key: `${process.env.TWITTER_CONSUMER_KEY}`,
    consumer_secret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    access_token_key: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
    access_token_secret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`
  };
};

const configSend = () => {
  return {
    apiKey: `${process.env.TWITTER_CONSUMER_KEY}`,
    apiSecret: `${process.env.TWITTER_CONSUMER_SECRET}`,
    accessToken: `${process.env.TWITTER_ACCESS_TOKEN_KEY}`,
    accessTokenSecret: `${process.env.TWITTER_ACCESS_TOKEN_SECRET}`,
    ttl: 120, // seconds. Defaults to 360
    disableCache: true, // Disables the caching behavior. Defaults to 'false'
    maxByteSize: 32000000 // Maximum (approximated) memory size for cache store. Defaults to 16000000.
  };
};

export { configLite, configSend };
