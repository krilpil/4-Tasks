import getPubicKey from '../key/getPubicKey';
import textToCode from '../../shared/helpers/textToCode';

export interface IEncrypt {
  text: string,
  p: number
  q: number
}

const encrypt = ({ text, q, p }: IEncrypt): number[] => {
  const { e, mod } = getPubicKey({ p, q });
  const encryptArray: number[] = [];

  textToCode(text).forEach((element) => {
    encryptArray.push(Number((BigInt(element) ** BigInt(e)) % BigInt(mod)));
  });

  return encryptArray;
};

export default encrypt;
