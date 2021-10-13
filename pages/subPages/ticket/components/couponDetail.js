// pages/ticket/components/couponDetail.js
var app = getApp()
const utils = app.utils
const { couponDetail, addCoupon, translateDic } = app.api
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    params: { type: Object, value: {} }
  },
  lifetimes: {
    attached: async function () {
      this.setData({
        serviceText: await translateDic('orgServiceType'),
        userCouponText: await translateDic('userCouponStatus')
      })
     this.getDetail()
    }
  },
  pageLifetimes: {
    show() {}
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow: true,
    serviceText: {},
    userCouponText: {},
    info: {},
    pageUrl:{
      'carWash':'/pages/subPages/maint/maint?pageFlag=wash',//洗车
      'upkeep':'/pages/subPages/maint/maint?pageFlag=maint',//洗车
      'refueling': '/pages/subPages/refuel/refuel',//加油
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取卡券详情
    async getDetail () {
      this.setData({
        isShow: true
      })
      let { result } = await couponDetail({
        couponConfigId: this.data.params.couponId
      })
      if (result) {
        this.setData({
          info: result.couponExt,
          isShow: false
        })
      }
    },
    // 领券
    clickBtn () {
      if (this.data.info.userCouponStatus === 'unreceived') {
        // 领券
        this.addCouponFun()
      } else if  (this.data.info.userCouponStatus === 'canUse') {
        // 立即使用
        this.gotoPage()
      } else {
        return
      }
      
    },
    gotoPage () {
      let { type, service } = this.data.info
      // 一元洗车跳到商户详情页
      if (type === 'fixedPrice') {
        wx.navigateTo({
          // url: `/pages/subPages/maint/detail?orgId=${item.orgId}&pageFlag=${service==='carWash'?'wash':'maint'}&goodsId=${item.goodsId}`,
        })
      }
      // 满减跳到相应场景的的商户列表页
      wx.navigateTo({
        url: this.data.pageUrl[service],
      })
    },
    async addCouponFun () {
      let { result } = await addCoupon({
        couponConfigId: this.data.params.couponId
      })
      if (result) {
        // 调用获取验证码api成功后, 开启倒计时
        utils.showToast.success('领取成功', () => {
          this.getDetail()
        })
      }
    },
  }
})
