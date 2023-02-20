import getPrimeNumbers from './getPrimeNumbers';
import getMutuallyPrimeNumbers from './getMutuallyPrimeNumbers';

interface IGetEilerNumber {
  p: number;
  q: number;
}

const getExponent = ({ p, q }: IGetEilerNumber): number => {
  const phi = (p - 1) * (q - 1);

  const primeNumbers: number[] = getPrimeNumbers({ limitation: phi });

  const mutuallyPrimeNumbers = getMutuallyPrimeNumbers({ primeNumbers, limitation: phi });

  return mutuallyPrimeNumbers[0];
};

export default getExponent;
