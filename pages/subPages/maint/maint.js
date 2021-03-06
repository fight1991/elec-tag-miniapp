// pages/subPages/wash/wash.js
var app = getApp()
const { washList, maintList, washBtnList, translateDic } = app.api
const listApi = {
  wash: washList,
  maint: maintList
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distanceOption: [
      { text: '3km', value: 3 },
      { text: '5km', value: 5 },
      { text: '10km', value: 10 },
      { text: '15km', value: 15},
      { text: '不限', value: '-1'}
    ],
    otherOption: [
      { text: '距离最近', value: 'distance'},
      { text: '价格最低', value: 'price'}
    ],
    distance: 3,
    other: 'distance',
    pageFlag: 'wash', // wash洗车 miant维修保养
    pageTitle: {
      wash: '洗车美容',
      maint: '维修保养'
    },
    washBtnList: [],
    upkeepType: '', // 洗车类型
    activeTab: '', // 洗车当前tab
    latitude: '',
    longitude: '',
    serviceText: {},
    tagText: {},
    // 下拉刷新
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
  onLoad: async function (options) {
    let { pageFlag } = options
    wx.setNavigationBarTitle({
      title: this.data.pageTitle[pageFlag]
    })
    if (pageFlag == 'wash') {
      this.getWashBtnList()
    }
    this.setData({
      pageFlag,
      serviceText: await translateDic('orgServiceType'),
      tagText: await translateDic('orgServiceTag'),
    })
    app.notifyPos(({ latitude, longitude, address }) => {
      this.data.latitude = latitude
      this.data.longitude = longitude
      // 获取附近的停车场
      this.initList()
    })
  },
  // 获取洗车按钮列表
  async getWashBtnList () {
    let { result } = await washBtnList()
    if (result) {
      this.setData({
        washBtnList: result
      })
    }
  },
  // 洗车筛选按钮
  washTabBtn (e) {
    let current = e.target.dataset.type
    if (current === this.data.activeTab) {
      current = ''
    }
    this.setData({
      activeTab: current
    })
    this.data.upkeepType = current
    this.initList()
  },
  // 筛选按钮
  selectBtn () {
    this.initList()
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, pageFlag, latitude, longitude, distance, other, upkeepType} = this.data
    pageIndex ++
    let { result, page } = await listApi[pageFlag]({
      data: {
        latitude,
        longitude,
        radius: distance,
        sortType: other,
        upkeepType
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
    })
  },
})