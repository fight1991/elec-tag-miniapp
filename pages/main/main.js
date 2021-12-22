// pages/main/main.js
var app = getApp()
var ids = [
  'jPI0V6INVLfenOKIcIKgEm7u6HsmYalFbSzuhW9z2SQ',
  'dGzLt6wrQP6jM8AUKeCXYEvEmFQULpuNXxBZU_PgipA',
  'sn0i1ZcOYmTGkyEYku7tvf3oQPCYVW-nlNqNyI1Oq20',
  // 'G3xuHbzv-FJLRVWaLQ_As5QmIWVmpZHHzdq0GVkajBQ',
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
    navBarHeight: 60,
    navTop: 0,
    menuButtonInfo:{},
    carTotal: 0,
    showMessage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navBarHeight: app.getSafeData()['bottomTop'],
      navTop: app.getSafeData()['navTop']
    })
  },
  onShow: function () {
    // 未授权订阅消息,弹出弹框
   let res = app.utils.getSetSubscription(ids)
    if (res) {
      this.setData({
        showMessage: true
      })
    }
  },
  onReady: function () {
    
  },
  showSubscription() {
    // 获取系统订阅弹窗
    app.utils.showSubscription(ids,() => {
      this.setData({
        showMessage: false
      })
    })
  },
  // 获取车辆数量
  getCarNum (e) {
    this.data.carTotal = e.detail
    this.setData({
      carTotal: e.detail
    })
  }
})