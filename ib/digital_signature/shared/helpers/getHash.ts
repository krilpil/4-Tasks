import {createHash} from "crypto";

const getHash = (message: string): bigint => {
  const md5 = createHash('md5').update(message).digest('hex');
  return BigInt(`0x${md5.substring(0, 7)}`);
}

export default getHash;