import { getUserTotalInfo } from '../api/user'
// 全局store
export default {
  redirect: '', // 记录token失效时当前的页面地址
  ssToken: '', // 登录令牌
  static_user_logo: '/pages/image/user_static_logo.png', // 用户静态画像
  globalData: { // 全局共享数据
    userInfo: {}, // 存储用户业务信息
    userPermisson: [], // 用户权限
    wxHeadImg: null,
    jsCode: '', // 微信一键登录时用
  },
  isLogin () { // 判断是否登录过
    return !!this.globalData.userInfo.uid
  },
  resetLoginStatus () { // 重置登录态
    wx.removeStorageSync('token')
    this.globalData.userInfo = {}
    this.ssToken = ''
  },
  async loginSuccessToPage (token, mobile) {
    if (!token) return
    wx.setStorageSync('token', token)
    this.ssToken = token
    await this.saveUserBusinessInfo()
    // 本地缓存手机号
    wx.setStorage({
      data: mobile,
      key: 'mobile',
    })
    if (this.redirect) {
      let pageMain = this.redirect.indexOf('pages/main/main') > -1
      let pageCircle = this.redirect.indexOf('pages/circle/circle') > -1
      let pageMy = this.redirect.indexOf('pages/my/my') > -1
      if (pageMain || pageCircle || pageMy) {
        wx.switchTab({
          url: this.redirect,
        })
        this.redirect = null
        return
      }
      wx.redirectTo({
        url: this.redirect
      })
      this.redirect = null
      return
    }
    wx.switchTab({
      url: '/pages/main/main',
    })
  },
  async saveUserBusinessInfo (isLoad) { // 获取并保存用户业务信息和
    let { result } = await getUserTotalInfo(isLoad)
    if (result) {
      this.globalData.userInfo = result
      return true
    }
    return false
  },
  /**  初始化所有用户信息
   * params: isLoad 是否开启loading
  */
  mapPermissions (instance) { // 将权限信息映射到相应的实例中
    let pers = this.globalData.userPermisson
    instance.setData({
      permissions: pers
    })
  }
}