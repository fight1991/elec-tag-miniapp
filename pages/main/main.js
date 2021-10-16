// pages/main/main.js
var qqmapsdk = null
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
    navBarHeight: app.navHeight,
    carTotal: 0,
    currentPlace: '', // 当前位置
    city: '', // 城市名
    pois: [], // 当前位置的周边信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = app.initMapSdk()
    this.checkPermission()
  },
  onShow: function () {},
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
      this.reverseGeocoder({ latitude, longitude })
      // app.currentPos.tamp = Date.now() 注意:更改此值, 每次打开此页面会触发订阅更新
    })
    this.startOpenPositionChange()
  },
  // 监听用户位置变化 
  startOpenPositionChange () {
    wx.onLocationChange(res => {
      this.reverseGeocoder(res)
      // 发送位置信息更改广播
      app.sendPosition(Date.now())
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
          let arr = []
          arr = tempRes.pois.map(item => {
            let obj = {}
            obj = {...item, ...item.ad_info}
            return obj
          })
          app.currentPos.latitude = latitude
          app.currentPos.longitude = longitude
          app.currentPos.pois = arr
          app.currentPos.province = tempRes.address_component.province
          app.currentPos.title = tempRes.formatted_addresses.recommend
          app.currentPos.city = tempRes.address_component.city

          this.setData({
            currentPlace: app.currentPos.title,
            city: tempRes.address_component.city,
            pois: arr,
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