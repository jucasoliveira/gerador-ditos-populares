// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prompt, promptEnglish } from '../types/prompt.enum';
import getScreenshot from './carbonController';
import { CarbonParameters } from '../types/carbon.types';
import { sendTweet } from './twitter';
const animal = require('../utils/animal.json');

export async function phraseGenerator() {
  const OpenAI = require('openai-nodejs');

  const client = new OpenAI(process.env.OPENAI_API_KEY);

  const result = await client.complete(prompt(animal[Math.floor(Math.random() * animal.length)]), {
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    engine: 'davinci-instruct-beta-v3'
  });

  const getImagePath = async (params: CarbonParameters) => {
    return await getScreenshot(params);
  };

  const getImageUrl = await getImagePath({
    code: result.choices[0].text,
    language: 'JavaScript',
    theme: 'Solarized (Light)',
    output: `${__dirname}/../public/images/`
  });

  const tweet = sendTweet(result.choices[0].text, getImageUrl);
  return { ditado: result.choices[0].text, image: getImageUrl };
}
