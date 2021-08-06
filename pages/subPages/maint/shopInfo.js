// pages/subPages/wash/shopInfo.js
var app = getApp()
const { washShopDetail, maintShopDetail, translateDic } = app.api
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
    pageFlag: '',
    goodsId: '',
    orgId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { pageFlag, goodsId, orgId } = options
    this.data.goodsId = goodsId
    this.data.orgId = orgId
    this.setData({
      pageFlag
    })
    wx.setNavigationBarTitle({
      title: this.data.pageTitle[pageFlag] + '详情'
    })
  },
  // 获取商铺详情
  async getDetail () {
    let { pageFlag, orgId, goodsId } = this.data
    let { result } = await shopApi[pageFlag]({
      orgId,
      goodsId
    })
    if (result) {
      this.setData({
        dataForm: {
          ...result.orgBusiness,
          goodsList: result.goodsInfoList
        }
      })
    }
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