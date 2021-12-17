const crypto = require('crypto');
const SHA1KEY = `${process.env.SHA1KEY}`

exports.getSHA1 = (arr) => {
  console.log(`${arr.join('|')}|${SHA1KEY}`)
  return crypto.createHash('sha1').update(`${arr.join('|')}|${SHA1KEY}`).digest("hex");
}

exports.validSHA1 = (arr, sig) => {
  console.log(this.getSHA1(arr))
  return sig === this.getSHA1(arr);
}