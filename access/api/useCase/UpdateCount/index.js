'use strict'

module.exports = function UpdateCount(countApi) {
  this.countApi = countApi

  this.execute = async function(key) {
    const result = await this.countApi.hit(key)
    if(result.value && result.status === 200) {
      return { value: result.value }
    } else {
      return { error: 'Some problem occurred while updating the value.' }
    }
  }
}