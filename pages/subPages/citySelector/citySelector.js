// pages/subPages/citySelector/citySelector.js
const citySelector = requirePlugin('citySelector')
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js')
var qqmapsdk = null
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggestion: [],
    pois: [],
    showDefault: true, // 是否显示默认值
    currentPlace: '',
    city: '',
    prePage: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPoisData()
    this.initMapSdk()
  },
  // 跳转到选择城市组件页
  selectCity () {
    let { key, referer, hotCitys } = app.appLBS
    wx.navigateTo({
      url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
    })
  },
  // 初始化附件位置
  initPoisData () {
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    if (prePage) {
      let { currentPlace, city, pois } = prePage.data
      this.data.prePage = prePage
      this.data.pois = pois
      this.setData({
        currentPlace,
        city,
        suggestion: pois
      })
    }
  },
  // 实例化sdk
  initMapSdk () {
    if (app.qqmapsdk) {
      qqmapsdk = app.qqmapsdk
      return
    }
    var key = app.appLBS.key
    app.qqmapsdk = qqmapsdk = new QQMapWX({
      key
    })
  },
  // 数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    // console.log(id)
    this.data.prePage.setData({
      currentPlace: this.data.suggestion[id].title
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  //触发关键词输入提示事件
  getsuggest: function(e) {
    var _this = this;
    var value = e.detail
    if (value.length == 0) {
      this.setData({
        suggestion: this.data.pois,
        showDefault: true
      })
      return
    }
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      region: _this.data.city, //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {//搜索成功后的回调
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            address: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug,
          showDefault: false
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
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
    let selectedCity = citySelector.getCity()
    if (selectedCity) {
      let { fullname } = selectedCity
      this.setData({
        city: fullname
      })
    }
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
    citySelector.clearCity()
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