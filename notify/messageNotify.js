var tempValue = ''
export default {
  noticeNum: 0,
  send (value) { // 发送通知
    this.noticeNum = value
  },
  listen (callback) { // 接收通知
    // callback初始值
    callback && callback(this.noticeNum)
    Object.defineProperty(this, 'noticeNum', {
      configurable: true,
      enumerable: true,
      set: function (value) {
        tempValue = value
        callback && callback(value)
      },
      get: function () {
        return tempValue
      }
    })
  }
}
