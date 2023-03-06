import {ICiphertext} from "../../shared/types/ICiphertext";
import {IPrivateKey, IPublicKey} from "../../shared/types/IKeys";
import getHash from "../../shared/helpers/getHash";
import getInvMod from "../../shared/helpers/getInvMod";

type IGetDecryption = {
  publicKey: IPublicKey,
  ciphertext: ICiphertext,
}

const getDecryption = ({publicKey, ciphertext}: IGetDecryption): boolean => {
  const {y, p, g} = publicKey
  const {message, s, r} = ciphertext

  const m = getHash(message);

  const yr = getInvMod({x: y ** r, mod: p})
  const rs = getInvMod({x: r ** s, mod: p})
  const yrrs = getInvMod({x: yr * rs, mod: p})

  const gm = getInvMod({x: BigInt(g) ** m, mod: p})

  return gm === yrrs
}

export default getDecryption