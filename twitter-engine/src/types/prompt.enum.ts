const prompt = (name: string, adverbios: string) => {
  return `Crie um ditado com uma linha começando com ${name} ; adicionando um adjetivo para ${name}; a palavra não; um verbo; um advérbio de lugar ou hora`;
};

const promptEnglish = (name: string, adverbios: string) => {
  return `Create a phrase starting with an animal name ; adding an adjective to the animal; a verb; an adverb of place or time`;
};

export { prompt, promptEnglish };
