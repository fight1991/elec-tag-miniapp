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
  // 2. 无token调取api结果, 判断是去注册还是去登录
  // 3. 有token 说明登录过 跳转到首页
  async routeValid (code) {
    var token = wx.getStorageSync('token')
    // token不存在
    if (!token) {
      this.routeTo('/pages/index/board')
      return
    }
    let res = await app.saveUserBusinessInfo(false)
    // 初始化用户信息报错
    if (!res) {
      this.timer = setTimeout(() => {
        this.routeTo('/pages/index/board')
      }, 3000)
      return
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