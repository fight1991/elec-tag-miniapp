// pages/subPages/parking/parking.js
import { setMarkersOnMap, setCurrentPosOnMap } from './map/operator'
var app = getApp()
const { parkingList, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchForm: {
      latitude: '',
      longitude: '',
      sortType: 'distance'
    },
    serviceText: {},
    parkingInfo: {},
    total: 0,
    currentAddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.myMap = this.selectComponent('#myMap')
    this.getCurrentPositionInfo()
    this.setData({
      serviceText: await translateDic('orgServiceTag')
    })
  },
  // 获取经纬度及地址信息
  getCurrentPositionInfo () {
    app.notifyPos(({ latitude, longitude, address }) => {
      this.data.searchForm.latitude = latitude
      this.data.searchForm.longitude = longitude
      setCurrentPosOnMap(this.myMap, {
        latitude,
        longitude
      })
      this.setData({
        address
      })
      // 获取附近的停车场
      this.getParkingList()
    })
  },
  // 刷新按钮
  refreshBtn () {
    this.getParkingList()
  },
  // 附近的停车场
  async getParkingList () {
    let { searchForm } = this.data
    let { result, page } = await parkingList({
      data: searchForm,
      page: {
        pageSize: 1,
        pageIndex: 1
      }
    })
    if (result && result[0]) {
      this.setData({
        parkingInfo: result[0],
        total: page.total
      })
      setMarkersOnMap(this.myMap, result)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 找车位
  findParking () {
    wx.navigateTo({
      url: './nearParking',
    })
  },
  // 停车记录
  lookRecord () {
    wx.navigateTo({
      url: './parkingRecord',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  }
})