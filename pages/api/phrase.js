// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import animal from "../../lib/animal.json";
import adjetivo from "../../lib/adjetivo.json";
import verbo from "../../lib/verbo.json";
import adverbios from "../../lib/adverbios.json";
import getScreenshot from "../../services/carbonController";

export async function phraseGenerator() {
  const ditado = `${adjetivo[Math.floor(Math.random() * adjetivo.length)]} ${
    animal[Math.floor(Math.random() * animal.length)]
  } ${verbo[Math.floor(Math.random() * verbo.length)]} ${
    adverbios[Math.floor(Math.random() * adverbios.length)]
  }`;

  return { ditado };
}

export default async function handler(req, res) {
  const { ditado } = await phraseGenerator();

  const getImagePath = await getScreenshot({
    code: ditado,
    language: "JavaScript",
    theme: "DefaultTheme",
    output: "./public/screenshots",
  });

  const imagePath = getImagePath.replace("public", "");

  res.status(200).json({ ditado });
}
