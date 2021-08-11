// pages/login/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNO: '',
    isClick: false, // 是否已经点击获取头像// 节流
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    app.getWechatCode().then(res => {
      app.globalData.jsCode = res.code
      this.routeValid(res.code)
    })
  },
  // 入口路由跳转
  // 1. 判断有无token
  // 2. 有token, 初始化用户信息
  // 3. 没有token, 直接放行, 放行的页面需要做是否登录校验
  async routeValid (code) {
    var token = wx.getStorageSync('token')
    if (token) {
      let res = await app.saveUserBusinessInfo(false)
      // 初始化用户信息报错
      if (!res) {
        this.timer = setTimeout(() => {
          wx.reLaunch({
            url: '/pages/login/signIn',
          })
          this.timer && clearTimeout(this.timer)
        }, 3000)
        return
      }
    }
    // 跳转到首页
    wx.switchTab({
      url: '/pages/main/main',
    })
  },
  // 跳转到相关页面
  routeTo (url) {
    wx.redirectTo({
      url
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.timer && clearTimeout(this.timer)
  }
})