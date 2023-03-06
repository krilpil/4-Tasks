import getRandomArbitrary from "../../shared/helpers/getRandomArbitrary";
import {IPrivateKey, IPublicKey} from "../../shared/types/IKeys";
import {ICiphertext} from "../../shared/types/ICiphertext";
import getInvMod from "../../shared/helpers/getInvMod";
import {createHash} from "crypto";
import getHash from "../../shared/helpers/getHash";
import getGreatestCommonDivisor from "../../shared/helpers/getGreatestCommonDivisor";

interface IGetCiphertext {
  message: string,
  publicKey: IPublicKey,
  privateKey: IPrivateKey,
}

const getCiphertext = ({message, publicKey, privateKey}: IGetCiphertext): ICiphertext => {
  const {g, p} = publicKey
  const {x} = privateKey

  const m = getHash(message);

  const k = getGreatestCommonDivisor(p - 1)

  const r = g ** k % p;

  const leftS = getInvMod({x: k, mod: p - 1})
  const rightS = getInvMod({x: m - BigInt(x * r), mod: p - 1})
  const s = getInvMod({x: leftS * rightS, mod: p - 1})

  return {message, r, s: Number(s)}
}

export default getCiphertext;