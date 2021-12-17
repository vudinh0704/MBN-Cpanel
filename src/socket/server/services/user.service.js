var User = require('../models/user.model')
var logError = require('../errorHandling.config')

module.exports = {
  getById: async function (userId) {
    try {
      return await User.getById(userId)
    } catch (err) {
      logError(err)
    }
  }
}