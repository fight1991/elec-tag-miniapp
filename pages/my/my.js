// pages/my/my.js
var app = getApp()
const { logOut } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUserImg: app.static_user_logo,
    authPersonal: false, // 是否已实名
    authVehicleLicense: false, // 是否行驶证认证
    userName: '',
    uid: '',
    tabList: [{
      url: '/pages/subPages/card/card',
      label: '我的银行卡',
      icon: 'card-finance',
      color: '#ffa44b'
    }, {
      url: '/pages/subPages/ticket/ticket',
      label: '我的卡券',
      icon: 'ticket',
      color: '#447fff'
    }, {
      url: '/pages/subPages/order/order',
      label: '订单管理',
      icon: 'order',
      color: '#66afff'
    }, {
      url: '/pages/subPages/carInfo/carList',
      label: '我的车辆',
      icon: 'car',
      color: '#769dff'
    }, {
      url: '/pages/subPages/message/messageList',
      label: '我的消息',
      icon: 'info',
      color: '#0dd7be'
    }, {
      url: '/pages/subPages/send/send',
      label: '推送设置',
      icon: 'send',
      color: '#ffbe69'
    }, {
      url: '/pages/subPages/setting/setting',
      label: '个人设置',
      icon: 'setting',
      color: '#ffbe69'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 用户退出
  loginOut () {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要退出登录吗?',
      success: async (res) => {
        if (res.confirm) {
          let { result } = await logOut()
          if (result) {
            wx.showToast({
              title: '退出成功!',
              duration: 1500,
              success: () => {
                app.resetLoginStatus()
                this.mapStateToProps()
                if (wx.pageScrollTo) {
                  wx.pageScrollTo({
                    scrollTop: 0
                  })
                }            
              }
            })
          }
        }
      }
    })
  },
  // 读取global数据
  mapStateToProps () {
    let { authPersonal = false, authVehicleLicense = false, userName = '', uid = '' } = app.globalData.userInfo
    this.setData({
      authPersonal,
      authVehicleLicense,
      userName,
      uid
    })
  },
  goRealName () {
    wx.navigateTo({
      url: '/pages/subPages/verifyInfo/idcardVerify',
    })
  },
  routePage (e) {
    if (!app.isLogin()) {
      app.utils.openCheckLogin()
      return
    }
    let { authPersonal } = this.data
    if (!authPersonal) {
      app.messageBox.common('您还未实名认证, 请先认证哦')
      return
    }
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url,
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
    this.mapStateToProps()
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