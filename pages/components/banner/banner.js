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
    show () {
      // this.getList()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    bannerList:[
      {
        bannerId:1,
        src:'/pages/image/businessCircle/banner1.png',
        url:'/pages/subPages/maint/maint?type=base&id=1'
      },
      // {
      //   bannerId:2,
      //   src:'/pages/image/businessCircle/banner2.png',
      //   url:'/pages/subPages/wash/wash'
      // }
    ],
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
    getList () {
      let { result } = getCouponBanner({bannerId: this.data.bannerId})
      if (result) {
        this.setData({
          bannerList: result.couponList
        })
      }
    },
  }
})
