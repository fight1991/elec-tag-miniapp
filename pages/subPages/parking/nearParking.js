// pages/subPages/parking/nearParking.js
import { setMarkersOnMap, setCurrentPosOnMap } from './map/operator'
const chooseLocation = requirePlugin('chooseLocation')
var app = getApp()
const { parkingList: listApi } = app.api
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
    serviceText: {}, // 设施服务字典
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
    this.myMap = this.selectComponent('#myMap')
    app.notifyPos(({ latitude, longitude, address }) => {
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      setCurrentPosOnMap(this.myMap, {
        latitude,
        longitude
      })
      // 获取附近的停车场
      this.initList()
    })
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    if (!prePage) return
    this.setData({
      serviceText: prePage.data.serviceText
    })
  },
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
        destination: name
      })
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      // 重新查找附近的停车场
      this.initList()
    }
  },
  onShow: function () {
    this.getMapPoint()
  },
  onUnload: function () {
    chooseLocation.setLocation(null)
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
      setMarkersOnMap(this.myMap, this.data.list)
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
      setMarkersOnMap(this.myMap, this.data.list)
    })
  },
})