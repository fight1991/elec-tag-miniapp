// pages/main/morePoint.js
var app = getApp()
const { point_list } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    list: [],
    longitude: '',
    latitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { longitude, latitude } = app.currentPos
    this.data.longitude = longitude
    this.data.latitude = latitude
    this.initList()
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, longitude, latitude } = this.data
    pageIndex ++
    let { result, page } = await point_list({
      data: {
        longitude,
        latitude
      },
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result) {
      callback && callback(result || [], page)
    }
    this.loading = false
  },
  // 列表初始化查询
  initList () {
    this.getList(0, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: resList,
        hasMore: pageIndex * pageSize >= total ? false : true
      })
      wx.stopPullDownRefresh()
    })
  },
  onPullDownRefresh: function () {
    this.initList()
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    if (!this.data.hasMore) return
    let { pageIndex, list } = this.data
    this.getList(pageIndex, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: [...list, ...resList],
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})