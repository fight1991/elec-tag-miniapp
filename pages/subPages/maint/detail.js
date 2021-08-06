// pages/subPages/wash/washDetail.js
var app = getApp()
const { washGoodsDetail, maintGoodsDetail, translateDic } = app.api
const detailApi = {
  wash: washGoodsDetail,
  maint: maintGoodsDetail
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageFlag: 'maint',
    goodsId: '',
    orgId: '',
    dataForm: {
      items: []
    },
    serviceText: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let { pageFlag, goodsId, orgId } = options
    this.data.goodsId = goodsId
    this.data.orgId = orgId
    this.setData({
      pageFlag
    })
    this.getDetail()
    this.setData({
      serviceText: await translateDic('orgServiceTag')
    })
  },
  // 获取详情
  async getDetail () {
    let { goodsId, pageFlag, orgId } = this.data
    let { result } = await detailApi[pageFlag]({
      goodsId,
      orgId
    })
    if (result) {
      this.setData({
        dataForm: {
          address: result.orgBusiness.address,
          orgTags: result.orgBusiness.orgTags || [],
          ...result.goodsInfo
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})