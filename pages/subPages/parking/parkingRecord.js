// pages/subPages/parking/parkingRecord.js
var app = getApp()
const { recordList: listApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    list: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList()
  },
  // 清除按钮
  clearBtn () {
    this.data.value = ''
    this.initList()
  },
  // 确认按钮
  confirmBtn (e) {
    let str = e.detail.trim()
    if (str.length == 0) {
      app.messageBox.common('请输入关键字')
      return
    }
    this.data.value = str
    this.initList()
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize } = this.data
    pageIndex ++
    let { result, page } = await listApi({
      data: {
        searchStr: this.data.value
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