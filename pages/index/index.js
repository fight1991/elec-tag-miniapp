// pages/login/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNO: '',
    isClick: false, // 是否已经点击获取头像// 节流
    startLocationChange: false, // 是否开启了位置监听
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.routeValid()
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.checkPermisson()
  },
  // 入口路由跳转
  // 1. 位置权限校验, 成功则下一步, 否则弹框提示开启权限
  // 2. gps功能是否打开
  // 3. 判断有无token
  // 4. 有token, 初始化用户信息
  // 5. 没有token, 直接放行, 放行的页面需要做是否登录校验

  async checkPermisson () {
    let isOpenLocation = await app.utils.permissionHandler('scope.userLocation')
    if (!isOpenLocation) { // 未允许打开位置
      app.utils.openConfirm({
        content: '检测到您未开通位置权限, 请前往开启',
        cancelText: '退出程序',
        confirmText: '去开启',
        cancel: () => {
          wx.exitMiniProgram()
        },
        confirm: () => {
          wx.openSetting()
        }
      })
      return false
    }
    // 打开位置权限了, 判断有没有开启Gps功能
    let isOpenGps = await app.getCurrentPosition()
    if (!isOpenGps) {
      app.utils.openConfirm({
        content: '检测到您未开启GPS功能',
        cancelText: '退出程序',
        confirmText: '已打开',
        cancel: () => {
          wx.exitMiniProgram()
        },
        confirm: () => {
          this.onShow()
        }
      })
      return false
    }
    // 已打开GPS
    let { latitude, longitude } = isOpenGps
    let reverseSuccess = await app.resolveGeocoder({ latitude, longitude })
    if (!reverseSuccess) {
      app.messageBox.common('地址解析失败')
      return false
    }
    // 开启位置监听
    !this.data.startLocationChange && this.startOpenPositionChange()
    // 页面跳转
    this.routeValid()
  },
  async routeValid () {
    var token = wx.getStorageSync('token')
    if (token) {
      app.ssToken = token
      // 初始化用户信息是否成功都跳转到主页面  false禁止业务报错全局拦截
      await app.saveUserBusinessInfo(false)
    }
    // 跳转到首页
    wx.switchTab({
      url: '/pages/main/main',
    })
  },
  // 监听用户位置变化 
  startOpenPositionChange () {
    wx.onLocationChange(res => {
      this.data.startLocationChange = true
      app.resolveGeocoder(res)
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})