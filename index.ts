import {getCiphertext, getDecryption, getKey} from "./ib/digital_signature";


const {publicKey, privateKey} = getKey();
const ciphertext = getCiphertext({message: 'kirill', publicKey, privateKey})

ciphertext.message = 'kirill'

console.log(getDecryption({publicKey, ciphertext}))