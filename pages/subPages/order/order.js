// pages/subPages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        title: '全部',
        name: 'all'
      }, {
        title: '待支付',
        name: 'a'
      }, {
        title: '已完成',
        name: 'b'
      }, {
        title: '已关闭',
        name: 'c'
      }
    ],
    activeTab: 0,
    listData: [1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabChange (e) {
    console.log(e)
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