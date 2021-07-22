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
    carTotal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentPosition()
  },
  // 获取用户当前位置
  getCurrentPosition () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let { latitude, longitude } = res
        this.getPointList(longitude, latitude)
        // wx.chooseLocation({
        //   latitude,
        //   longitude,
        //   success: (res) => {
        //     console.log(res)
        //   }
        // })
      },
      fail: (res) => {
        app.messageBox.common('获取位置失败')
      }
    })
  },
  // 获取网点列表
  async getPointList (lon, lat) {
    let { result, page } = await point_list({
      data: {
        lat,
        lon
      },
      page: this.data.pagination
    })
    if (result) {
      this.setData({
        pointList: result,
        total: page.total
      })
    }
  },
  // 更多按钮
  moreBtn () {
    wx.navigateTo({
      url: `./morePoint`,
    })
  },
  // 去这里按钮
  goThisBtn (e) {
    let { lon, lat } = this.data
    wx.openLocation({
      latitude: lat,
      longitude: lon,
    })
  },
  // 车辆信息页面
  carInfoBtn () {
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
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        // res.result
        wx.navigateTo({
          url: '/pages/subPages/scanBind/scanBind?plateNo=' + res.result,
        })
      }
    })
  },
  // 电子车牌新申领页面
  elecBrandBtn () {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isAuth: app.globalData.userInfo.authPersonal
    })
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