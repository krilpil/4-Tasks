import getPubicKey from '../key/getPubicKey';

export interface IEncrypt {
  text: string,
  p: number
  q: number
}

const encrypt = ({ text, q, p }: IEncrypt): number[] => {
  const { e, mod } = getPubicKey({ p, q });
  const encryptArray: number[] = [];

  for (let index = 0; index < text.length; index++) {
    encryptArray.push(Number((BigInt(text.charCodeAt(index)) ** BigInt(e)) % BigInt(mod)));
  }

  return encryptArray;
};

export default encrypt;
