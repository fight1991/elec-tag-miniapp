// pages/subPages/parking/nearParking.js
const chooseLocation = requirePlugin('chooseLocation')
var app = getApp()
const { parkingList: listApi, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    destination: '', // 目的地
    searchForm: {
      latitude: '',
      longitude: '',
      sortType: 'distance'
    },
    resetActiveIcon: false,
    serviceText: {}, // 设施服务字典
    address: '',
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    list: [],

  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.myMap = this.selectComponent('#myMap')
    this.getCurrentPositionInfo()
    this.setData({
      serviceText: await translateDic('orgServiceTag')
    })
  },
  onShow: function () {
    this.getMapPoint()
  },
  onUnload: function () {
    chooseLocation.setLocation(null)
  },
  // 获取经纬度及地址信息
  getCurrentPositionInfo () {
    app.listenPosition(({ latitude, longitude, title }) => {
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      this.myMap.setCurrentPosOnMap({
        latitude,
        longitude
      })
      this.setData({
        address: title
      })
      // 获取附近的停车场
      this.initList()
    })
  },
  // 地图上选点
  searchPlace () {
    let { key, referer } = app.appLBS
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
    })
  },
  // 从地图上选点返回
  getMapPoint () {
    const location = chooseLocation.getLocation()
    if (location) {
      let { name, latitude, longitude } = location
      this.setData({
        destination: name,
        address: name
      })
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      // 重新查找附近的停车场
      this.initList()
    }
  },
  // 停车记录
  lookRecord () {
    wx.navigateTo({
      url: './parkingRecord',
    })
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize } = this.data
    pageIndex ++
    let { result, page } = await listApi({
      data: this.data.searchForm,
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
      this.addMakers()
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
      this.addMakers()
    })
  },
  // 重新定位到当前位置
  resetCurrentPosition () {
    let { latitude, longitude, title } = app.currentPos
    this.myMap.setIncludePoints([{
      latitude,
      longitude
    }])
    let { resetActiveIcon } = this.data
    if (!resetActiveIcon) {
      this.setData({
        resetActiveIcon: true,
        destination: '',
        address: title
      })
      this.initList()
    }
  },
  // 视野发生变化, 重新定位图标置灰状态
  regionchange (e) {
    let { resetActiveIcon } = this.data
    resetActiveIcon && this.setData({ resetActiveIcon: false })
  },
  // 添加标记
  addMakers () {
    let points = [...this.data.list]
    if (this.data.destination) { // 目的地点也添加进去
      points = [...this.data.list, {...this.data.searchForm, location: true}]
    }
    this.myMap.setMarkersOnMap(points)
  }
})