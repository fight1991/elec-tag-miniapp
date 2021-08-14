// pages/subPages/refuel/oilDetail.js
var app = getApp()
const { oilDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selection: [],
    selectionIndex: 0,
    orgBusiness: {},
    priceList:[],
    currentPrice: {},
    distance: '',
    oil: '',
    lat: '',
    lon: '',
    id: '' // 企业id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.data.lat = options.lat
    this.data.lon = options.lon
    this.data.oil = options.oil
    this.setData({
      distance: options.distance
    })
    this.getDetail()
  },
  // 获取详情
  async getDetail () {
    let { result } = await oilDetail({
      orgId: this.data.id,
      province: app.currentPos.province
    })
    if (result) {
      this.setData({
        orgBusiness: result.orgBusiness,
        priceList: result.priceList
      })
      if (result.priceList.length > 0) {
        let tempSelection = result.priceList.map(v => v.oilType)
        let index = tempSelection.indexOf(this.data.oil)
        this.setData({
          currentPrice: result.priceList[index],
          selection: tempSelection,
          selectionIndex: index
        })

      }
    }
  },
  // 立即前往
  goThis () {
    let { lat, lon, orgBusiness } = this.data
      wx.openLocation({
        latitude: lat*1,
        longitude: lon*1,
        name: orgBusiness.orgName,
        address: orgBusiness.address
      })
  },
  // 打开选择油号面板
  showSheet () {
    let { priceList } = this.data
    wx.showActionSheet({
      itemList: this.data.selection,
      success: res => {
        if (res.cancel) return
        if (res.tapIndex == this.data.selectionIndex) return
        this.setData({
          selectionIndex: res.tapIndex,
          currentPrice: priceList[res.tapIndex]
        })
      }
    })
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

  }
})