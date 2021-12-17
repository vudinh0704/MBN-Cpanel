var redis = require('../redis.config')
var Promise = require('bluebird')

module.exports = class User {
  constructor (userId, userName, displayName, socketId) {
    this.userId = userId
    this.userName = userName
    this.displayName = displayName
    this.socketId = socketId
  }

  static async getById (userId) {
    var user = await redis.hgetallAsync('user:' + userId)
    return Promise.resolve(new User(user.userId, user.userName, user.displayName))
  }

  static async addUser (user) {
    await Promise.all([redis.hmsetAsync('user:' + user.userId, user)])
    return Promise.resolve(user)
  }

  static async deleteUser (userId) {
    var delResult = await redis.delAsync(['user:' + userId])
    return Promise.resolve(delResult)
  }

  toString () {
    return 'user : [userId:' + this.userId + ', userName:' + this.userName + ', displayName:' + this.displayName + ']'
  }
}