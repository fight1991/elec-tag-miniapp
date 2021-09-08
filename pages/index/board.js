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
    count: 0,
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
      this.data.latitude = latitude
      this.data.longitude = longitude
      this.getPointList(longitude, latitude)
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
        count: result.length || 0,
        collapse: false
      })
    }
    this.setData({
      collapse: false
    })
    this.loading = false
  },
  goToLoginBtn () {
    app.utils.openConfirm({
      content: '您还尚未登录',
      confirmText: '去登录',
      confirm: () => {
        wx.reLaunch({
          url: '/pages/login/signIn'
        })
      }
    })
  },
  initList () {
    let { longitude, latitude } = this.data
    if (!longitude && !latitude) return
    this.getPointList(longitude, latitude)
  }
})