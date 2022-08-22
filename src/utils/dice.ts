export const getRandomIntInclusive = (min: number, max: number): number => {
  const minCeil = Math.ceil(min);
  const maxCeil = Math.floor(max);
  return Math.floor(Math.random() * (maxCeil - minCeil + 1) + minCeil);
};

export const roll = () => getRandomIntInclusive(1, 6);
