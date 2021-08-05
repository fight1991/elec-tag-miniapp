// pages/subPages/parking/parkingDetail.js
var app = getApp()
const { parkingDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    dataForm: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.getDetail()
  },
  // 获取详情
  async getDetail () {
    let { result } = await parkingDetail({
      orgId: this.data.id
    })
    if (result) {
      this.setData({
        dataForm: {
          ...result.orgBusiness,
          ...result.parkingStation
        }
      })
    }
  },
  goToBtn () {
    let { latitude, longitude, address, orgName } = this.data.dataForm
    wx.openLocation({
      latitude,
      longitude,
      name: orgName,
      address
    })
  }
})