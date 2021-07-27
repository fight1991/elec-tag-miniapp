// pages/subPages/wash/wash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distanceOption: [
      { text: '3km', value: 0 },
      { text: '5km', value: 1 },
      { text: '10km', value: 2 },
      { text: '15km', value: 15},
      { text: '不限', value: 'none'}
    ],
    otherOption: [
      { text: '距离最近', value: 'near'},
      { text: '价格最低', value: 'low'}
    ],
    distance: 0,
    other: 'near',
    // 下拉刷新
    listData: [1,2,3,4,5,6],
    hasMore: true,
    loading: false, // 列表数据是否处于加载中
		end: false, // 列表数据加载完成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getList () {
    this.setData({
			loading: true
		})
    setTimeout(() => {
      this.setData({
				loading: false
			})
    }, 3000);
  },
  refresh () {
    this.getList()
  },
  more () {
    console.log('哈哈')
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