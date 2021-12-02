// pages/subPages/scanIntoPlay/enter.js
var app = getApp()
const { scanInit, enterScan } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled: true,
    orgName: '',
    orgId: '',
    phone: '',
    plateNo: Array(8).fill(' ').join(''),
    qrcodeId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // // 获取二维码所带参数
    // if (options.q) {
    //   let option = decodeURIComponent(options.q)
    //   let qrcodeId = option.split('id=')[1]
    //   if (!qrcodeId) return
    //   wx.setStorageSync('enterId', qrcodeId)
    // }
    // let enterId = wx.getStorageSync('enterId')
    // if (!enterId) {
    //   app.messageBox.common('请用微信扫一扫，重新扫码！')
    //   return
    // }
    // this.data.qrcodeId = enterId

    this.data.qrcodeId = '1812927690437561155'
    // 1.如果app.ssToken有值，说明登陆过，直接赋值初始化
    let plateNo = wx.getStorageSync('plateNo')
    if (app.ssToken) {
      this.setData({
        phone: app.globalData.userInfo.mobile,
        plateNo
      })
      await this.getScanInit()
      return
    }
    // 2.本地无token, 去登陆 
    let token = wx.getStorageSync('token')
    if (!token) {
      app.redirect = '/pages/subPages/scanIntoPlay/enter'
      wx.reLaunch({
        url: '/pages/login/loginType'
      })
      return
    }
    // 3.本地有token, 初始化信息（适用于关闭小程序再进入时app.ssToken无值）
    app.ssToken = token
    await app.saveUserBusinessInfo()
    this.setData({
      phone: app.globalData.userInfo.mobile,
      plateNo
    })
    await this.getScanInit()
  },
  // 入场
  async confirmEnter () {
    let { plateNo, qrcodeId } = this.data
    let reg = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/
    if (!reg.test(plateNo)) {
      app.messageBox.common('请输入正确的车牌号')
      return
    }
    let { result } = await enterScan({
      plateNo,
      plateColor: plateNo.length === 8 ? 'yellow' : 'blue',
      qrcodeId,
    })
    if (result) {
      //记录车牌号
      wx.setStorage({
        key: 'plateNo',
        data: plateNo
      })
      let { orgName, inDate, code } = result
      wx.navigateTo({
        url: `./enterDetail?orgName=${orgName}&inDate=${inDate}&code=${code}`
      })
    }
  },
  // 扫码初始化
  async getScanInit () {
    let { result } = await scanInit({
      qrcodeId: this.data.qrcodeId
    })
    if (result) {
      let { orgName, orgId } = result
      this.data.orgId = orgId
      this.setData({
        orgName
      })
    }
  },
  getPlateNo (e) {
    let value = e.detail.value.trim()
    this.data.plateNo = value
    this.setData({
      isDisabled: value.length < 7
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