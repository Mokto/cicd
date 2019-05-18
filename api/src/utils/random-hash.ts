const crypto = require('crypto');

export const generateRandomHash = (length: number = 8) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (err, buf) => {
            if (err) {
                return reject(err);
            }
            resolve(buf.toString('hex'));
          });
    });
}