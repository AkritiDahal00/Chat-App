// utils/cryptoRsa.js
const NodeRSA = require('node-rsa');

// Initialize RSA keys (Replace these with your actual keys)
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7TcR4tZBNpsreY+zJdoz
bmA4sY/eBeoFS+frStcDGgciJvEj2u/XT9zjZC+ZR7tX2zohpKNfD1c0HOmWS2O2
I7cUswSOkD6aOZnXpR4DYP5j8M/FphJkI6aG8CZ/Terik1vP4FzIdCzqH+Z3vXzG
rAaNfJvCGpPzU6alUS9lf5SL5vB5aVz2gYH/lIuMyMLgbxU6G2NPuN7XaCZgxoW7
5WtT+yg/FayfjrXTOyKkjXGdoFct7pKXS7f8fg77PVqiwtcmGkE/VRDlh05Z3o1R
K3i+gMiyXYPsRzeMXYm3IZBDejZ7dVWBDoyGKNpM9gZtr68IGDa4Tc6KyK8INMCQ
yQIDAQAB
-----END PUBLIC KEY-----
`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDtfRHl1kE2myt5
j7Ml2jNubDixj94F6gVL5+tK1wMaByIm8SPa79dP3ONkL5lHu1fbOimko18PVzQc
6ZZLY7YjtxyzBI6QPop5mdelHgNg/mPzz8WmEmQjpoZwJn9N6uKTW8/gXMh0LOof
5nd9fMasBo18m8Iak/NTpqVRL2V/lIvm8HlpXPGBgf+Ui4zIwuBvFToLY0+43tdo
JmDGhbvlq1P7KD8VrJ+OtdM7IqSNcZ2gVy3ukpdLt/x+DvvdWqLC1yYaQT9VEOWH
TlnfjVEreL6AyLJdg+xHN4xdibchkEN6Nnt1VYEOjIYo2kz2Bm2vrywYNohNzory
rfAiQzJAgMBAAECggEAAm5YEq55nNAb/IFim9ZK8wO9iE5/AgWJ0X74orKPUMb/O
cRU7QoMrwIjF2CShhZil0PN9EnXHlT3FTKnE1ihJkZjXGB6ZT7EtHbcs+1d/qV5r
XeGfhdqOacsm4fLbM8mpfYyXj/DcBhBgtbES8XUpMJ0HRzTOWoAKOXtZ/O+wIXoc
JFG3ZSP17bLElhq1owWmvdzU1BjmhZVxO6HgqB8HOzZQ7zr6H5trfSope3WTKHDb
5zR+7fK9H3uA9K9+wwuVJK7GsngBoBYAiTZ8L4V0kKoM8xVAE3rxoz+aj5MdUP49
vgTwNPpTDFV56GUDRmZgUN/YFyyanKw5lvcDLlofoQKBgQD/7u3kNplcMyphjpyU
u5uPdxmvA8cIwT6OTYkg54t5O8y8GCZwhtwzMmtxdJXv1y5FbeYKL44n39khOpfT
5Mcvfn1yO2TdyVVpNEg7UuBkf/VzOPgnDqSVwtwW31v22w6WOGyRdSEbfUQvRxNs
Y9RgSHw7Ag84DNN2XjPhRNTAgwKBgQDtt/qJ1v43y66OjiDCeeMG3W4jZtZBmQcs
AQZZ3+Vz4ly43hvF6OG1/W6b5UfyGvP1Fb9nFaMbN6flOY7fUw2H5JNyCblItlh3
VqN2iYpz9f5AbPdGTB45bdjICixJITLemKX/CGVbiHFdt4zVYNRcXIoWBe21iLe1
vX2vxxfHoQKBgQDMJdj3wYFAUm5P1c6m9nqLGq2OnylXsjil4kgIYOsIULMRTYSA
hNcN3yzq6y4dGCdWzoeR9pOHufqzZP6WLEiAoxUnUGx5muys3g7gYCh0iNP7ejmD
/QZTJnlC4b1g5UlHgAiITfrVZUl4Zh3bnJsMIKE0jeDe8/A3O3ovlZDYHQKBgQC/
7HMDXzk7l+LtRtRpMYU3DhxukG8ldVotbsgPvTTWTC2gmbV4axU5HQNF+mq3kt0G
KmrW05QtjDWdMkzTFUR85Hae9VR2t3OiAmH9FO36Pmp6Ap2v1Ln+8uOQ9vL1Oa5l
7yyc1aS0DyH9ouMvzDXbmOQj/3TxxMaR88EG6KNEsQKBgE66fbb8/MtP7KsR+pLy
ykt4jJ3A1kGRCglJ5T+5GmKmi24L8qDo0ZwATPI6akVKHaZXKNyTXmUuCHwRbBX7
eTFngJ5dfujif8O98KtBWpd7u2KsRMLhs9aA5uHwmYRRzB9QovqspGp2eckb6Ynk
WeY8HsyhNFX4AxltLgt/Tjf7
-----END PRIVATE KEY-----
`;

// Encrypt function
const encrypt = (message) => {
  const key = new NodeRSA(publicKey);
  return key.encrypt(message, 'base64');
};

// Decrypt function
const decrypt = (encryptedMessage) => {
  const key = new NodeRSA(privateKey);
  return key.decrypt(encryptedMessage, 'utf8');
};

module.exports = { encrypt, decrypt };
