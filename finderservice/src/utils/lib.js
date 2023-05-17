import crypto from "crypto";

export function verifyPassword(password, userPassword, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 10000, 64, "sha1", (err, key) => {
      if (err) {
        reject(false);
      } else {
        const encryptedPassword = key.toString("base64");
        if (userPassword === encryptedPassword) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}