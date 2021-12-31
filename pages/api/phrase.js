// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import animal from "../../lib/animal.json";
import adjetivo from "../../lib/adjetivo.json";
import verbo from "../../lib/verbo.json";
import adverbios from "../../lib/adverbios.json";
import getScreenshot from "../../services/carbonController";
import { prompt } from "../../types/prompt.enum";

export async function phraseGenerator() {
  const ditado = ` ${animal[Math.floor(Math.random() * animal.length)]} ${
    adjetivo[Math.floor(Math.random() * adjetivo.length)]
  } não ${verbo[Math.floor(Math.random() * verbo.length)]} ${
    adverbios[Math.floor(Math.random() * adverbios.length)]
  }`;

  const OpenAI = require("openai-nodejs");
  const client = new OpenAI(process.env.NEXT_PUBLIC_OPENAI_API_KEY);

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
      engine: "davinci-instruct-beta-v3",
    }
  );

  return { ditado: result.choices[0].text };
}

export default async function handler(req, res) {
  const { ditado } = await phraseGenerator();

  const getImagePath = await getScreenshot({
    code: ditado,
    language: "JavaScript",
    theme: "DefaultTheme",
    output: "./public/screenshots",
  });

  res.status(200).json({ ditado });
}
