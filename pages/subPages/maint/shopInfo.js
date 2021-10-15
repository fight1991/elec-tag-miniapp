// pages/subPages/wash/shopInfo.js
var app = getApp()
const { washShopDetail, maintShopDetail, translateDic, addCoupon } = app.api
const shopApi = {
  wash: washShopDetail,
  maint: maintShopDetail
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [12, 121, 122],
    dataForm: {
      goodsList: []
    },
    pageTitle: {
      wash: '洗车美容',
      maint: '维修保养'
    },
    tipVisible: false, //温馨提示
    pageFlag: '',
    goodsVehicleType: '',
    orgId: '',
    latitude: '',
    longitude: '',
    distance: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { pageFlag, goodsVehicleType, orgId, distance, latitude, longitude } = options
    this.data.goodsVehicleType = goodsVehicleType
    this.data.orgId = orgId
    this.setData({
      pageFlag,
      latitude,
      longitude,
      distance
    })
    wx.setNavigationBarTitle({
      title: this.data.pageTitle[pageFlag] + '详情'
    })
    this.getDetail()
  },
  // 获取商铺详情
  async getDetail () {
    let { pageFlag, orgId, goodsVehicleType, latitude, longitude } = this.data
    let { result } = await shopApi[pageFlag]({
      orgId,
      goodsVehicleType,
      latitude,
      longitude
    })
    if (result) {
      if (result.businessTimeBucketType === '2') {
        let temp = result.businessTimeBucket
        let times = temp.split('$')
        result.businessTimeList = times
      } else {
        result.businessTimeList = []
      }
      this.setData({
        dataForm: {
          ...result,
          goodsList: result.orgGoodsExtList
        }
      })
    }
  },
  //一口价弹窗
  openTip (e) {
    this.setData({
      tipVisible: true,
      couponId: e.currentTarget.dataset.cid
    })
  },
  //确认领取
  async onConfirm () {
    let { result } = await addCoupon({
      couponConfigId: this.data.couponId
    })
    if (result) {
      // 调用获取验证码api成功后, 开启倒计时
      utils.showToast.success('领取成功', () => {
        this.goDetail()
      })
    }
  },
  goDetail (e) {
    let { orgId,goodsId } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `./detail?orgId=${orgId}&pageFlag=${this.data.pageFlag}&goodsId=${goodsId}`,
    })
  },
  // 联系电话
  makePhone () {
    let { contactPhone } = this.data.dataForm
    wx.makePhoneCall({
      phoneNumber: contactPhone,
    })
  },
  // 立即前往
  goBtn () {
    let { latitude, longitude, orgName, address } = this.data.dataForm
      wx.openLocation({
        latitude,
        longitude,
        name: orgName,
        address
      })
  },
 
})