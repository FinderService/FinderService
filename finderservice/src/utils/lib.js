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


export function encrypthPass(password){
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, salt) => {
      if(err) reject(err);
		  const newSalt = salt.toString('base64');
		  crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
        if(err){ 
          reject(err);
        }else{
          const encryptedPassword = key.toString('base64')
		      resolve({encryptedPassword, newSalt})
        }
			});
		});
	});
}