var Redis = require('redis')
var Bluebird = require('bluebird')
Bluebird.promisifyAll(Redis.RedisClient.prototype)
Bluebird.promisifyAll(Redis.Multi.prototype)

const host = `${process.env.REDIS_HOST}`
const port = process.env.REDIS_PORT
var client = Redis.createClient({host, port})

client.on('connect', function () {
  console.log('connected')
})

module.exports = client