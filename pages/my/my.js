// pages/my/my.js
var app = getApp()
const { logOut } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUserImg: app.static_user_logo,
    authPersonal: false, // 是否已实名
    authVehicleLicense: false, // 是否行驶证认证
    userName: '',
    bindStatus: '', // 电子车牌绑定状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapStateToProps()
  },
  // 用户退出
  loginOut () {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要退出登录吗?',
      success: async (res) => {
        if (res.confirm) {
          let { result } = await logOut()
          if (result) {
            wx.showToast({
              title: '退出成功!',
              duration: 1500,
              success: () => {
                wx.reLaunch({
                  url: '/pages/login/signIn',
                })
                wx.removeStorageSync('token')
              }
            })
          }
        }
      }
    })
  },
  // 读取global数据
  mapStateToProps () {
    let { authPersonal, authVehicleLicense, userName = '' } = app.globalData.userInfo
    let { bindStatus } = app.globalData.elecBrandInfo
    this.setData({
      authPersonal,
      authVehicleLicense,
      userName,
      bindStatus
    })
  },
  // 打开扫码
  scanBtn () {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        // res.result
        wx.navigateTo({
          url: '/pages/scanBind/scanBind?plateNo=' + res.result,
        })
      }
    })
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