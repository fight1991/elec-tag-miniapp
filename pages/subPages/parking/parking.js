// pages/subPages/parking/parking.js
var app = getApp()
const { parkingList, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchForm: {
      latitude: '',
      longitude: '',
      sortType: 'distance'
    },
    serviceText: {},
    parkingInfo: {},
    total: 0,
    currentAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getCurrentPositionInfo()
    this.setData({
      serviceText: await translateDic('orgServiceTag')
    })
  },
  // 获取经纬度及地址信息
  getCurrentPositionInfo () {
    app.notifyPos(({ latitude, longitude, address }) => {
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      this.setData({
        address
      })
      // 获取附近的停车场
      this.getParkingList()
    })
  },
  // 刷新按钮
  refreshBtn () {
    this.getParkingList()
  },
  // 附近的停车场
  async getParkingList () {
    let { searchForm } = this.data
    let { result, page } = await parkingList({
      data: searchForm,
      page: {
        pageSize: 1,
        pageIndex: 1
      }
    })
    if (result && result[0]) {
      this.setData({
        parkingInfo: result[0],
        total: page.total
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 找车位
  findParking () {
    wx.navigateTo({
      url: './nearParking',
    })
  },
  // 停车记录
  lookRecord () {
    wx.navigateTo({
      url: './parkingRecord',
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