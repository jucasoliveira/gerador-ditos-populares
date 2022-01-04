const prompt = (name: string) => {
  return `Crie um ditado popular, de uma linha, em português começando com ${name}, adicionando um adjetivo para ${name}, contendo a palavra não,  um verbo e um advérbio de lugar ou hora.`;
};

const promptEnglish = (name: string) => {
  return `Create a one-line phrase in portuguese starting with ${name} ; adding an adjective to ${name}; a verb; an adverb of place or time`;
};

const promptTwitter = () => {
  return `Este é um #twitter #bot gerador automático de frases usando #OpenAI #gpt3.`;
};

export { prompt, promptEnglish, promptTwitter };
