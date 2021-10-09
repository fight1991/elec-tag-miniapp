// pages/main/main.js
var qqmapsdk = null
var app = getApp()
const { point_list, getCouponBanner } = app.api
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
    bannerList:[
      {
        bannerId:1,
        src:'/pages/image/businessCircle/banner1.png',
        url:'/pages/subPages/maint/maint?type=base&id=1'
      },
      // {
      //   bannerId:2,
      //   src:'/pages/image/businessCircle/banner2.png',
      //   url:'/pages/subPages/wash/wash'
      // }
    ],
    currentPos: '', // 当前地理位置
    pois: [], // 当前位置的周边信息
    city: '', // 城市名
    gridIcon: [{
      id: 'id1',
      label: '无感加油',
      icon: '/pages/image/businessCircle/oil.png',
      pageKey: 'refuel' // 加油
    }, {
      id: 'id2',
      label: '维修保养',
      icon: '/pages/image/businessCircle/maintenance.png',
      pageKey: 'maint' // 维保
    }, {
      id: 'id3',
      label: '洗车美容',
      icon: '/pages/image/businessCircle/wash.png',
      pageKey: 'wash'
    }, {
      id: 'id4',
      label: '智慧停车',
      icon: '/pages/image/businessCircle/parking.png',
      pageKey: 'parking'
    }]
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

  // 获取banner
  getList () {
    let { result } = getCouponBanner({bannerId: 1001})
    if (result) {
      this.setData({
        bannerList: result.couponList
      })
    }
  },
 
  // 车辆信息页面
  carInfoBtn () {
    if (!app.isLogin()) {
      app.utils.openCheckLogin()
      return
    }
    let { isAuth } = this.data
    if (isAuth) {
      wx.navigateTo({
        url: '/pages/subPages/carInfo/carList',
      })
    } else {
      wx.navigateTo({
        url: '/pages/subPages/verifyInfo/index',
      })
    }
  },
  // 打开扫码
  scanBtn () {
    if (!app.isLogin()) {
      app.utils.openCheckLogin()
      return
    }
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        // res.result
        let str = res.result
        if (str.indexOf('/RFID/') > -1) {
          wx.navigateTo({
            url: '/pages/subPages/scanBind/scanBind?plateNo=' + str,
          })
        } else {
          app.messageBox.common('无效的二维码')
        }
       
      }
    })
  },
  // 电子车牌按钮
  elecBrandBtn () {
    if (!app.isLogin()) {
      app.utils.openCheckLogin()
      return
    }
    if (this.data.carTotal > 2) {
      app.messageBox.common('您申请的电子车牌次数已达上限')
      return
    }
    wx.navigateTo({
      url: '/pages/subPages/verifyInfo/index',
    })
  },
  // 获取车辆数量
  getCarNum (e) {
    this.data.carTotal = e.detail
  }
})