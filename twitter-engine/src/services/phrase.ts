// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as animal from '../utils/animal.json';
import * as adverbios from '../utils/adverbios.json';
import { promptEnglish, prompt } from '../types/prompt.enum';
import getScreenshot from './carbonController';
import { CarbonParameters } from '../types/carbon.types';

export async function phraseGenerator() {
  const OpenAI = require('openai-nodejs');
  console.log(process.env);
  /*
  const client = new OpenAI(process.env.OPENAI_API_KEY);

  const result = await client.complete(
    prompt(
      animal[Math.floor(Math.random() * animal.length)],
      adverbios[Math.floor(Math.random() * adverbios.length)]
    ),
    {
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      engine: 'davinci-instruct-beta-v3'
    }
  );
  */

  const getImagePath = async (params: CarbonParameters) => {
    return await getScreenshot(params);
  };

  const getImageUrl = await getImagePath({
    code: 'texto randomigo',
    language: 'JavaScript',
    theme: 'Solarized (Light)',
    output: 'screenshots'
  });

  return { ditado: 'texto', image: getImageUrl };
}
