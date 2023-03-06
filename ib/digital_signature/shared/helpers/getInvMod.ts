interface IGetInvMod {
  x: bigint | number;
  mod: number;
}

const getInvMod = ({x, mod}: IGetInvMod) => {
  if (x > 0) {
    return BigInt(x) % BigInt(mod)
  } else {
    const invMod = BigInt(-mod) + (BigInt(-x) % BigInt(mod));
    return invMod > 0n ? invMod : -invMod
  }
}

export default getInvMod;