const prompt = (name: string) => {
  return `Crie uma frase de uma linha  contendo ${name}, um adjetivo para ${name}, a palavra não, um verbo e um advérbio de lugar ou hora;`;
};

const promptEnglish = (name: string) => {
  return `Create a one-line phrase in portuguese starting with ${name} ; adding an adjective to ${name}; a verb; an adverb of place or time`;
};

const promptTwitter = (tweet: string) => {
  return `Este é um gerador automático de frases usando #OpenAI #gpt3, dm para saber mais. \n ${tweet}`;
};

export { prompt, promptEnglish, promptTwitter };
