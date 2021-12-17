const redis = require('redis').createClient();

exports.get = (key) => {
  return redis.get(key, function (err, res) {
    console.log(`${key}: ${res}`)
    return res;
  });
}

exports.set = (key, value) => {
  redis.set(key, value);
}