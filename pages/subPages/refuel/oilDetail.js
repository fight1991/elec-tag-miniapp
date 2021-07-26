// pages/subPages/refuel/oilDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTop: 0,
    navHeight: 0,
    selection: ['92#', '95#', '98#', '0#'],
    selectionIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystem()
  },
  // 打开选择油号面板
  showSheet () {
    wx.showActionSheet({
      itemList: this.data.selection,
      success: res => {
        if (res.cancel) return
        if (res.tapIndex == this.data.selectionIndex) return
        this.setData({
          selectionIndex: res.tapIndex
        })
      }
    })
  },
  // 获取并计算顶部状态栏+导航栏的高度
  getSystem () {
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpxScale = 750 / systemInfo.windowWidth
    // 状态栏的高度
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    // 导航栏的高度
    let navigationHeight = 44 * pxToRpxScale
    console.log(ktxStatusHeight, navigationHeight)
    this.setData({
      navTop: ktxStatusHeight,
      navHeight: navigationHeight
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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