// pages/verifyInfo/verifyLicense.js
var app = getApp()
const { verifyLicense, licenseOcr } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorMap: {
      blue: '蓝',
      green: '绿',
      yellow: '黄',
      other: '黄绿'
    },
    currentColor: 'blue',
    frontImgUrl: null,
    backImgUrl: null,
    licenseInfo: {},
    rules: {
      plateNo: '车牌号码必填',
      vehicleType: '车辆类型必填',
      ownerName: '所有人必填',
      model: '品牌型号必填',
      useCharacter: '使用性质必填',
      vin: '车辆识别号必填',
      engineNum: '发动机号必填'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseColor (e) {
    var color = e.target.dataset.color
    this.setData({
      currentColor: color
    })
  },
  // 表单方法区域
  bindData (e) {
    var id = e.currentTarget.id
    this.data.licenseInfo[id] = e.detail.value
  },
  // 表单校验
  checkValid () {
    let { licenseInfo, rules, frontImgUrl, backImgUrl } = this.data
    if (!frontImgUrl) {
      app.messageBox.common('请上传行驶证正本')
      return false
    }
    if (!backImgUrl) {
      app.messageBox.common('请上传行驶证副本')
      return false
    }
    let isPass = true
    for (let key in rules) {
      if (!licenseInfo[key]) {
        app.messageBox.common(rules[key])
        isPass = false
        break;
      }
    }
    return isPass
  },
  async saveFormInfo () {
    let { licenseInfo, frontImgUrl, backImgUrl, colorMap, currentColor } = this.data
    licenseInfo.license_image = frontImgUrl
    licenseInfo.license_copy_image = backImgUrl
    licenseInfo.plateColor = colorMap[currentColor]
    let { result } = await verifyLicense(licenseInfo)
    if (result) {
      // 跳转到申领方式
      wx.navigateTo({
        url: './applyWays',
      })
    }
  },
  // 上传完成开始ocr识别
  async getImgInfo (e) {
    // url为 e.detail
    let { result } = await licenseOcr(e.detail)
    if (result) {
      let { licenseInfo } = this.data
      // 去除result中的空值
      let tempRes = app.utils.removePropertyOfNull(result)
      let tempObj = { ...licenseInfo, ...tempRes}
      this.setData({
        licenseInfo: tempObj
      })
    }
  },
  // 下一步按钮
  nextStepBtn () {
    let isPass = this.checkValid()
    if (!isPass) return
    // 表单提交
    this.saveFormInfo()
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