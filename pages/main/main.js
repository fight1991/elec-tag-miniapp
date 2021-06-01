// pages/main/main.js
var app = getApp()
const { point_list } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false, // 是否已实名认证
    bindStatus: false, // 电子车牌是否已绑定
    pagination: {
      pageIndex: 1,
      pageSize: 5
    },
    total: 0, // 安装点总数
    pointList: [],
    lon: '',
    lat: ''
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
        this.data.lon = longitude
        this.data.lat = latitude
        this.getPointList(longitude, latitude)
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
  goThisBtn () {
    let { lon, lat } = this.data
    wx.openLocation({
      latitude: lat,
      longitude: lon,
    })
  },
  // 电子车牌页面
  elecBrandBtn () {
    // 判断用户信息是否完善
    let { isAuth } = this.data
    if (!isAuth) {
      wx.navigateTo({
        url: '/pages/verifyInfo/index',
      })
    } else {
      // 查看车牌绑定的状态
      let status = app.globalData.elecBrandInfo.bindStatus
      if (status == 'notApply') { // 未申领
        wx.navigateTo({
          url: '/pages/verifyInfo/applyWays',
        })
      } else {
        wx.navigateTo({ // 已申领apply, 已绑定bind, 已解绑unbind
          url: '/pages/elecPlate/elecPlate',
        })
      }
      
    }
  },
  // 跳转到用户信息页面
  goToUserInfoPage () {
    wx.navigateTo({
      url: '/pages/verifyInfo/index',
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
    this.setData({
      isAuth: app.globalData.userInfo.authVehicleLicense,
      bindStatus: app.globalData.elecBrandInfo.bindStatus == 'bind'
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