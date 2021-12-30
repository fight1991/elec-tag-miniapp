// pages/my/my.js
import messageNotify from "../../notify/messageNotify"
var app = getApp()
const { logOut, noticeCount } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: 60,
    wxUserImg: app.static_user_logo,
    elecShow: false, // 是否显示电子车牌
    authPersonal: false, // 是否已实名
    authVehicleLicense: false, // 是否行驶证认证
    userName: '',
    uid: '',
    tabList: [{
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
    },
    //  {
    //   url: '/pages/subPages/send/send',
    //   label: '推送设置',
    //   icon: 'send',
    //   color: '#ffbe69'
    // },
     {
      url: '/pages/subPages/setting/setting',
      label: '个人设置',
      icon: 'setting',
      color: '#ffbe69'
    }],
    noticeNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listenNotify()
  },
  //订阅未读消息数量
  listenNotify () {
    messageNotify.listen((res)=>{
      this.setData({
        noticeNum: res<100 ? res+'' : '99+'
      })
      if (res == 0) {
        wx.hideTabBarRedDot({
          index:1,
          fail:res=>{
          }
        })
      }
    })
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
                this.resetNotice()
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
  resetNotice () {
    this.setData({
      noticeNum: 0
    })
    wx.hideTabBarRedDot({
      index:1,
      fail:res=>{
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
      uid,
      elecShow: app.globalData.elecShow
    })
  },
  goRealName () {
    wx.navigateTo({
      url: '/pages/subPages/verifyInfo/verifyRealName',
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
  //获取未读消息
  async getNoticeCount() {
    let { result, other, error } = await noticeCount()
    // 接口报错后不在请求
    if (other || error) {
      this.resetNotice()
      return
    }
    if (this.temNum == result) return
    this.temNum = result
    if (result > 0) {
      // 广播未读消息数量
      this.setData({
        noticeNum: result <100 ? result+'' : '99+'
      })
      wx.showTabBarRedDot({
        index:1,
        fail:res=>{
        }
      })
    } else {
      this.resetNotice()
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    this.setData({
      navBarHeight: app.getSafeData()['bottomTop'],
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.mapStateToProps()
    this.getNoticeCount()
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