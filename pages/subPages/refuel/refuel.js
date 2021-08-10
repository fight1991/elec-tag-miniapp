// pages/subPages/refuel/refuel.js
var app = getApp()
const { oilList: listApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  options: {
    multipleSlots: true
  },
  data: {
    showMask: false,
    currentTabName: 'distance', // 当前选择的tab
    searchStr: '', // 搜索的关键词
    hasSelect: false, // 是否已经选择了油号
    currentOilSelection: '92#', // 默认选择的油号
    distanceOption: [
      { text: '3km', value: 3 },
      { text: '5km', value: 5 },
      { text: '10km', value: 10 },
      { text: '15km', value: 15},
      { text: '不限', value: '-1'}
    ],
    oilOption: [
      { text: '92#', value: '92#' },
      { text: '95#', value: '95#' },
      { text: '98#', value: '98#' },
      { text: '0#', value: '0#' }
    ],
    otherOption: [
      { text: '距离最近', value: 'distance'},
      { text: '价格最低', value: 'price'}
    ],
    distance: 3,
    other: 'distance',
    oil: '92#',
    searchStr: '',
    latitude: '',
    longitude: '',
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { latitude, longitude } = app.currentPos
    this.data.latitude = latitude
    this.data.longitude = longitude
    // 判断是否选择了常用油号
    let oil = wx.getStorageSync('oil')
    if (!oil) {
      this.setData({
        showMask: true
      })
    } else {
      this.setData({
        oil,
        hasSelect: true
      })
    }
  },
  // 筛选条件按钮
  selectBtn (e) {
    if (typeof e.detail == 'string' && e.detail.indexOf('#') > -1) {
      wx.setStorage({
        key: 'oil',
        data: e.detail
      })
    }
    this.initList()
  },
  // 模态框
  onClickHide () {
    this.setData({
      showMask: false,
      hasSelect: true
    })
    this.initList()
  },
  // 模态框选项
  masktabclick (e) {
    let value = e.target.dataset.name
    this.setData({
      currentOilSelection: value,
      oil: value,
      hasSelect: true
    })
    this.initList()
    wx.setStorage({
      key: 'oil',
      data: value
    })
  },
  // 导航按钮
  navigatorBtn (e) {
    let index = e.currentTarget.dataset.index
    let { latitude, longitude, address, orgName } = this.data.list[index]
    wx.openLocation({
      latitude,
      longitude,
      name: orgName,
      address
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.hasSelect && this.initList()
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, latitude, longitude, oil, distance, searchStr, other } = this.data
    pageIndex ++
    let { result, page } = await listApi({
      data: {
        latitude,
        longitude,
        oilType: oil,
        radius: distance,
        searchStr: searchStr,
        sortType: other
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
        total,
        hasMore: pageIndex * pageSize >= total ? false : true
      })
      wx.stopPullDownRefresh()
    })
  },
})