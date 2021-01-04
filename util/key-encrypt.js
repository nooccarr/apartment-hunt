const { KmsKeyringNode, encrypt, decrypt } = require("@aws-crypto/client-node");

const masterKeyId = "arn:aws:kms:us-east-2:865109414926:key/89e7a42e-ad2e-473c-8e5b-de2cc605dbb1";
const keyring = new KmsKeyringNode({ masterKeyId });

let plainText = "My passwords for senstive data";
const { result } = await encrypt(keyring, plainText, { encryptionContext: context });