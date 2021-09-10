// pages/user/idcardVerify/idcardVerify.js
var app = getApp()
const { verifyPersonApi } = app.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 人像占位图片是否显示
    faceShow: true,
    // 人像图片临时路径
    faceSrc: '',
    // 图片上传到服务器之后的地址
    faceImgUrl: '',

    frontImgUrl: null,
    backImgUrl: null,
    verifyInfo: { // 图片识别后的信息
      idNo: '',
      idName: '',
      gender: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initInfo()
  },
  // 点击拍摄人脸按钮
  faceBtn () {
    // 先查看用户是否开启了摄像头权限
    wx.showLoading({title: '权限检测中'})
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.camera']) {
          // 如果用户拒绝授权后，短期内调用不会出现弹窗而是直接进入 fail 回调
          // 手机端删除小程序后重新添加 就可以再次唤醒弹窗
          wx.hideLoading()
          wx.authorize({
            scope: 'scope.camera',
            success: () => {
              // 用户已经同意小程序使用camera
              wx.navigateTo({
                url: '/pages/subPages/camera/front',
              })
            },
            fail: res => {
              wx.navigateTo({
                url: '/pages/subPages/permissions/location',
              })
            }
          })
        } else {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/subPages/camera/front',
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/subPages/camera/front',
    // })
    // this.choosePhoto('camera', (res) => {
    //   const tempFilePaths = res.tempFilePaths
    //     // 存储照片信息
    // })
  },
  // 提交认证信息
  async sumitBtn () {
    var isPass = this.formValid()
    if (!isPass) return
    // 保存图片
    let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
    let { result } = await verifyPersonApi({
      imageHead: faceImgUrl,
      imageIDCard1: frontImgUrl,
      imageIDCard2: backImgUrl
    })
    // 并查询识别后的信息
    if (result) {
      this.data.verifyInfo = result
      wx.navigateTo({
        url: './verifyRealName',
      })
    }
  },
  // 表单校验
  formValid () {
    var title = ''
    let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
    if (!faceImgUrl) {
      title = '请上传人脸照片'
    } else if (!frontImgUrl) {
      title = '请上传身份证正面照片'
    } else {
      title = '请上传身份证反面照片'
    }
    let valid = faceImgUrl && frontImgUrl && backImgUrl
    if (!valid){
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500
      })
    }
    return valid
  },
  // 表单方法区域
  bindData (e) {
    var id = e.currentTarget.id
    this.data.personData[id] = e.detail.value
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