import { IGetKey } from '../../shared/types/key';
import getExponent from '../../shared/helpers/getEilerNumber';

interface IPublicKey {
  e: number;
  mod: number;
}

const getPubicKey = ({ p, q }: IGetKey): IPublicKey => {
  const mod = p * q;
  const e = getExponent({ p, q });

  return { e, mod };
};


export default getPubicKey;
