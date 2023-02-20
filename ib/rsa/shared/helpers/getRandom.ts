const getRandom = (numberArray): number => {
  const randomIndex = Math.floor(Math.random() * (numberArray.length - 1 + 1));
  return numberArray[randomIndex];
};

export default getRandom;
