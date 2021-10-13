// pages/components/banner/banner.js
var app = getApp()
const { getCouponBanner } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerId: Number,
  },
  pageLifetimes: {
    show: async function () {
     await this.getList()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    bannerList:[],
    indicatorColor: 'rgba(255, 255, 255, .3)',
    indicatorActiveColor: 'rgba(255, 255, 255, 1)',
    autoplay: true,
    interval: 3000,
    duration: 500,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取banner
    async getList () {
      let { result } = await getCouponBanner({
        page: {
          pageIndex: 1,
          pageSize: 10
        },
        data: { bannerId: this.data.bannerId }
      })
      if (result) {
        this.setData({
          bannerList: result
        })
      }
    }
  }
})
