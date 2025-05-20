const CryptoJS = require('crypto-js');

const secretKey = '12345678901234567890123456789012'; 

function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };
