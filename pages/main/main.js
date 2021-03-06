// pages/main/main.js
var app = getApp()
const { point_list } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false, // 是否已实名认证
    pagination: {
      pageIndex: 1,
      pageSize: 5
    },
    total: 0, // 安装点总数
    pointList: [],
    carTotal: 0,
    longitude: '',
    latitude: '',
    collapse: false, // 下拉是否展开
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    bgImg: {
      car: app.utils.imgTobase64('/pages/image/icons/car-bg.png'),
      plate: app.utils.imgTobase64('/pages/image/icons/plate-bg.png'),
      scan: app.utils.imgTobase64('/pages/image/icons/scan-bg.png')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getCurrentPosition().then(({ latitude, longitude }) => {
      app.currentPos.latitude = latitude
      app.currentPos.longitude = longitude
      this.data.latitude = latitude
      this.data.longitude = longitude
      // app.currentPos.tamp = Date.now() 注意:更改此值, 每次打开此页面会触发订阅更新
      this.getPointList(longitude, latitude)
    })
    this.startOpenPositionChange()
  },
  // 监听用户位置变化 
  startOpenPositionChange () {
    wx.onLocationChange(res => {
      let { latitude, longitude } = res
      this.data.latitude = latitude
      this.data.longitude = longitude
      app.currentPos.latitude = latitude
      app.currentPos.longitude = longitude
      app.currentPos.tamp = Date.now()
    })
  },
  // 获取网点列表
  async getPointList (longitude, latitude) {
    if (this.loading) return
    this.loading = true
    let { result, page } = await point_list({
      data: {
        latitude,
        longitude
      },
      page: this.data.pagination
    })
    if (result) {
      this.setData({
        pointList: result,
        total: page.total,
        collapse: false
      })
    }
    this.setData({
      collapse: false
    })
    this.loading = false
  },
  // 更多按钮
  moreBtn () {
    wx.navigateTo({
      url: `./morePoint`,
    })
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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isAuth: app.globalData.userInfo.authPersonal || false
    })
  },

  initList () {
    let { longitude, latitude } = this.data
    if (!longitude && !latitude) return
    this.getPointList(longitude, latitude)
  }
})