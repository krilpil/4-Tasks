import getPrivateKey from '../key/getPrivateKey';

export interface IDecrypt {
  encrypted: number[],
  p: number
  q: number
}

const decrypt = ({ encrypted, q, p }: IDecrypt) => {
  const { d, mod } = getPrivateKey({ p, q });

  const decryptCode: string[] = encrypted.map((element) => {
    return String.fromCharCode(Number((BigInt(element) ** BigInt(d)) % BigInt(mod)));
  });

  return decryptCode.join('');
};

export default decrypt;
