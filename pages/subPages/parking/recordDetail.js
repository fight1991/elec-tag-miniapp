// pages/subPages/parking/recordDetail.js
var app = getApp()
const { recordDetail, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataForm: {},
    statusText: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      statusText: await translateDic('parkingOrderStatus')
    })
    let parkingNo = options.parkingNo
    this.getDetail(parkingNo)
  },
  // 获取详情
  async getDetail (parkingNo) {
    let { result } = await recordDetail({
      parkingNo
    })
    if (result) {
      if (result.outDate) {
        result.billingDuration = app.utils.betweenTime(result.inDate, result.outDate)
      } else {
        result.billingDuration = app.utils.betweenTime(result.inDate)
      }
      this.setData({
        dataForm: result
      })
    }
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


})