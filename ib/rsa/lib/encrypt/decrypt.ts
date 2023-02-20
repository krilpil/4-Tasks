import getPrivateKey from '../key/getPrivateKey';
import codeToText from '../../shared/helpers/codeToText';

export interface IDecrypt {
  encrypted: number[],
  p: number
  q: number
}

const decrypt = ({ encrypted, q, p }: IDecrypt) => {
  const { d, mod } = getPrivateKey({ p, q });

  const decryptArray: number[] = encrypted.map((element) => {
    return Number((BigInt(element) ** BigInt(d)) % BigInt(mod));
  });

  return codeToText(decryptArray);
};

export default decrypt;
