const crypto = require('crypto');
const randomBytes = crypto.randomBytes(32);
console.log(randomBytes.toString('base64'));