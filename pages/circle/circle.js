// pages/circle/circle.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridIcon: [{
      id: 'id1',
      label: '无感加油',
      icon: '/pages/image/businessCircle/oil.png',
      pageKey: 'refuel' // 加油
    }, {
      id: 'id2',
      label: '维修保养',
      icon: '/pages/image/businessCircle/maintenance.png',
      pageKey: 'maint' // 维保
    }, {
      id: 'id3',
      label: '洗车美容',
      icon: '/pages/image/businessCircle/wash.png',
      pageKey: 'wash'
    }, {
      id: 'id4',
      label: '智慧停车',
      icon: '/pages/image/businessCircle/parking.png',
      pageKey: 'parking'
    }, {
      id: 'id5',
      label: '保险理赔',
      icon: '/pages/image/businessCircle/insurance.png'
    }, {
      id: 'id6',
      label: '道路救援',
      icon: '/pages/image/businessCircle/rescue.png'
    }, {
      id: 'id7',
      label: '违章处理',
      icon: '/pages/image/businessCircle/violation.png'
    }, {
      id: 'id8',
      label: '汽车租赁',
      icon: '/pages/image/businessCircle/rental.png'
    }, {
      id: 'id9',
      label: '轮胎维护',
      icon: '/pages/image/businessCircle/tire.png'
    }, {
      id: 'id10',
      label: '车辆置换',
      icon: '/pages/image/businessCircle/replace.png'
    }, {
      id: 'id11',
      label: '年检服务',
      icon: '/pages/image/businessCircle/annual.png'
    }, {
      id: 'id12',
      label: '敬请期待',
      icon: '/pages/image/businessCircle/more.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 城市选择
  placeSearch () {
    wx.navigateTo({
      url: '/pages/subPages/citySelector/citySelector',
    })
  },
  // 页面跳转
  routePage (e) {
    let pageKey = e.currentTarget.dataset.page
    if (!pageKey) {
      app.messageBox.common('敬请期待')
      return
    }
    wx.navigateTo({
      url: `/pages/subPages/${pageKey}/${pageKey}`,
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