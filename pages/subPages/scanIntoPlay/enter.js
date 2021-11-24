// pages/subPages/scanIntoPlay/enter.js
var app = getApp()
const { enter } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled: true,
    orgName: '',
    phone: '',
    plateNo: '',
    qrcodeId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var localPhone = wx.getStorageSync('mobile')
    this.setData({
      phone: localPhone
    })
  },
  // 获取详情
  async getDetail () {
    let { result } = await enter({
      plateNo: this.data.plateNo,
      plateColor: this.data.plateNo.length === 8 ? 'yellow' : 'blue',
      qrcodeId: this.data.qrcodeId,
    })
    if (result) {
      if (result.orgBusiness.businessTimeBucketType === '2') {
        let temp = result.orgBusiness.businessTimeBucket
        let times = temp.split('$')
        result.orgBusiness.businessTimeList = times
      } else {
        result.orgBusiness.businessTimeList = []
      }
      this.setData({
        dataForm: {
          ...result.orgBusiness,
          ...result.parkingStation
        }
      })
    }
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