var tempValue = ''
export default {
  currentPos: {
    latitude: '',
    longitude: '',
    address: ''
  },
  notifyPos (callback) {
    let that = this
    Object.defineProperty(that.currentPos, 'address', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        tempValue = value
        callback(that.currentPos)
      },
      get: function () {
        return tempValue
      }
    })
  }
}