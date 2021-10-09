// pages/main/main.js
var qqmapsdk = null
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
    currentPlace: '', // 导航栏标题
    navBarHeight: app.navHeight,
    isAuth: false, // 是否已实名认证
    carTotal: 0,
    bannerId: 1001,
    currentPos: '', // 当前地理位置
    pois: [], // 当前位置的周边信息
    city: '', // 城市名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = app.initMapSdk()
    this.checkPermission()
  },
  onShow: function () {
    this.setData({
      isAuth: app.globalData.userInfo.authPersonal || false
    })
    // this.getList()
  },
  // 权限检测
  checkPermission () {
    app.utils.permissionHandler('scope.userLocation').then(() => {
      this.initPointList()
    }).catch(() => {
      app.utils.openConfirm({
        cancelText: '退出程序',
        content: '检测到您未开通位置权限, 请前往开启',
        confirmText: '去开启',
        cancel: () => {
          wx.exitMiniProgram()
        },
        confirm: () => {
          wx.openSetting()
        }
      })
    })
  },
  // 初始化位置信息
  initPointList () {
    app.getCurrentPosition().then(({ latitude, longitude }) => {
      app.currentPos.latitude = latitude
      app.currentPos.longitude = longitude
      this.reverseGeocoder({ latitude, longitude })
      // app.currentPos.tamp = Date.now() 注意:更改此值, 每次打开此页面会触发订阅更新
    })
    this.startOpenPositionChange()
  },
  // 监听用户位置变化 
  startOpenPositionChange () {
    wx.onLocationChange(res => {
      let { latitude, longitude } = res
      app.currentPos.latitude = latitude
      app.currentPos.longitude = longitude
      this.reverseGeocoder(res)
      app.currentPos.tamp = Date.now()
    })
  },
  // 解析位置
  reverseGeocoder ({ latitude, longitude }, callback) {
    if (!latitude || !longitude) return
    qqmapsdk.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      get_poi: 1,
      success: res => {
        if (res.status == 0) {
          let tempRes = res.result
          this.data.pois = tempRes.pois
          app.currentPos.province = tempRes.address_component.province
          app.currentPos.address = tempRes.formatted_addresses.recommend
          this.setData({
            currentPlace: tempRes.formatted_addresses.recommend,
            city: tempRes.address_component.city,
            latitude,
            longitude
          })
          callback && callback()
        }
      }
    })
  },
  // 获取车辆数量
  getCarNum (e) {
    this.data.carTotal = e.detail
    this.setData({
      carTotal: e.detail
    })
  }
})