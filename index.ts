import { CONFIG } from './ib/rsa/config/config';
import { decrypt, encrypt } from './ib/rsa/index';

const p = CONFIG.P;
const q = CONFIG.Q;

const encrypted: number[] = encrypt({ p, q, text: 'Hello, how are you?))))' });
const decrypted: string = decrypt({ p, q, encrypted });

console.log(encrypted, decrypted);
