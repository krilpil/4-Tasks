import getRandomArbitrary from "../../shared/helpers/getRandomArbitrary";
import {IPrivateKey, IPublicKey} from "../../shared/types/IKeys";
import getInvMod from "../../shared/helpers/getInvMod";

interface IKeys {
  publicKey: IPublicKey,
  privateKey: IPrivateKey,
}

const getKey = (): IKeys => {
  const p = 11;
  const g = 2;

  const x = getRandomArbitrary({min: 1, max: p});
  const y = getInvMod({x: g ** x, mod: p});

  return {
    publicKey: {p, g, y: Number(y)},
    privateKey: {x},
  }
}

export default getKey;

