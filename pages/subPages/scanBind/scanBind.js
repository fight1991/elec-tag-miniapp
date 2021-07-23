// pages/scanBind/scanBind.js
var app = getApp()
const { evi_bind, getUnbindList } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: app.utils.imgTobase64('/pages/image/bind-bg.png'),
    plateNo: '',
    elecBrandNum: '',
    brandList: [],
    pickerIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { plateNo } = options
    this.getElecFromStr(plateNo)
    this.data.plateNo = plateNo
    this.getBrandList()
  },
  // 提取电子车牌号码
  getElecFromStr (str) {
    let index = str.indexOf('/RFID/')
    let num = str.substr(index + 6, 12)
    this.setData({
      elecBrandNum: num
    })
  },
  async confirmBtn () {
    let { plateNo, elecBrandNum, pickerIndex, brandList } = this.data
    if (brandList.length == 0) {
      app.messageBox.common('暂无未绑定电子车牌的车辆')
      return
    }
    var id = brandList[pickerIndex]['vehicleId']
    let { result } = await evi_bind({
      vehicleId: id,
      eviNo: elecBrandNum,
      eviUrl: plateNo
    })
    if (result) {
      wx.navigateTo({
        url: './bindStatus?id=' + id,
      })
    }
  },
  // 获取未绑定车牌列表
  async getBrandList () {
    let { result } = await getUnbindList()
    console.log(result)
    if (result) {
      this.setData({
        brandList: result
      })
    }
  },
  bindPickerChange () {

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