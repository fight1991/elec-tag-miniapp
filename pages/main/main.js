// pages/main/main.js
// import {setStorageInfo} from '../../publicBag/plugin/getSystemBarInfo'
var qqmapsdk = null
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件参数设置，传递到组件
    navBarHeight: 60,
    navTop: 0,
    menuButtonInfo:{},
    carTotal: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = app.initMapSdk()
    this.checkPermission()
  },
  onShow: function () {

  },
  onReady: function () {
    this.setData({
      navBarHeight: app.getSafeData()['bottomTop'],
      navTop: app.getSafeData()['navTop']
    })
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
      this.reverseGeocoder({ latitude, longitude })
      // app.currentPos.tamp = Date.now() 注意:更改此值, 每次打开此页面会触发订阅更新
    })
    this.startOpenPositionChange()
  },
  // 监听用户位置变化 
  startOpenPositionChange () {
    wx.onLocationChange(res => {
      this.reverseGeocoder(res)
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
          // 保存到全局
          app.savePosition({
            latitude,
            longitude,
            pois: arr,
            province: tempRes.address_component.province,
            title: tempRes.formatted_addresses.recommend, // 地址详情
            city: tempRes.address_component.city
          })
          // 发送位置信息更改广播
          app.sendPosition(tempRes.formatted_addresses.recommend)
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