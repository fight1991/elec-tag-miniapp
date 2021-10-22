// pages/subPages/parking/nearParking.js
var app = getApp()
const { getCouponList: listApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg:{
      left: app.utils.imgTobase64('/pages/image/coupon/card-bg1.png'),
      right: app.utils.imgTobase64('/pages/image/coupon/card-bg2.png'),
    },
    collapse: false, // 下拉是否展开
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    list: [],
    pageUrl:{
      'carWash':'/pages/subPages/maint/maint?pageFlag=wash',//洗车
      'upkeep':'/pages/subPages/maint/maint?pageFlag=maint',//保养
      'refueling': '/pages/subPages/refuel/refuel',//加油
    }
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.initList()
  },
  gotoPage (e) {
    let { type, service } = e.currentTarget.dataset.item.couponExt
    let { receiveOrgId, receiveGoodsId } = e.currentTarget.dataset.item
    // 一元洗车跳到商户详情页
    if (type === 'fixedPrice' && (service ==='carWash' || service ==='upkeep')) {
      wx.navigateTo({
        url: `/pages/subPages/maint/detail?orgId=${receiveOrgId}&pageFlag=${service==='carWash'?'wash':'maint'}&goodsId=${receiveGoodsId}`
      })
    }
    // 满减跳到相应场景的的商户列表页
    if (type === 'moneyOff') {
      wx.navigateTo({
        url: this.data.pageUrl[service]
      })
    }
  },
  // 列表api
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize } = this.data
    pageIndex ++
    let { result, page } = await listApi({
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
      this.data.pageIndex = pageIndex
      this.setData({
        list: [...list, ...resList],
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },
  // 下拉刷新
  initList () {
    this.getList(0, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.data.pageIndex = pageIndex
      this.setData({
        list: resList,
        total,
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },
})