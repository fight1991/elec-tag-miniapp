// pages/ticket/components/couponDetail.js
var app = getApp()
const { couponDetail, addCoupon, translateDic } = app.api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    params: { type: Object, value: {} }
  },
  pageLifetimes: {
    show: async function () {
      this.setData({
        serviceText: await translateDic('orgServiceType'),
        userCouponText: await translateDic('userCouponStatus')
      })
      await this.getDetail()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    serviceText: {},
    userCouponText: {},
    info: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取卡券详情
  async getDetail () {
    let { result } = await couponDetail({
      couponConfigId: this.data.params.couponId
    })
    if (result) {
      this.setData({
        info: result.couponExt
      })
    }
  },
  }
})
