interface IGetRandomArbitrary {
  max: number,
  min: number
}

const getRandomArbitrary = ({min, max}: IGetRandomArbitrary): number => {
  return Math.floor(Math.random() * (max - min) + min);
}

export default getRandomArbitrary;