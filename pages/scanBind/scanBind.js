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
    brandList: [],
    pickerIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { plateNo } = options
    this.setData({
      plateNo
    })
    this.getBrandList()
  },
  async confirmBtn () {
    let { plateNo, pickerIndex, brandList } = this.data
    let { result } = await evi_bind({
      vehicleId: brandList[pickerIndex]['vehicleId'],
      eviId: plateNo
    })
    if (result) {
      wx.navigateTo({
        url: './bindStatus',
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