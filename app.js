// 一般请求方法注册
import './utils/fetch'
// 批量请求注册
import './utils/fetch_all'
// 全局分享函数
import share from './utils/share'
// 弹框注册
import messageBox from './utils/messageBox'
// 上传api注册
import * as uploadApi from './api/upload'
// 用户相关api注册
import * as usersApi from './api/user'
// 电子车牌相关
import * as elecApi from './api/elecBrand'
// 银行卡相关
import * as bankApi from './api/bank'
// 字典相关api
import * as dictApi from './api/dictionary'
// 商圈api
import * as circleApi from './api/circle'

// 工具类注册
const utils = require('./utils/util')
// 引入地图服务sdk
const QQMapWX = require('./utils/qqmap-wx-jssdk.js')

// 全局监听项
import posNotify from './notify/positionModel'
share()
App({
  ...posNotify,
  onLaunch() {
    this.getSystem()
  },
  // 绑定公共方法
  utils: utils,
  // 绑定api
  api: {
    ...uploadApi, // 上传相关
    ...usersApi, // 用户相关
    ...elecApi, // 电子车牌相关
    ...bankApi, // 银行卡相关
    ...dictApi, // 字典相关
    ...circleApi // 商圈相关
  },
  messageBox: messageBox, // 弹框
  redirect: '', // 记录token失效时当前的页面地址
  navTop: 0, // 状态栏高度
  navHeight: 0, // 导航栏高度
  appLBS: { // 腾讯位置服务
    key: 'W5RBZ-G5EKJ-UDLFK-K5ASE-YLQXV-HYFB4', // 腾讯位置服务申请的key
    referer: '航天吉光小程序', // 调用插件的app的名称
    hotCitys: '无锡,北京,上海,杭州,深圳,广州,成都,苏州', // 自定义热门城市
  },
  qqmapsdk: null, // mapsdk实例对象
  // 用户静态画像
  static_user_logo: '/pages/image/user_static_logo.png',
  // 全局共享数据
  globalData: {
    userInfo: {}, // 存储用户业务信息
    elecBrandInfo: {}, // 电子车牌信息
    userPermisson: [], // 用户权限
    wxHeadImg: null,
    jsCode: '',
  },
  initMapSdk () {
    if (this.qqmapsdk) {
      return this.qqmapsdk
    }
    var key = this.appLBS.key
    this.qqmapsdk = new QQMapWX({
      key
    })
    return this.qqmapsdk
  },
  // 获取导航栏/状态栏的高度
  getSystem () {
    let systemInfo = wx.getSystemInfoSync()
    let pxToRpxScale = 750 / systemInfo.windowWidth
    // 状态栏的高度
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    // 导航栏的高度
    let navigationHeight = 44 * pxToRpxScale
    this.navTop = ktxStatusHeight
    this.navHeight = navigationHeight
  },
  getWechatCode () {
    return new Promise((relove, reject) => {
      wx.login({
        success: relove,
        fail: reject
      })
    })
  },
  // 是否登录
  isLogin () {
    return !!this.globalData.userInfo.uid
  },
  // 获取并保存用户业务信息和
  async saveUserBusinessInfo (isLoad) {
    let { result } = await this.api.getUserTotalInfo(isLoad)
    if (result) {
      this.globalData.userInfo = result
      return true
    }
    return false
  },
  /**  初始化所有用户信息
   * params: isLoad 是否开启loading
  */
  // 将权限信息映射到相应的实例中
  mapPermissions (instance) {
    let pers = this.globalData.userPermisson
    instance.setData({
      permissions: pers
    })
  }
})
