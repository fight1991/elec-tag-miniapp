import './publicBag/request/fetch' // 一般请求方法注册
import './publicBag/request/fetch_all' // 批量请求注册
import messageBox from './publicBag/plugin/messageBox' // 弹框注册
import initMapSdk from './publicBag/plugin/initMapSdk' // 地图sdk注册
import getSystemBarInfo from './publicBag/plugin/getSystemBarInfo' // 获取导航栏navbar高度信息
import getCurrentPosition from './publicBag/plugin/getCurrentPosition' // 获取经纬度信息
import getWechatCode from './publicBag/plugin/getWechatCode' // 获取微信code
import * as utils from './publicBag/utils/util' // 工具类注册
// 全局监听项
import posNotify from './notify/positionModel'
// 全局分享函数
import share from './sharePage/index'
// api导入
import api from './api/index'

share()
App({
  onLaunch() {
    this.getSystemBarInfo()
  },
  utils, // 绑定公共方法
  api, // 绑定api
  messageBox, // 绑定全局弹框
  ...posNotify, // 监听位置信息
  ...initMapSdk, // 初始化地图sdk
  ...getSystemBarInfo, // 获取导航栏高度信息
  ...getCurrentPosition, // 获取经纬度信息
  ...getWechatCode, // 获取jscode信息
  redirect: '', // 记录token失效时当前的页面地址
  static_user_logo: '/pages/image/user_static_logo.png', // 用户静态画像
  globalData: { // 全局共享数据
    userInfo: {}, // 存储用户业务信息
    elecBrandInfo: {}, // 电子车牌信息
    userPermisson: [], // 用户权限
    wxHeadImg: null,
    jsCode: '',
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
