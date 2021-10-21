// pages/ticket/components/couponDetail.js
var app = getApp()
const utils = app.utils
const { couponDetail, getCouponDetail, addCoupon, translateDic } = app.api
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
    isFirst: true, //记录第一次进入页面渲染骨架屏
    serviceText: {},
    userCouponText: {},
    info: {},
    pageUrl:{
      'carWash':'/pages/subPages/maint/maint?pageFlag=wash',//洗车
      'upkeep':'/pages/subPages/maint/maint?pageFlag=maint',//保养
      'refueling': '/pages/subPages/refuel/refuel',//加油
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取卡券详情
    getDetail () {
      if (this.data.params.pageOrigin === 'get') {
        //banner领券
        this.getBnnerCoupon()
      } else {
        //我的卡券领券
        this.getMyCoupon()
      }
    },
    //我的卡券详情
    async getMyCoupon () {
      let { result } = await couponDetail({
        couponConfigId: this.data.params.couponConfigId,
        couponId: this.data.params.couponId
      })
      if (result) {
        this.setData({
          info: result,
          isShow: false,
          isFirst: false
        })
      }
    },
    //banner优惠券详情
    async  getBnnerCoupon () {
      let { result } = await getCouponDetail(this.data.params.couponId)
      if (result) {
        this.setData({
          info: result,
          isShow: false,
          isFirst: false
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
      if (this.data.params.pageOrigin === 'get') {
        wx.navigateBack({
          delta: 1,
        })
      } else {
        let { type, service } = this.data.info
        let { orgId, goodsId } = this.data.params
        // 一元洗车跳到商户详情页
        if (type === 'fixedPrice' && (service ==='carWash' || service ==='upkeep')) {
          wx.navigateTo({
            url: `/pages/subPages/maint/detail?orgId=${orgId}&pageFlag=${service==='carWash'?'wash':'maint'}&goodsId=${goodsId}`
          })
        }
        // 满减跳到相应场景的的商户列表页
        if (type === 'moneyOff') {
          wx.navigateTo({
            url: this.data.pageUrl[service]
          })
        }
      }
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
