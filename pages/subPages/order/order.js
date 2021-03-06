// pages/subPages/order/order.js
var app = getApp()
const { orderList: listApi, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 0,
    currentName: '',
    payStatusText: {
      all: '全部',
      doing: '待支付',
      done: '已完成',
      closed: '已关闭'
    },
    serviceText: {},
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
    this.initList()
    this.setData({
      serviceText: await translateDic('orgServiceType')
    })
  },
  tabChange (e) {
    let tabValue = e.detail.name
    let status = tabValue == 'all' ? '' : tabValue
    this.data.currentName = status
    
    this.initList()
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize } = this.data
    pageIndex ++
    let { result, page } = await listApi({
      data: {
        status: this.data.currentName
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
  // 去付款
  goPay () {},
  onPullDownRefresh: function () {
    this.initList()
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
  }
})