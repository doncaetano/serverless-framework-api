'use strict'

module.exports = function GetUser(user) {
  this.user = user

  this.execute = async function(id) {
    const user = await this.user.findById(id)
    return { user }
  }
}