// pages/subPages/parking/parkingDetail.js
var app = getApp()
const { parkingDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    dataForm: {},
    distance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.setData({
      distance: options.distance
    })
    this.getDetail()
  },
  // 获取详情
  async getDetail () {
    let { result } = await parkingDetail({
      orgId: this.data.id
    })
    if (result) {
      if (result.orgBusiness.businessTimeBucketType === '2') {
        let temp = result.orgBusiness.businessTimeBucket
        let times = temp.split('$')
        result.orgBusiness.businessTimeList = times
      }
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