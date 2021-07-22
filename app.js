// 一般请求方法注册
import './utils/fetch'
// 批量请求注册
import './utils/fetch_all'

// 工具类注册
const utils = require('./utils/util')
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

App({
  onLaunch() {

  },
  // 绑定公共方法
  utils: utils,
  // 绑定api
  api: {
    ...uploadApi, // 上传相关
    ...usersApi, // 用户相关
    ...elecApi, // 电子车牌相关
    ...bankApi, // 银行卡相关
    ...dictApi // 字典相关
  },
  messageBox: messageBox, // 弹框
  redirect: '', // 记录token失效时当前的页面地址
  appLBS: { // 腾讯位置服务
    key: 'ZMYBZ-P6OKU-YWWV5-45AVL-4SMA5-FDB5X', // 腾讯位置服务申请的key
    referer: '航天吉光小程序', // 调用插件的app的名称
    hotCitys: '无锡,北京,上海,杭州,深圳,广州,成都,苏州', // 自定义热门城市
  },
  qqmapsdk: null, // mapsdk实例对象
  getWechatCode () {
    return new Promise((relove, reject) => {
      wx.login({
        success: relove,
        fail: reject
      })
    })
  },
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
