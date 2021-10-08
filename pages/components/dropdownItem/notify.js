var tempValue = ''
export default {
  tabchange: '',
  send (value) { // 发送通知
    this.tabchange = value
  },
  stream (callback) { // 接收通知
    Object.defineProperty(this, 'tabchange', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        tempValue = value
        callback && callback()
      },
      get: function () {
        return tempValue
      }
    })
  }
}
