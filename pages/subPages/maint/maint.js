// pages/subPages/wash/wash.js
var app = getApp()
const { oilList: listApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distanceOption: [
      { text: '3km', value: 0 },
      { text: '5km', value: 1 },
      { text: '10km', value: 2 },
      { text: '15km', value: 15},
      { text: '不限', value: '-1'}
    ],
    otherOption: [
      { text: '距离最近', value: 'near'},
      { text: '价格最低', value: 'low'}
    ],
    distance: 0,
    other: 'near',
    pageFlag: 'wash', // wash洗车 miant维修保养
    pageTitle: {
      wash: '洗车美容',
      maint: '维修保养'
    },
    // 下拉刷新
    listData: [1,2,3,4,5,6],
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { pageFlag } = options
    this.setData({
      pageFlag
    })
    wx.setNavigationBarTitle({
      title: this.data.pageTitle[pageFlag]
    })
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize } = this.data
    pageIndex ++
    let { result, page } = await listApi({
      data: {},
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result) {
      callback && callback(result || [], page)
    }
    this.loading = false
    this.setData({
      collapse: false
    })
  },
  // 上拉加载
  upperList () {
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
  // 下拉刷新
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
})