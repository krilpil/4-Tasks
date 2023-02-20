import { IGetKey } from '../../shared/types/key';
import getInverseNumbers from '../../shared/helpers/getInverseNumbers';
import getRandom from '../../shared/helpers/getRandom';
import getExponent from '../../shared/helpers/getEilerNumber';

interface IPrivateKey {
  d: number,
  mod: number,
}

const getPrivateKey = ({ p, q }: IGetKey): IPrivateKey => {
  const phi = (p - 1) * (q - 1);
  const mod = p * q;
  const e = getExponent({ p, q });

  const inverseNumbers = getInverseNumbers({ e, phi });

  const d = getRandom(inverseNumbers);

  return { d, mod };
};

export default getPrivateKey;
