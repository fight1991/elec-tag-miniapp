// pages/main/main.js
import messageNotify from "../../notify/messageNotify"
var app = getApp()
const { noticeCount } = app.api
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
    subId: [], //需要订阅的id
    navBarHeight: 60,
    navTop: 0,
    menuButtonInfo:{},
    carTotal: 0,
    showMessage: false,
    timer: null
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
  onUnload: function (options) {
    this.clearTime()
  },
  onShow: function () {
    if (!this.data.timer){
      //只请求一次广播未读消息数量
      if (app.globalData.userInfo.uid) {
        this.getNoticeCount()
      }
    }
    let date = wx.getStorageSync('saveSubDate')
    if (date) {
      let now = app.utils.formatDate(new Date().getTime())
      if (date == now) {
        return
      }
    }
    // 未授权订阅消息,弹出弹框
    app.utils.getSetSubscription(ids).then((obj) => {
      //从未授权过任何一个订阅消息弹出,且未点击,总是选择,显示所有订阅消息模板(最多3条)
      if (obj && obj.show) {
        this.openMessage(ids)
        return
      }
      //在优惠券等其他地方授权过,并点击总是选择,筛选出未选择的模板,并再次弹窗授权
      let arr = app.utils.unincludeArr(obj, ids)
      if (arr.length) {
        this.openMessage(arr)
        return
      }
    })
  },
  onReady: function () {
    
  },
  //获取未读消息
  async getNoticeCount() {
    let { result, other, error } = await noticeCount()
    if (result > 0) {
      this.data.timer = setTimeout(()=>{
        this.getNoticeCount()
      },5000)
     if (this.temNum == result) return
     this.temNum = result
      // 广播未读消息数量
      wx.showTabBarRedDot({index:1})
      messageNotify.send(result)
    } else {
      // 未读消息数量置为0，并广播
      if (this.temNum == result) return
      this.temNum = result
      wx.hideTabBarRedDot({index:1})
      messageNotify.send(0)
    }
    // 接口报错后不在请求
    if (other || error) {
      this.clearTime()
    }
  },
  clearTime () {
    this.data.timer && clearTimeout(this.data.timer)
    this.data.timer = null
  },
  //打开订阅弹窗
  openMessage(ids) {
    this.data.subId = [...ids]
    this.setData({
      showMessage: true
    })
    //保存打开的时间
    let now = app.utils.formatDate(new Date().getTime())
    wx.setStorageSync('saveSubDate', now)
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