// pages/subPages/order/order.js
var app = getApp()
const { orderList: listApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        title: '全部',
        name: 'all'
      }, {
        title: '待支付',
        name: 'a'
      }, {
        title: '已完成',
        name: 'b'
      }, {
        title: '已关闭',
        name: 'c'
      }
    ],
    activeTab: 0,
    list: [1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  tabChange (e) {
    console.log(e)
  },
  // 获取列表
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