// pages/subPages/refuel/refuel.js
Page({

  /**
   * 页面的初始数据
   */
  options: {
    multipleSlots: true
  },
  data: {
    showMask: false,
    currentTabName: 'distance', // 当前选择的tab
    searchStr: '', // 搜索的关键词
    distanceOption: [
      { text: '3km', value: 0 },
      { text: '5km', value: 1 },
      { text: '10km', value: 2 },
      { text: '15km', value: 15},
      { text: '不限', value: 'none'}
    ],
    oilOption: [
      { text: '92#', value: 92 },
      { text: '95#', value: 95 },
      { text: '98#', value: 98 },
      { text: '0#', value: 0 }
    ],
    otherOption: [
      { text: '距离最近', value: 'near'},
      { text: '价格最低', value: 'low'}
    ],
    distance: 0,
    other: 'near',
    oil: 92
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 筛选条件按钮
  selectBtn (value) {
    console.log(value)
  },
  // 导航按钮
  navigatorBtn () {},
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