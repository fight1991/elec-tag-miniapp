var tempValue = ''
export default {
  currentPos: {
    latitude: '',
    longitude: '',
    address: '',
    tamp: '0' // 戳标记
  },
  notifyPos (callback) {
    let that = this
    callback && callback(that.currentPos)
    Object.defineProperty(that.currentPos, 'tamp', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        tempValue = value
        callback && callback(that.currentPos)
      },
      get: function () {
        return tempValue
      }
    })
  }
}