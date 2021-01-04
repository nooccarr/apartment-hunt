const { KmsKeyringNode, encrypt, decrypt } = require("@aws-crypto/client-node");

const masterKeyId = "";
const keyring = new KmsKeyringNode({ masterKeyId });

let plainText = "My passwords for senstive data";
const { result } = await encrypt(keyring, plainText, { encryptionContext: context });
