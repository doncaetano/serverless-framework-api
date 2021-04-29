'use strict'

module.exports = function GetCount(countApi) {
  this.countApi = countApi
  this.lastSuccessCount = 0

  this.execute = async function(key) {
    const result = await this.countApi.get(key)
    console.log('asdasd')
    console.log(result)
    if(result.status === 404) {
      return 0
    } else if (result.status === 200) {
      this.lastSuccessCount = result.value
      return result.value
    } else {
      return this.lastSuccessCount
    }
  }
}