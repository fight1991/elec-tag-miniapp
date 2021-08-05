// pages/subPages/parking/recordDetail.js
var app = getApp()
const { recordDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataForm: {},
    statusText: {
      going: '进行中',
      done: '已完成',
      close: '已关闭'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let parkingNo = options.parkingNo
    this.getDetail(parkingNo)
  },
  // 获取详情
  async getDetail (parkingNo) {
    let { result } = await recordDetail({
      parkingNo
    })
    if (result) {
      result.billingDuration = app.utils.formatHours(result.billingDuration)
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