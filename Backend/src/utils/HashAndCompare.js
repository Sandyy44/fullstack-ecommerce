import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

export const hash = ({ plaintext, salt = process.env.SALTROUND } = {}) => {
  const hashResult = bcrypt.hashSync(plaintext, parseInt(salt));
  return hashResult;
};

export const compare = ({ plaintext, hashValue } = {}) => {
  const match = bcrypt.compareSync(plaintext, hashValue);
  return match;
};

// // دالة لتشفير نص عادي (مثل بيانات غير كلمة السر)
// export const encrypt = ({ plaintext, secretKey = process.env.ENCRYPTION_KEY } = {}) => {
//   return CryptoJS.AES.encrypt(plaintext, secretKey).toString();
// };

// // دالة لفك التشفير
// export const decrypt = ({ ciphertext, secretKey = process.env.ENCRYPTION_KEY } = {}) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };
