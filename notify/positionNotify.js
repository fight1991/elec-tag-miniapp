var tempValue = ''
export default {
  currentPos: {
    latitude: '',
    longitude: '',
    title: '', // 存储当前定位的名称
    province: '', // 存储省/直辖市名称
    tamp: '0', // 戳标记
    city: '', //城市名称
    pois: [], // 当前位置的周边信息
  },
  savePosition ({ latitude = '', longitude = '', title = '', province = '', city = '', pois = []}) {
    this.currentPos.latitude = latitude
    this.currentPos.longitude = longitude
    this.currentPos.title = title
    this.currentPos.province = province
    this.currentPos.city = city
    this.currentPos.pois = pois

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