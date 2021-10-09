var tempValue = ''
export default {
  currentPos: {
    latitude: '',
    longitude: '',
    address: '', // 存储当前定位的地址
    province: '', // 存储省/直辖市名称
    tamp: '0' // 戳标记
  },
  sendPosition (value) { // 发送位置更改通知
    this.currentPos.tamp = value
  },
  listenPosition (callback) { // 位置通知监听
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