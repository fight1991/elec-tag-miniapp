// pages/subPages/refuel/search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    focus: false,
    historyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { searchStr } = options
    if (searchStr) {
      this.setData({
        value: searchStr
      })
    }
    this.readHistory()
  },
  // 确定按钮
  confirmBtn (e) {
    console.log(e.detail)
    let str = e.detail.trim()
    if (str.length == 0) {
      app.messageBox.common('请输入关键字')
      return
    }
    this.getPrePage((prePage) => {
      prePage.setData({
        searchStr: str
      })
      // 存储搜索记录
      this.setHistory(str)
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  // 获取上一页面
  getPrePage (callback) {
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    if (prePage) {
      callback && callback(prePage)
    }
  },
  // 点击历史记录
  historyBtn (e) {
    let str = e.target.id
    this.getPrePage((prePage) => {
      prePage.setData({
        searchStr: str
      })
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  // 存储历史记录
  setHistory (str) {
    let { historyList } = this.data
    if (historyList.indexOf(str) > 0) return
    if (historyList.length > 9) {
      historyList.pop()
    }
    historyList.unshift(str)
    wx.setStorage({
      key: 'historyList',
      data: historyList
    })
  },
  // 读取本地历史记录
  readHistory () {
    wx.getStorage({
      key: 'historyList',
      success: (res) => {
        if (res.data.length > 0) {
          this.setData({
            historyList: res.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      focus: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})