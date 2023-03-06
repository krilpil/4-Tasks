import { CONFIG } from '../../config/config';

interface IGetInverseNumbers {
  e: number,
  phi: number
}

const getInverseNumbers = ({ e, phi }: IGetInverseNumbers): number[] => {
  const inverseNumbers: number[] = [];

  for (let i = 0; i <= CONFIG.P * CONFIG.Q; i++) {
    if ((i * e) % phi === 1) {
      inverseNumbers.push(i);
    }
  }

  return inverseNumbers;
};

export default getInverseNumbers;
