// pages/subPages/parking/nearParking.js
var app = getApp()
// const { getCouponList: listApi } = app.api
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
    list: [
      {
        id:1,
        type:'fixedPrice',
        offerNotice:"优惠优惠",
        fixedAmount:"1",
        usedAmount:"100",
        name:"优惠券名称",
        endTime:"2021.10.09 23:59:59",
      },
      {
        id:2,
        type:'couponType',
        offerNotice:"优惠说明2",
        fixedAmount:"1",
        usedAmount:"500",
        name:"优惠券名称2优惠券名称2优惠券名称2优惠券名称2优惠券名称2优惠券名称2",
        endTime:"2021.10.09 23:59:59",
      }
    ]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    // this.initList()
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